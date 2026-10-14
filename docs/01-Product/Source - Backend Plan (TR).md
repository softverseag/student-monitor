---
title: Source - Backend Plan (TR)
type: source-document
language: tr
status: frozen
received: 2026-10-14
updated: 2026-10-14
---

> [!danger] Do not edit this note
> The client team's technical plan, received as `03-BACKEND-VE-DB.md`. **This is input, not an
> accepted architecture.** Parts of it conflict with accepted ADRs (identity via Clerk, the
> Expo mobile app, hosting) — tracked as [[Open Questions|Q-26]]. Its domain content (see/manage
> policy quintuple, state machines, snapshot invariants, finance schema isolation) is folded into
> the requirement and domain notes.

# Backend ve Veritabanı Planı

> Teknik plan. Kararların gerekçeleri için `02-KARARLAR.md`, işlevsel kurallar için `01-GEREKSINIMLER.md`.

---

## 1. Genel şekil

Üç çalışan parça, tek repo, tek kod tabanı:

```
kocluk-app/
├─ web/        Next.js — PWA. Koç geniş ekran, öğrenci/veli mobil düzen.
├─ backend/    NestJS — tüm kurallar, yetkiler ve hesaplar burada.
├─ worker/     NestJS (ayrı süreç) — zamanlanmış işler.
└─ docs/       bu dosyalar
```

- **Arayüz hiçbir iş kuralı içermez.** Yetki kontrolü, gecikme hesabı, hakediş, Filiz eşikleri — hepsi backend'de. Arayüz sorar ve gösterir.
- **Worker neden ayrı:** görev saati hatırlatmaları (K-35), ay sonu hakediş dönemi kapatma, gecikmiş işlerin durum güncellemesi — hiçbiri bir HTTP isteğiyle tetiklenmiyor. Uzun ömürlü ayrı bir sürece ihtiyaç var.
- **Mikroservis yok** (K-37). Modüller NestJS modülü olarak ayrışır, ağ sınırı olarak değil.

---

## 2. Modüller: 13 controller, ~20 servis

NestJS terimleriyle: **controller** dışarıdan gelen isteğin düştüğü kapı, **servis** işi yapan kod.

| # | Modül | Controller | Servisler | Sorumluluk |
|---|---|---|---|---|
| 1 | auth | `AuthController` | `AuthService`, `TokenService`, `MailService` | Kayıt, giriş, e-posta doğrulama, şifre sıfırlama, token yenileme |
| 2 | users | `UsersController` | `UsersService` | Profil, rol, sınıf seviyesi |
| 3 | relationships | `RelationshipsController` | `CoachStudentService`, `ParentStudentService`, `InviteService` | Davet kodu/bağlantı, bağlantı talebi, kabul, sonlandırma, veli onayı, max 2 veli |
| 4 | work | `WorkController` | `WorkService`, `WorkStateMachine`, `LatenessService` | Görev + ödev: atama, tamamlama, onay, toplu onay, geri gönderme |
| 5 | plans | `PlansController` | `PlansService`, `PlanAssignService` | Çizelge: plan ağacı CRUD, çoklu öğrenciye atama |
| 6 | lessons | `LessonsController` | `LessonsService`, `AttendanceService` | Ders oluşturma, öğrenci onayı/reddi, iptal, grup dersi, yoklama |
| 7 | exams | `ExamsController` | `ExamsService`, `NetCalculator` | Deneme sonucu, net hesabı, koç onayı, istatistik verisi |
| 8 | resources | `ResourcesController` | `ResourcesService` | Kaynak havuzu, kaynak önerisi |
| 9 | files | `FilesController` | `FilesService` | PDF yükleme (R2), paylaşım, imzalı indirme |
| 10 | reportCards | `ReportCardsController` | `ReportCardsService` | Dönemlik okul karnesi |
| 11 | progress | `ProgressController` | `ProgressService` | Günlük/haftalık/aylık istatistik, Filiz durumu, konu yüzdesi |
| 12 | notifications | `NotificationsController` | `NotificationService`, `TemplateService`, `PushService` | Olay bildirimleri, manuel gönderim, şablonlar, web push aboneliği |
| 13 | finance | `FinanceController` | `PricingService`, `EarningsService`, `LedgerService` | Fiyat, hakediş, tahsilat, ekstre, görünürlük anahtarları |

### Controller'ı olmayan çapraz parçalar

| Parça | Ne yapar |
|---|---|
| **`PolicyService`** | Tek yetki karar noktası. Aşağıda ayrıntılı. |
| **`AuditService`** | Denetim kaydı yazar. Her durum değişikliğinde çağrılır. |
| **`ReminderWorker`** | Worker süreci. Hatırlatmalar, dönem kapatma, gecikme güncellemesi. |

---

## 3. Yetki katmanı — en kritik parça

Yetki kontrolü controller'lara dağılmış `if` blokları olarak yazılırsa bu proje veriyi buradan sızdırır.

**Tek giriş noktası:**

```ts
PolicyService.can(actor, action, resource): boolean
```

Her istek şu beşliye çözülür:

1. **Aktör** — kim istiyor
2. **Rol** — öğrenci / koç / veli
3. **Hedef öğrenci** — kimin verisi
4. **İlişki durumu** — yok / beklemede / aktif / sonlandı
5. **Sahiplik** — içeriği hangi koç üretti

Finans isteklerinde altıncı koşul: **modül açık mı ve görünürlük anahtarı açık mı.**

**Uygulama biçimi:**
- Controller seviyesinde guard: isteği reddeder.
- Repository seviyesinde zorunlu kapsam filtresi: listeleme sorgularına her zaman aktörün erişebileceği kayıt kısıtı eklenir. Guard tek kaydı korur, kapsam filtresi listeyi korur — ikisi birlikte gerekli.
- Postgres satır seviyesi güvenliği (RLS) kullanılmaz; havuzlanmış sunucusuz bağlantıyla yönetimi zorlaşıyor. Kontrol uygulama katmanında.

**Test:** her kaynak × her rol × her ilişki durumu için tablo testi (K-43). Bu projede yazılacak en değerli test takımı.

---

## 4. Durum makineleri

Durumlar boolean alanlarla yönetilmez; izinli geçişler tek yerde tanımlanır. Aksi halde "hem onay bekliyor hem gecikmiş hem geri gönderilmiş" gibi imkânsız kayıtlar oluşur.

**Çalışma (görev/ödev)**
```
olusturuldu → gonderildi → onaylandi
                   ↓
            geri_gonderildi → gonderildi (tekrar)
olusturuldu → gecikti (süre geçti, gönderim yok)
```
`onay_gerekli = false` ise `gonderildi` durumu otomatik `onaylandi`ya geçer (K-13).
Gecikme etiketi gönderim zamanı ile `son_tarih + gecikme_saati` karşılaştırmasından türer (İK-009, İK-027).

**Ders**
```
talep_edildi → kabul_edildi → gerceklesti (yoklama: katildi | katilmadi)
     ↓              ↓
 reddedildi      iptal_edildi
```

**Deneme sonucu**
```
onay_bekliyor → onaylandi
      ↓
  reddedildi        (reddedilince ne olur: A-08)
```

**İlişkiler**
```
beklemede → aktif → sonlandi
    ↓
reddedildi
```

---

## 5. Veritabanı

Tek Postgres (Neon), ilişkisel. ORM için **Prisma** öneriliyor (migration ve tip güvenliği); TypeORM biliniyorsa onda kalmak da sorun değil — bu karar ekibin alışkanlığına göre verilir.

**İki şema:** `app` ve `finance`. `app` şemasından `finance` şemasına foreign key yok, tutarla join yok (K-39).

### `app` şeması

| Tablo | Önemli alanlar / notlar |
|---|---|
| `user` | e-posta, şifre özeti, rol, doğrulanma durumu |
| `student_profile` | sınıf seviyesi, okul saatleri ayarı, sessiz saat tercihleri |
| `coach_profile` | varsayılan gecikme saati, davet kodu, finans modülü açık mı |
| `parent_profile` | — |
| `coach_student` | `status`, `organization_id` (NULL — K-12), `started_at`, `ended_at` |
| `parent_student` | `status`, `approved_by_coach_id`, max 2 aktif kısıtı |
| `invite` | tür (koç→öğrenci / veli→öğrenci), kod, son kullanım |
| `work` | `type` (gorev/odev), `owner_coach_id`, `student_id`, ders, konu, `due_date`, **`late_cutoff` (kopyalanmış)**, `requires_approval`, `status`, `submitted_at`, `approved_at`, tip'e özel alanlar |
| `work_event` | **yalnızca ekleme.** created / submitted / approved / sent_back / resubmitted, aktör, zaman, açıklama, `bulk` işareti |
| `plan` | ad, seviye (serbest metin), `tree` (değişken yapı: ünite → konu → görev) |
| `plan_assignment` | plan, öğrenci, başlangıç tarihi, çıkarılan görevler |
| `lesson` | koç, `type` (birebir/grup/analiz), tarih, saat, konu, `status`, iptal eden, iptal açıklaması |
| `lesson_participant` | ders, öğrenci, `attendance` (katildi/katilmadi/iptal), öğrenci onay durumu, red açıklaması |
| `exam_result` | öğrenci, sınav türü, ad, tarih, `net`, `score` (manuel), **`subjects` (değişken yapı)**, `status`, `approver_coach_id` |
| `resource` | öğrenci, kitap adı, yayınevi, ders, sahibi (öğrenci/koç önerisi) |
| `resource_suggestion` | öğrenci, öneren koç, kaynak, zaman |
| `file` | yükleyen koç, depolama anahtarı, ad, boyut, tür doğrulaması |
| `file_share` | dosya, öğrenci |
| `report_card` | öğrenci, eğitim yılı, dönem, ders-not satırları |
| `notification` | alıcı, tür, gövde, okundu mu, kaynak olay |
| `notification_template` | koç, ad, metin, **hedef kitle** (öğrenci/veli) |
| `push_subscription` | kullanıcı, cihaz uç noktası |
| `scheduled_reminder` | iş, gönderim zamanı, durum |
| `audit_event` | **yalnızca ekleme.** aktör, eylem, kaynak türü/kimliği, zaman, meta |

### `finance` şeması

| Tablo | Önemli alanlar / notlar |
|---|---|
| `student_price` | `coach_student_id`, `model` (ders_basi/aylik_sabit), `fee_type` (birebir/grup/analiz), `amount`, **`valid_from`** — dönemsel, geçmiş satır silinmez |
| `earning` | koç, öğrenci, `period`, `lesson_id` (ders başı modelde), **`amount_snapshot`**, hesaplanma zamanı |
| `payment` | koç, öğrenci, tarih, tutar, not — koçun elle girdiği tahsilat |
| `visibility` | `coach_student_id`, `progress`, `exams`, `finance` (3 anahtar — K-29) |

**Şifreleme:** `student_price.amount`, `earning.amount_snapshot`, `payment.amount` uygulama katmanında şifrelenir, anahtar ortam değişkeninde/KMS'te (K-08). Şifreli alanlarda sunucu tarafı `SUM`/sıralama yapılmaz; toplamlar çözüldükten sonra hesaplanır.

### Değişken yapı (JSON) nerede kullanılır

Yalnızca iki yerde:
- `exam_result.subjects` — ders listesi sınav türüne göre değişiyor (K-31)
- `plan.tree` — plan her zaman bütün olarak yüklenip düzenleniyor, normalize etmenin getirisi yok

Geri kalan her şey normal kolon. Özellikle tutarlar ve durumlar, çünkü sorgulanmaları ve kısıtlanmaları gerekiyor.

### Değişmezler

- Tüm zaman damgaları `timestamptz`, gösterim `Europe/Istanbul`.
- `work.late_cutoff` ve `earning.amount_snapshot` oluşturulma anında donar (K-40).
- `audit_event` ve `work_event` yalnızca ekleme; güncelleme/silme yok.
- Tutar hiçbir log, bildirim metni, analitik olayı veya arama indeksine girmez (K-41).

---

## 6. Hesaplama motorları (saf, yan etkisiz)

Bunlar tek dosyada, yan etkisiz fonksiyonlar olarak durur (K-42):

| Motor | Ne hesaplar | Neden ayrı |
|---|---|---|
| `LatenessService` | zamanında / geç / gecikti | Kural değişebilir |
| `ProgressService` | günlük/haftalık/aylık yüzdeler, Filiz durumu, konu yüzdesi | Eşikler sabitlenmedi (A-09) |
| `NetCalculator` | sınav türüne göre net | Sınav türü eklenebilir olmalı |
| `EarningsService` | dönem → tutar (modele göre) | İş kuralı; ileride istemciye taşınabilir |

---

## 7. Dış servisler

| Servis | Ne için | Not |
|---|---|---|
| Neon (Postgres) | Veritabanı | dev ve prod ayrı branch |
| Vercel | `web` dağıtımı | — |
| Heroku / Render | `backend` + `worker` | Worker uzun ömürlü süreç gerektirir |
| Resend | E-posta | **SPF/DKIM doğrulaması zorunlu**, yoksa spam'e düşer |
| Cloudflare R2 | PDF depolama | Çıkış trafiği ücretsiz |
| Web Push (VAPID) | Bildirim | Üçüncü taraf maliyeti yok |
| Sentry | Hata izleme | Yoksa hatalar kullanıcıdan öğrenilir |

---

## 8. Ortam değişkenleri

`.env.example` repoya girer (yalnızca anahtar isimleri), `.env` asla girmez.

```
DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
JWT_VERIFICATION_SECRET
FINANCE_ENCRYPTION_KEY
RESEND_API_KEY
R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET
VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY
SENTRY_DSN
FRONTEND_ORIGIN
PORT
```

**Kurallar:**
1. Kök `.gitignore`'a `.env*` baştan yazılır — çerçevenin hazır dosyasına güvenilmez.
2. Commit öncesi otomatik sır taraması (gitleaks pre-commit hook). İnsan dikkatine güvenilmez.
3. **Bir sır bir kez repoya girdiyse silmek yetmez — değiştirilir (rotate edilir).** Git geçmişinde ve GitHub önbelleğinde yaşamaya devam eder.
4. Sırlar yalnızca iki yerde durur: yerelde `.env`, canlıda barındırma sağlayıcısının ortam değişkenleri.
5. dev ve prod ortamları aynı sırrı paylaşmaz.

---

## 9. Dallar ve dağıtım

```
main  → canlı       (korumalı: doğrudan push kapalı, PR + onay zorunlu)
dev   → test ortamı
feat/* → iş dalları
```

- Her PR'da otomatik: derleme + lint + testler
- `dev` → test ortamı, `main` → canlı, otomatik dağıtım
- Neon'da iki branch: dev ve prod. **Test ortamına gerçek öğrenci verisi kopyalanmaz** (KVKK).

---

## 10. Yapım sırası

Sıra keyfi değil; her faz öncekine bağlı.

**Faz 0 — İskelet**
Repo, `.gitignore`, sır taraması, CI, dağıtım hattı, Sentry, veritabanı bağlantısı, `.env.example`.
*Çıktı:* boş ama canlıya çıkabilen uygulama.

**Faz 1 — Temel (bu bitmeden hiçbir modüle başlanmaz)**
auth → users → **PolicyService** → relationships → AuditService.
*Çıktı:* koç öğrenciyi davet edebiliyor, öğrenci kabul ediyor, yetki testleri geçiyor.

**Faz 2 — Çekirdek değer**
work → plans → progress (+ Filiz).
*Çıktı:* koç plan hazırlayıp çoklu öğrenciye atıyor, öğrenci tamamlıyor, istatistik çalışıyor. **Burada ilk beta koçuna gösterilebilir.**

**Faz 3 — Ders ve takvim**
lessons → attendance → öğrenci zaman şeridi.

**Faz 4 — Öğrenci içeriği**
exams (+ net) → resources → reportCards → files.

**Faz 5 — İletişim**
notifications → şablonlar → push → worker (hatırlatmalar).

**Faz 6 — Finans (opsiyonel modül)**
pricing → earnings → ledger → ekstre → görünürlük anahtarları.

**Faz 7 — Veli**
veli ekranı + görünürlük anahtarlarının bağlanması.

Faz 2 sonunda ürün gösterilebilir hale geliyor; tamamını bitirip tek seferde çıkmak bu takvimde en kötü seçenek.

---

## 11. Her iş için "bitti" ölçütü

Bir issue şu dördü tamam olmadan kapatılmaz:

1. Endpoint / ekran yazıldı
2. Yetki kuralı `PolicyService`'e eklendi
3. Yetki testi yazıldı ve geçiyor
4. Denetim kaydı atılıyor (durum değiştiren işlemlerde)

---

## 12. Tahmin

İki kişi, tam zamanlı: kabaca **4-6 ay**. Yarı zamanlı çalışılırsa ikiye katlanır; asıl risk budur.
Faz 2 sonunda (ilk gösterilebilir ürün) toplam sürenin yaklaşık üçte biri geçmiş olur.

---
title: Source - Requirements v2 (TR)
type: source-document
language: tr
status: frozen
received: 2026-10-14
updated: 2026-10-14
---

> [!danger] Do not edit this note
> This is the client's **updated requirement set (v2, October 2026)** in their own words, received
> as `01-GEREKSINIMLER.md` in the `kocluk-app` document set. Where it disagrees with
> [[Source - Requirement Catalog (TR)]], this text wins — see [[Requirements v2 Delta]] for the
> integration map. Corrections, clarifications and disagreements go into the `FR-xx` / `BR-xxx`
> notes and [[Open Questions]], never into this text.
>
> Tags inside: `[V1]` ships first · `[V1.1]` deferred · `[AÇIK]` undecided — each `[AÇIK]` item is
> tracked as a `Q-xx` in [[Open Questions]]. `İK-xxx` maps to `BR-xxx` via [[Business Rules Index]].

# Öğrenci Koçluğu Uygulaması — Gereksinimler (v2)

> Bu doküman, ilk gereksinim metninin alınan kararlara göre güncellenmiş halidir.
> Ekran tasarımı, navigasyon ve görsel düzen bu dokümanın konusu değildir.
>
> **Etiketler:** `[V1]` ilk sürümde yapılacak · `[V1.1]` sonraya bırakıldı · `[AÇIK]` karar bekliyor
>
> İlgili dosyalar: `02-KARARLAR.md` (kararlar ve gerekçeleri), `03-BACKEND-VE-DB.md` (teknik plan)

---

## 1. Roller

Üç kullanıcı rolü vardır: **Öğrenci**, **Koç**, **Veli**.

Erişim yetkisi iki şeye birlikte bağlıdır: kullanıcının rolü ve diğer kullanıcılarla arasındaki **ilişkinin durumu**. Rol tek başına yetki vermez.

Sistem yöneticisi / destek rolü `[V1.1]`. v1'de operasyonel müdahaleler doğrudan veritabanı erişimiyle yapılacaktır.

---

## 2. Hesap ve yetkilendirme

### 2.1 Hesap oluşturma `[V1]`
- Öğrenci, koç ve veli kendi hesabını açar.
- Hesap açmak hiçbir ilişki kurmaz. İlişkiler hesaptan bağımsız kavramlardır.
- E-posta doğrulaması zorunludur.

### 2.2 Oturum `[V1]`
Giriş, çıkış, şifre sıfırlama, oturum yenileme.

### 2.3 Yetkilendirme `[V1]`
- Yetki kontrolü **arayüzde değil sunucuda** uygulanır.
- Tüm yetki kararları tek bir merkezi noktadan geçer (bkz. `03-BACKEND-VE-DB.md` → Yetki katmanı).
- Her istek şu beşliye çözülür: aktör, rol, hedef öğrenci, ilişki durumu, içerik sahipliği.

### 2.4 Öğrenci eğitim bilgisi `[V1]`
- Öğrencinin güncel sınıf seviyesi tutulur.
- Öğrencinin kendisi ve ilişkili aktif koçları görür; güncellenebilir.

### 2.5 Reşit olmayan kullanıcılar `[AÇIK]`
Kullanıcıların çoğu 18 yaş altıdır. Kayıt sırasında yaş kapısı, 18 yaş altı için veli bilgilendirmesi/onayı, aydınlatma metni ve saklama süreleri belirlenmelidir. İlk gerçek kullanıcıdan **önce** tamamlanması gerekir. Bkz. `02-KARARLAR.md` → A-06.

---

## 3. Koç – Öğrenci ilişkisi

### 3.1 Çoklu koç `[V1]`
- Bir öğrenci aynı anda birden fazla koçla çalışabilir.
- İlişki birinci sınıf bir kayıttır; kullanıcı hesabından bağımsız saklanır.
- v1 arayüzünde çoklu koça özel ayrı akış yoktur; her içerikte "hangi koçtan geldiği" etiketi gösterilir.

### 3.2 İlişki kurma `[V1]`
İki yön desteklenir:
- **Koç davet eder:** davet kodu ve davet bağlantısı. Öğrenci kabul edince ilişki aktif olur.
- **Öğrenci talep eder:** öğrenci koçun kodunu girerek bağlantı talebi gönderir. Koç kabul edince ilişki aktif olur.

QR kod `[V1.1]`.

Bu akış ders talebi değildir; yalnızca çalışma ilişkisi kurar.

### 3.3 İlişkinin sonlandırılması `[V1]`
- Hem koç hem öğrenci tek başına sonlandırabilir. **Veli onayı gerekmez.**
- Sonlandırma geçmiş verileri silmez.
- Sonlandırma sonrası:
  - Koç, o öğrencinin geçmiş kayıtlarını **salt-okunur** görmeye devam eder (hakediş geçmişi için zorunlu).
  - Koç yeni görev, ödev, ders, dosya veya bildirim üretemez.
  - Öğrenci, o koçun paylaştığı dosyaları ve önerdiği kaynakları görmeye devam eder.

### 3.4 Görme ve yönetme ayrımı `[V1]`
Bu, çoklu koç izolasyonunun temel kuralıdır:

| Veri türü | Tüm aktif koçlar | Yalnızca üreten koç |
|---|---|---|
| Kaynak havuzu, deneme sonuçları, okul karnesi, konu ilerlemesi, öğrenci programı | **görür** | — |
| Görev, ödev, ders, dosya, bildirim, fiyat, hakediş | görür (ders/dosya/fiyat/hakediş hariç) | **yönetir** |

Pratik sonucu: Koç B, Koç A'nın verdiği ödevi listede görür ama **onaylayamaz, düzenleyemez, silemez.**
Fiyat, hakediş, dosya ve bildirimi diğer koç hiç görmez.

---

## 4. Veli – Öğrenci ilişkisi

### 4.1 Veli hesabı `[V1]`
Veli kendi hesabını açar. Hesap açmak hiçbir öğrenciye erişim sağlamaz.

### 4.2 İlişkilendirme `[V1]`
- Veli, öğrencinin kodunu girerek bağlantı talebi başlatır.
- İlişkiyi **yalnızca öğrencinin koçu** onaylar.
- Öğrencinin birden fazla koçu varsa herhangi biri onaylayabilir.
- Koç onayı olmadan veli hiçbir korumalı veriye erişemez.

### 4.3 Sınır `[V1]`
Bir öğrencinin aynı anda en fazla **2 aktif velisi** olabilir. Üçüncü aktif ilişki engellenir.

### 4.4 Velinin yetkisi `[V1]`
Veli yalnızca **görüntüleme** yapar. Hiçbir yönetim yetkisi yoktur: görev onaylamaz, ders iptal etmez, ilişki sonlandırmaz.

---

## 5. Çalışma: görev ve ödev

Görev ve ödev **tek bir varlık** olarak modellenir, `tip` alanıyla ayrışır. Yaşam döngüsü, onay akışı, gecikme mantığı, işlem geçmişi ve bildirimleri ortaktır. İstatistikleri ayrı hesaplanır.

| | Görev | Ödev |
|---|---|---|
| Kaynağı | Çizelgeden (plandan) gelen günlük iş | Ders sonrası verilen iş |
| Türe özel alanlar | plan bağlantısı, saat, süre, tekrar | kaynak (kitap), teslim tarihi |

### 5.1 Oluşturma `[V1]`
Koç yalnızca aktif ilişkisi olan öğrencilere atar. Bir çalışma kaydı en az şunları taşır:
öğrenci, atayan koç, tip, ders, konu (serbest metin), içerik, son tarih, gecikme saati, oluşturulma bilgisi, durum, onay gerekli mi.

### 5.2 Ders ve konu `[V1]`
- Ders ve konu **serbest metindir**. Hazır müfredat listesi yoktur.
- Koçun daha önce yazdığı değerlerden otomatik tamamlama önerilir (tutarlılık için).

### 5.3 Durumlar `[V1]`
En az şu durumlar birbirinden ayrılabilir:
- Tamamlanmadı
- Onay bekliyor (yalnızca "onay gerekli" işaretli işlerde)
- Zamanında tamamlandı
- Geç tamamlandı
- Gecikti / tamamlanmadı
- Geri gönderildi

### 5.4 Tamamlama ve onay `[V1]`
**Varsayılan davranış itiraz modelidir:**
- Öğrenci "tamamladım" dediğinde iş **anında** tamamlanmış sayılır ve istatistiğe girer.
- Koç sonradan geri gönderebilir; geri gönderilirse istatistik güncellenir.

**İstisna:** Koç bir işi oluştururken "onay gerekli" işaretleyebilir. Bu işlerde öğrencinin bildirimi işi kapatmaz, koçun onayı beklenir.

Onay/geri gönderme yetkisi yalnızca **işi oluşturan koça** aittir.

### 5.5 Toplu işlem `[V1]`
- **Toplu onay** iki seviyede: tüm öğrenciler geneli ve tek öğrenci içi.
- **Toplu geri gönderme yoktur.** Geri gönderme açıklaması bağlama özeldir, tek tek yapılır.
- Toplu onayda denetim kaydı **iş başına ayrı** yazılır, "toplu onayla yapıldı" işaretiyle.

### 5.6 Geri gönderme açıklaması `[V1]`
Açıklama yazılabilir ama zorunlu değildir. Yazılmışsa öğrenci görür.

### 5.7 Bildirim `[V1]`
Tamamlanma bildirimi yalnızca işi atayan koça gider. Öğrencinin diğer koçlarına gönderilmez.

---

## 6. Gecikme kuralları

### 6.1 Esas alınan tarih `[V1]`
Gecikme hesabında **öğrencinin gönderim zamanı** esas alınır, koçun onay zamanı değil.

### 6.2 Gecikme saati `[V1]`
- Her koç kendi varsayılan gecikme saatini belirler (ör. 20:00).
- Bu değer **çalışma oluşturulurken kaydın üstüne kopyalanır ve donar.**
- Koç ayarını sonradan değiştirirse geçmiş çalışmaların gecikme durumu değişmez.

### 6.3 Sonuçlar `[V1]`
- Son tarih + gecikme saatinden önce gönderildi → **zamanında**
- Sonra gönderildi → **geç tamamlandı**
- Hiç gönderilmedi ve süre geçti → **gecikti / tamamlanmadı**

Geç tamamlanan ile hiç tamamlanmayan çalışma **aynı istatistikte toplanmaz.**

### 6.4 İşlem geçmişi `[V1]`
Her çalışma için saklanır: oluşturulma, son tarih, gecikme saati, gönderim zamanı, onay zamanı, geri gönderme zamanı, geri gönderme açıklaması, yeniden gönderimler, nihai durum.

Gönderim zamanı ile onay zamanı asla birbirinin yerine kullanılmaz.

---

## 7. Çizelge (plan) `[V1]`

> Bu modül v1'in en önemli parçasıdır. Koçun zamanını doğrudan kazandıran ve abonelik ücretini haklı çıkaran özellik budur.

- Koç yeniden kullanılabilir plan oluşturur: **ana ünite → konu → görev**, her görevde gün ofseti ve süre.
- Plan bir kez hazırlanır, **birden fazla öğrenciye** başlangıç tarihi verilerek atanır.
- Atama sırasında öğrenci bazında görev çıkarılabilir (kısaltma).
- Atanmış görevler plandan kopyadır: plan sonradan değişirse gönderilmiş görevler etkilenmez.
- Plan seviyesi/etiketi serbest metindir (ör. "12. sınıf · YKS").

**Excel'den plan yükleme** `[V1.1]`

---

## 8. Ders / koçluk görüşmesi

### 8.1 Oluşturma `[V1]`
- Ders talebini **yalnızca koç** oluşturur. Öğrenci ders talebi gönderemez.
- Kayıt en az şunları taşır: öğrenci, koç, tarih, saat, ders türü, konu, durum.
- **Ders türleri:** birebir, grup, deneme analizi.

### 8.2 Öğrenci onayı `[V1]`
- Öğrenci kabul eder veya reddeder. Kabul edilmeden ders kesinleşmez.
- Reddederken açıklama yazabilir, zorunlu değildir. Red ve açıklama koça iletilir.

### 8.3 İptal `[V1]`
- Kesinleşmiş dersi hem koç hem öğrenci iptal edebilir.
- Açıklama yazılabilir, zorunlu değildir.
- Saklanır: iptali başlatan kullanıcı, iptal zamanı, açıklama.
- İptal edilen ders gerçekleşmiş sayılmaz ve **ücretlendirilmez.**

### 8.4 Grup dersi `[V1]`
- Takvimde **tek ders kaydı** oluşur.
- Her katılımcı öğrenci için **ayrı yoklama** ve **ayrı hakediş satırı** üretilir.
- Ücret öğrenci başınadır, bölüşülmez (bkz. K-04).

### 8.5 Yoklama `[V1]`
- Dersten sonra **yalnızca koç** işaretler: **Katıldı / Katılmadı / İptal**.
- Kayıt öğrenci, koç, ders ve tarihle ilişkilendirilir.
- Yoklama kaydı finans modülünden bağımsızdır ve **her zaman açıktır.**

### 8.6 Çakışma `[AÇIK]`
İki koç aynı öğrenciye aynı saate ders koyarsa engellenecek mi? Bkz. A-05.

---

## 9. Öğrenci takvimi ve gizlilik

### 9.1 Öğrenci görünümü `[V1]`
- **Salt-okunur gün/hafta zaman şeridi:** dersler ve görevler saatlerine oturtulmuş halde gösterilir.
- Okul saatleri için tek bir ayar (ör. "hafta içi 08:00–15:00").
- Kayıt bulunmayan saatler boş sayılır; kullanıcı "boş" etkinliği oluşturmaz.

**Düzenlenebilir takvim ızgarası (06:00–24:00, çoklu seçimle işaretleme, kişisel etkinlik türleri)** `[V1.1]`
Gerekçe: koç bu veriyi göremediği için (bkz. 9.2) maliyeti yüksek, ticari karşılığı düşük.

### 9.2 Gizlilik `[V1]`
Koç öğrencinin kişisel takviminin tamamını göremez. Okul programı, kişisel etkinlikler ve boş saatler koça otomatik olarak açılmaz. Koç yalnızca kendi oluşturduğu ders kayıtlarına erişir.

---

## 10. Deneme sınavları

### 10.1 Kayıt `[V1]`
Öğrenci deneme sonucunu girer. Kayıt en az şunları taşır: deneme adı, sınav türü, tarih, ders bazındaki doğru/yanlış, net, puan.

### 10.2 Hesaplama `[V1]`
- **Net otomatik hesaplanır**, kural sınav türüne göre değişir.
- **Puan manuel girilir.**
- Ders listesi sınav türüne göre değişir; veri modeli tek sabit formüle bağlı değildir (yeni sınav türü eklenebilir).

### 10.3 Koç onayı `[V1]`
- Sonuç koç onayına tabidir. Durumlar: **Onay bekliyor / Onaylandı / Reddedildi**.
- **Onaylayacak koçu öğrenci seçer.** Tek koçu varsa otomatik atanır.
- Reddedilen sonucun akıbeti `[AÇIK]` — bkz. A-08.

### 10.4 İstatistik kuralı `[AÇIK]`
Onaylanmamış sonuçların istatistiğe dahil olup olmayacağı **henüz karara bağlanmadı.** Bkz. A-01.
- Seçenek A: ilk metindeki kural korunur — onaylanmayan sonuç hiçbir istatistiğe girmez.
- Seçenek B: çalışmalardaki itiraz modeline benzer şekilde sonuç anında girer, "doğrulanmadı" işaretiyle gösterilir.

### 10.5 İlerleme `[V1]`
Onaylanmış sonuçlardan şunlar üretilebilir: son sonuç, geçmiş sonuçlar, en iyi sonuç, ortalama, önceki denemeye göre değişim, ders bazlı değişim.

---

## 11. Kaynak havuzu `[V1]`

- Her öğrencinin bir kaynak havuzu vardır. Öğrenci doldurur: **kitap adı, yayınevi, ders.**
- Öğrencinin **tüm aktif koçları** havuzu görür (kişisel takvim gizliliğinden ayrı bir yetkidir).
- Koç kaynak önerir. Öneri kaydı: önerilen öğrenci, öneren koç, kaynak, öneri zamanı.
- Birden fazla koç varsa hangi kaynağı hangi koçun önerdiği korunur.
- Ödev verilirken kaynak öğrencinin havuzundan seçilebilir.

**Kaynak içi ilerleme takibi (kaçıncı sayfa/test)** `[V1.1]`

---

## 12. Dosya paylaşımı `[V1]`

- Yalnızca **koç → öğrenci** yönünde. Öğrenci dosya yükleyemez.
- Yalnızca **PDF**, en fazla **25 MB**.
- Koç hangi öğrenci veya öğrencilerle paylaşacağını seçer. Öğrenci yalnızca kendisiyle paylaşılanı görür.
- Klasör, etiket ve versiyon yönetimi yoktur.
- v1'de dosya türü doğrulaması yapılır (uzantı değil, dosya içeriği kontrol edilir). **Virüs taraması** `[V1.1]` — bilinçli olarak ertelenmiş risktir.
- Saklama politikası `[AÇIK]` — bkz. A-07.

Dosya paylaşımı ile kaynak havuzu farklı kavramlardır.

---

## 13. Okul karnesi `[V1]`

- Dönemlik not tablosu (yılda 2 dönem).
- Notları **öğrenci girer**; koç ve veli yalnızca görür. Onay akışı yoktur.
- Not ölçeği `[AÇIK]` — 100'lük mü 5'lik mi? Bkz. A-04.

---

## 14. İlerleme ve Filiz

### 14.1 Geçmişin korunması `[V1]`
Tamamlanan veya süresi geçen çalışma kayıtları silinmez. Raporlama için korunur.

### 14.2 Dönemler `[V1]`
Öğrenci kendi geçmişini **günlük, haftalık ve aylık** düzeyde inceleyebilir.

Her dönemde şunlar birbirinden ayrılabilir: zamanında tamamlanan, geç tamamlanan, gecikmiş/tamamlanmamış, onay bekleyen.
**Görev ve ödev istatistikleri ayrı hesaplanır.**

Aylık genel ilerleme formülü `[AÇIK]` — bkz. A-09.

### 14.3 Filiz `[V1]`
- Günlük ilerlemeyi temsil eden görsel karakter, **4 durum**:
  - %0–24 üzgün · %25–74 idare eder · %75–99 mutlu · %100 kutlama
- **Görev ve ödev için ayrı hesaplanır.** Görev ilerlemesi ödev Filiz'ini etkilemez.
- Eşikler ve hesap yöntemi **değiştirilebilir iş kuralıdır**, tek yerde tanımlanır.
- Animasyon yalnızca günlük görünümde; haftalık/aylıkta durağan görsel.
- **Ton: nazik ve cesaretlendirici.** Tek varyant. Suçluluk hissettiren ton kullanılmaz (kullanıcı kitlesi reşit değildir).

### 14.4 Konu ilerlemesi `[V1]`
Konu ilerlemesi ayrı bir modül değildir; **plandaki konuya bağlı görevlerin tamamlanma oranından türetilir.**
Bağımsız müfredat modülü (ders → ünite → konu listesi, elle durum işaretleme) `[V1.1]`

---

## 15. Bildirimler

### 15.1 Olay bildirimleri `[V1]`
Şu olaylarda ilgili kullanıcıya bildirim üretilir: yeni görev/ödev, tamamlanma bildirimi, onay, geri gönderme, ders talebi, ders kabulü, ders reddi, ders iptali, deneme onay talebi, deneme onayı/reddi, kaynak önerisi, veli bağlantı onayı.

Bildirimler yalnızca olayla ilişkili kullanıcılara gider.

### 15.2 Görev saati hatırlatmaları `[V1]`
- Görev saatinde otomatik hatırlatma gönderilir.
- Öğrenci kendi hatırlatma tercihlerini ve **sessiz saatlerini** ayarlar; sessiz saate düşen hatırlatma ertelenir.
- Koçun gönderdiği bildirimler her durumda ulaşır.

### 15.3 Koçun manuel bildirimi `[V1]`
- Koç ilişkili öğrencilerine ve velilerine bildirim gönderir, birden fazla alıcı seçebilir.
- **Yeniden kullanılabilir şablonlar:** oluşturma, düzenleme, tekrar kullanma. Şablonda hedef kitle alanı bulunur (öğrenci / veli).
- Öğrenciye gönderilen bildirim otomatik olarak veliye gitmez.
- Bu bir yapay zekâ prompt sistemi değildir.
- Kötüye kullanımı engellemek için gönderim hız sınırı uygulanır.

---

## 16. Finans — opsiyonel modül

> **Bu modül varsayılan olarak KAPALIDIR.** Koç kendi isteğiyle açar. Kapalıyken uygulamanın geri kalanı tam çalışır.
> Gerekçe: kayıt dışı çalışan koçların veri girmekten çekinmesi gerçek bir benimseme riskidir.

### 16.1 Tahsilat `[V1]`
Sistem **para taşımaz.** Kredi kartı, ödeme kuruluşu, komisyon yoktur. Yalnızca hesaplar ve gösterir.

### 16.2 Fiyat `[V1]`
- Fiyat **manuel girilir** ve **koç–öğrenci ilişkisine** aittir. Aynı öğrenci başka koçla çalışıyorsa o koç farklı fiyat belirler.
- İki model: **ders başı** ve **aylık sabit**.
- Ders türüne göre ayrı tutar: birebir, grup, deneme analizi.
- Fiyat **dönemsel** saklanır (hangi tarihten itibaren geçerli).
- Fiyat bilgisi öğrenciye **hiç gösterilmez.**

### 16.3 Hakediş `[V1]`
- **Ders başı modelde** kaynak gerçekleşen ders kayıtlarıdır (yoklaması "katıldı" olanlar).
- **Aylık sabit modelde** kaynak dönem + aktif ilişkidir; takvim yalnızca devamlılık raporlaması ve anlaşmazlık kanıtı sağlar.
- İptal edilen ders ücretlendirilmez.
- "Katılmadı" durumunun ücretlendirilip ücretlendirilmeyeceği koç bazında ayarlanabilir.
- Hakediş kaydı en az şunları taşır: öğrenci, koç, ilgili ders(ler), tarih, geçerli fiyat, hesaplanan tutar.
- **Tutar oluştuğu anda donar.** Fiyat sonradan değişirse geçmiş tutarlar değişmez.

### 16.4 Cari hesap `[V1]`
- Hakediş = **borç**
- Koçun elle girdiği tahsilat kaydı = **alacak**
- Fark = **bakiye**
- Görünüm **aylık ekstre** biçimindedir (dönem borcu, dönemde tahsil edilen, bakiye).

### 16.5 Koçun görünümü `[V1]`
Koç her öğrencinin hakedişini ayrı ayrı **ve** öğrenci havuzunun toplamını görür.

### 16.6 Güvenlik `[V1]`
- Finans verisi sunucuda şifreli saklanır; çözme anahtarı işletmededir.
- Koça dürüst bildirim yapılır: *"Finansal verileriniz şifreli saklanır. Yasal bir talep gelirse açmak ve vermek zorundayız."*
- Uygulama "mali denetimden korunma aracı" olarak konumlandırılmaz.
- Modülü kapatırken **"verileri sil"** seçeneği sunulur ve bu **gerçek silmedir.** Bu, geçmiş kayıtların korunması kuralının finans için tanımlı istisnasıdır.

Uçtan uca şifreleme (anahtar koçta, işletme veriyi hiç göremez) `[V1.1]` — koç direnci ölçüldükten sonra değerlendirilecek.

### 16.7 Erişim `[V1]`
Fiyat ve hakediş bilgisine yalnızca **ilgili koç** ve **yetkili veli/veliler** erişir. **Öğrenci erişemez.**

---

## 17. Veli bilgilendirmesi `[V1]`

Velinin amacı öğrenci yönetimi değil, takip ve bilgilendirmedir.

### 17.1 Görünürlük anahtarları `[V1]`
Koç, veliye ne gösterileceğini **3 anahtarla** belirler:

| Anahtar | Kapsam |
|---|---|
| **İlerleme** | Haftalık/günlük ilerleme, tamamlanan ve eksik çalışmalar, ders devamlılığı, koç notu |
| **Deneme** | Onaylanmış deneme sonuçları ve gelişim |
| **Finans** | Ders ücreti, borç, ödenen, bakiye, ders dökümü |

Kapalı bırakılan alan veli ekranında **hiç görünmez.**
Finans anahtarı yalnızca koç finans modülünü açtıysa etkindir.

### 17.2 Velinin göremeyeceği şeyler `[V1]`
Görev ve ödev detayları, öğrencinin kişisel takvimi, koçun özel notları, diğer koçların fiyat ve hakediş bilgileri.

### 17.3 Okul karnesi `[V1]`
Veli görür (öğrenci girer).

---

## 18. Veri yetkilendirme özeti `[V1]`

**Öğrenci:** kendi görevleri, ödevleri, ders talepleri, ilerleme geçmişi, deneme sonuçları, kaynak havuzu, kaynak önerileri, okul karnesi, kendisiyle paylaşılan dosyalar.
**Erişemez:** fiyat, hakediş, koç notları.

**Koç (yalnızca aktif ilişkili öğrenciler için):** kendi oluşturduğu görev/ödev/ders/dosya/bildirim üzerinde tam yetki; öğrencinin kendi verisi üzerinde görüntüleme; kendi fiyat ve hakediş kayıtları.
**Erişemez:** diğer koçun içeriğini yönetme, diğer koçun fiyat/hakediş verisi, öğrencinin kişisel takvimi.

**Veli (yalnızca koç onaylı ilişki için):** koçun açtığı anahtarlar kapsamındaki ilerleme verisi, ilgili koçun fiyat ve hakediş bilgisi.
**Erişemez:** yönetim işlemleri, görev/ödev detayı, diğer koçların finansal verisi.

---

## 19. Denetim kaydı `[V1]`

Şu işlemlerin zamanı ve kullanıcısı korunur:
görev/ödev oluşturma, tamamlanma bildirimi, geri gönderme, onay (toplu onaylar iş başına ayrı), ders talebi, ders kabulü/reddi, ders iptali, yoklama işaretleme, deneme gönderimi/onayı/reddi, kaynak önerisi, dosya paylaşımı, fiyat değişikliği, hakediş oluşumu, tahsilat kaydı, ilişki kurma/sonlandırma, veli onayı, finans modülü açma/kapatma/silme.

Denetim kaydı **yalnızca ekleme** yapılan bir tablodur ve ilk günden itibaren yazılır. Sonradan geriye doldurulamaz.

---

## 20. Abonelik ve ticari model

### 20.1 v1 `[V1]`
- **Ücretsiz beta.** Ödeme entegrasyonu yoktur.
- Betanın **duyurulmuş bir bitiş tarihi** olur.
- Koç başına **aktif öğrenci limiti** kodda uygulanır (sayı `[AÇIK]`, bkz. A-03).

### 20.2 Sonrası `[V1.1]`
- Ücretli taraf **koçtur.** Öğrenci ve veli ücret ödemez.
- Abonelik aktif öğrenci sayısına göre kademelenir.
- **Kritik kural:** koçun aboneliği sona erdiğinde öğrenci ve velinin erişimi kesilmez (en fazla salt-okunur olur).
- Bu abonelik, koçun öğrencisinden aldığı ders ücretinden tamamen ayrı bir kavramdır.

---

## 21. İş kuralları

| No | Kural | Durum |
|---|---|---|
| İK-001 | Bir öğrenci aynı anda birden fazla koçla çalışabilir | korundu |
| İK-002 | Koç–öğrenci ilişkisini hem koç hem öğrenci tek başına sonlandırabilir | korundu, veli onayı yok |
| İK-003 | Veli–öğrenci ilişkisi yalnızca koç onayından sonra aktif olur | korundu |
| İK-004 | Bir öğrencinin en fazla 2 aktif velisi olabilir | korundu |
| İK-005 | Görev ve ödev istatistikleri bağımsız hesaplanır | korundu (tek varlık, ayrı tip) |
| İK-006 | Öğrencinin tamamlandı bildirimi — | **değişti:** varsayılan olarak işi kapatır; "onay gerekli" işaretliyse kapatmaz |
| İK-007 | Onay/geri gönderme yetkisi yalnızca içeriği atayan koça aittir | korundu |
| İK-008 | Geri gönderme açıklaması opsiyoneldir | korundu |
| İK-009 | Gecikme hesabında öğrencinin gönderim tarihi esas alınır | korundu |
| İK-010 | Geç tamamlanan ile hiç tamamlanmayan çalışma ayrı istatistiktir | korundu |
| İK-011 | Ders talebini yalnızca koç oluşturur | korundu |
| İK-012 | Kesinleşmiş dersin iptalini hem öğrenci hem koç başlatabilir | korundu |
| İK-013 | İptal açıklaması opsiyoneldir | korundu |
| İK-014 | Koç öğrencinin kişisel programının tamamını göremez | korundu |
| İK-015 | Koç ilişkili öğrencisinin kaynak havuzunu görür ve kaynak önerir | korundu |
| İK-016 | Deneme sonuçları koç onayından geçer | korundu |
| İK-017 | Onaylanmamış deneme sonucunun istatistikteki yeri | **[AÇIK]** bkz. A-01 |
| İK-018 | Puan manuel girilir | korundu |
| İK-019 | Net hesabı sınav türüne göre değişebilir | **genişletildi:** v1'de otomatik hesaplanır |
| İK-020 | Koç her öğrenci için ayrı fiyat belirler | korundu |
| İK-021 | Hakediş fiyat + ders/dönem kayıtlarından hesaplanır | **netleşti:** ders başı → ders kaydı, aylık sabit → dönem |
| İK-022 | Fiyat ve hakedişi yalnızca ilgili koç ve yetkili veli görür | korundu |
| İK-023 | Fiyat değişikliği geçmiş tutarları değiştirmez | korundu |
| İK-024 | Bir koç diğer koçun içeriğini yönetemez | korundu, bkz. 3.4 |
| İK-025 | Geçmiş kayıtlar raporlama için korunur | korundu, **istisna:** finans verisi silinebilir |
| İK-026 | Öğrencinin sınıf seviyesi tutulur ve koçlar görür | korundu |
| **İK-027** | Gecikme saati çalışma oluşturulurken kayda kopyalanır ve donar | **yeni** |
| **İK-028** | Grup dersinde ücret öğrenci başınadır, bölüşülmez | **yeni** |
| **İK-029** | Finans modülü varsayılan kapalıdır ve verisi silinebilir | **yeni** |
| **İK-030** | İlişki sonlandıktan sonra koçun erişimi salt-okunur olur | **yeni** |
| **İK-031** | Deneme sonucunu onaylayacak koçu öğrenci seçer | **yeni** |

---

## 22. v1 kapsamı dışında kalanlar

| Konu | Neden |
|---|---|
| Ödeme / abonelik entegrasyonu | Fiyatlandırma belirlenmedi; ücretsiz beta ile başlanıyor |
| Excel'den plan yükleme | Plan editörü işi karşılıyor |
| Düzenlenebilir öğrenci takvim ızgarası | Yüksek maliyet, koç göremediği için ticari karşılığı yok |
| Bağımsız müfredat / konu modülü | İçerik hazırlama maliyeti; plan görevlerinden türetiliyor |
| Mesajlaşma | Bilinçli karar — bkz. 23.2 |
| Kurum / çok koçlu organizasyon | Bireysel koça odaklanıldı; veri modelinde alan hazır |
| Uçtan uca şifreleme | Doğrulanmadan 3-4 hafta yatırım yapılmıyor |
| Dosyada virüs taraması | Ertelenmiş risk, v1.1'de eklenecek |
| Mağaza uygulaması (iOS/Android) | PWA ile çıkılıyor |
| Sistem yöneticisi paneli | Doğrudan veritabanı erişimiyle yürütülecek |
| QR kod ile bağlanma | Davet kodu ve bağlantı yeterli |
| Kaynak içi ilerleme takibi | Havuzda yalnızca kitap adı ve yayınevi tutuluyor |

---

## 23. Açık maddeler ve bilinen riskler

### 23.1 Karar bekleyenler
`02-KARARLAR.md` → "Açık maddeler" bölümüne bakınız (A-01 … A-10).

### 23.2 Bilinçli kabul edilen riskler

**Mesajlaşma yok.** Koçluk işinin büyük kısmı konuşmadır ve bugün WhatsApp'ta geçiyor. Tek yönlü bildirim WhatsApp'ı yerinden etmez; koç ve öğrenci orada konuşmaya devam ederse görevleri de orada konuşma riski vardır. v1'de kabul ediliyor, beta geri bildirimine göre yeniden değerlendirilecek.

**PWA'da iOS push kısıtı.** iOS'ta bildirim yalnızca kullanıcı uygulamayı ana ekrana eklerse çalışır. Öğrenci benimsemesi hatırlatmalara bağlı olduğu için bu gerçek bir risktir; kurulum yönlendirmesi önemlidir.

**Öğrenci benimsemesi koça bağımlı.** Koç uygulamayı kullanmayı dayatmazsa öğrenci veri girmez, veri girilmezse tüm istatistik ve Filiz boş kalır. Davet akışındaki sürtünme en düşük seviyede tutulmalıdır.

**KVKK sırası ters.** Öğrenci kendi hesabını açıyor ama kullanıcıların çoğu reşit değil; veli onayı ise koç onayına bağlı. Yasal gereklilik bunun tersini istiyor. İlk gerçek kullanıcıdan önce çözülmesi zorunludur.

**Yetişkin–çocuk etkileşimi.** Platform yetişkin koçları reşit olmayan öğrencilerle eşleştiriyor. Şikâyet/engelleme mekanizması ve dosya içeriği denetimi hukuki sorumluluk açısından gereklidir.

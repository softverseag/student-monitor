---
title: Kasa Haritası (TR)
status: draft
updated: 2026-10-15
---

# Kasa Haritası — ne nerede yazıyor

Bu not **kasanın kendisinin** haritası. Ürünü anlatmıyor; "şunu arıyorum, hangi notun hangi
başlığına bakacağım" sorusunu cevaplıyor. Burada hiçbir karar verilmez — her satır başka bir nota
işaret eder, karar orada yaşar.

> [!note] Bu not neden Türkçe
> Kasa kuralı "her not İngilizce" ([[Vault Guide]]). Bu bir istisna, çünkü notun işi gezinmek —
> içerik değil, tarif. Bir bilgi burayla bağlantılı notu çelişirse **o not kazanır**, bu not eskimiş
> demektir.

---

## Kasa nasıl kurulmuş

Tek yönlü bir zincir var. Her katman üstündekinden türüyor, aşağısı yukarısını **açıklamakla**
yükümlü:

```
01-Product/Source - *.md       müşterinin kendi kelimeleri (donmuş, asla düzenlenmez)
        ↓
02-Requirements/FR-xx          ne yapacağız — test edilebilir maddeler
02-Requirements/Business Rules  BR-xxx — pazarlığı olmayan kurallar
        ↓
03-Domain/                     kavramlar, durumlar, kim ne görür, formüller
        ↓
04-Architecture/ + ADR         nasıl kuracağız ve neden öyle
        ↓
05-Delivery/                   hangi sırayla, şu an kim ne yapıyor
        ↓
                               kod
```

**Çelişkide kim kazanır:** `Source - *` dosyaları müşterinin sözü (ama eskimiş olabilir) → `FR` +
`BR` bizim yorumumuz ve resmî spec'imiz → `ADR` teknik kararın gerekçesi. Kod ile kasa çelişirse
kasa kazanır; iki not birbiriyle çelişirse zincirde **aşağıda** olan yanlıştır.

---

## En çok sorulan şeyler → tam adres

| Arıyorsun | Not | Başlık |
| --- | --- | --- |
| Bir özelliğin ne yapması gerektiği, madde madde | [[Requirements Index]] → ilgili `FR-xx` | `## Requirements` |
| "Bitti" sayılma ölçütü | ilgili `FR-xx` | `## Acceptance criteria` |
| Bir özellikte kimin yetkisi var | ilgili `FR-xx` | `## Authorization` / `## Requirements` |
| Bir özelliğin v1'de olmayan kısmı | ilgili `FR-xx` | `## Out of scope (v1)` |
| Bir kuralın müşteri karşılığı (İK numarası) | ilgili `BR-xxx` | frontmatter `source:` |
| Hangi kurallar bizi en çok yakar | [[Business Rules Index]] | `## The five that will bite us` |
| Kim neyi görebilir — tam matris | [[Authorization Matrix]] | `## The five bolded cells`, `## Rules of enforcement` |
| Bir kaydın durumları ve geçişleri | [[State Machines]] | ilgili başlık (link, iş kalemi, ders, deneme, abonelik) |
| Varlıklar ve aralarındaki ilişki (ERD) | [[Entity Map]] | `## How to read it` |
| Hangi veri hangi varlığa ait | [[Domain Model]] | `## Aggregates`, `## Invariants` |
| Filiz eşikleri ve ilerleme formülü | [[Progress and Filiz]] | `## Daily progress and Filiz`, `## The empty denominator` |
| Aylık ilerleme neden hâlâ yok | [[Progress and Filiz]] | `## Monthly` → [[Open Questions\|Q-02]] |
| Para nasıl hesaplanıyor | [[Pricing and Earnings]] | `## The per-lesson pipeline`, `## Billing rules` |
| Fiyat zammı geçmişi neden bozmuyor | [[Pricing and Earnings]] | `## Effective-dated rates`, `## Why the snapshot as well` |
| Parayı kim görüyor | [[Pricing and Earnings]] | `## What the coach/parent/student sees` |
| Tablolar ve kolonlar | [[Data Model]] | `## Key tables`, `## Conventions` |
| Sistemin genel şekli, modül listesi | [[Architecture Overview]] | `## Shape`, `## Backend structure` |
| Bir teknoloji neden seçilmiş | [[ADR Index]] → ilgili `ADR-xxxx` | `## Context`, `## Decision` |
| Bir kararın bedeli ne | ilgili `ADR-xxxx` | `## Consequences`, `## Alternatives considered` |
| Frontend klasör ve import kuralları | [[Frontend Architecture]] | `## The structure`, `## Import rules` |
| API yolu, hata ve 404/403 kuralı | [[API Conventions]] | `## URLs`, `## Errors` |
| KVKK, reşit olmayan kullanıcı, veri saklama | [[Security and Privacy]] | `## KVKK`, `## Age and consent` |
| Kullanılmayan teknolojiler ve sebepleri | [[Tech Stack]] | `## Deliberately not used in v1` |
| Bu özellik v1'de var mı | [[Scope and MVP]] | `## v1 — in scope`, `## Deferred to v1.1`, `## Explicitly out of scope` |
| Bildiğimiz ama kabul ettiğimiz riskler | [[Scope and MVP]] | `## Accepted risks (v2 §23.2)` |
| Hangi uygulama kimin için | [[Scope and MVP]] | `## Platform split for v1` |
| Hangi işin sırası ne, neden o sırada | [[Roadmap]] | `## Why this order` |
| Proje riskleri ve önlemleri | [[Roadmap]] | `## Risks` |
| Bir milestone bitince ne gösterilebilir | [[Milestones]] | `## M0 … ## M8` |
| Şu an kim ne yapıyor | [[Task Board]] | `## In progress`, `## Blocked`, `## Todo` |
| Bir işin adımları ve bitiş ölçütü | `05-Delivery/Tasks/T-xxx` | `## Steps`, `## Done when` |
| Cevabı beklenen kararlar | [[Open Questions]] | üstteki tablo (açık) + `## Answered` |
| Müşteri aslında ne demiş | `01-Product/Source - *.md` | numaralı `## §` başlıkları |
| Ekim 2026 güncellemesi neyi değiştirdi | [[Requirements v2 Delta]] | `## The headline change`, `## Business rule changes` |
| v2'deki hangi madde nereye düştü | [[Requirements Index]] | `## v2 section → requirement map` |
| İlk katalogdaki § nereye düştü | [[Requirements Index]] | `## Catalog section → requirement map` |
| Türkçe terimin kod karşılığı | [[Glossary]] | konu başlıkları (roller, iş, ders, para…) |
| Ekran listesi | [[Screen Inventory]] | `## Student (mobile)`, `## Coach (web…)`, `## Parent (web)` |
| Tasarım/ton kararları | [[UX Principles]] | `## Principles`, `## Practical constraints` |
| Kullanıcı profilleri | [[Personas]] | `## Access at a glance` |
| Neden bu ürün, iş modeli | [[Product Vision]] | `## Why it can win`, `## Business model` |
| ID, status, şablon kuralları | [[Vault Guide]] | `## ID scheme`, `## Statuses`, `## Rules for editing` |

---

## Klasör klasör: hangi notta ne var

### `Home.md`
Giriş kapısı. `## Start here` (okuma sırası) · `## Map` (akış şeması) · `## Sections` (klasör
tablosu) · `## Current state` (nerede olduğumuzun checkbox listesi).

### `00-Meta` — kasanın kullanma kılavuzu

| Not | İçinde ne var |
| --- | --- |
| [[Vault Guide]] | Dil kuralı · ID şeması · status değerleri · not nasıl eklenir · Obsidian eklentileri · **düzenleme kuralları** |
| [[Glossary]] | Türkçe ↔ İngilizce ↔ kod tanımlayıcısı. Roller, iş, ders/program, materyal, denemeler, para, ilerleme, ve yabancı katkıcılar için Türk sınav sistemi özeti |
| `Templates/` | Yeni not iskeletleri: `Requirement`, `Business Rule`, `ADR`, `Task`, `Meeting Note` |

### `01-Product` — niyet, kapsam ve müşterinin sözü

| Not | İçinde ne var |
| --- | --- |
| [[Product Vision]] | Durum tespiti · ne kuruyoruz · neden kazanabilir · iş modeli · v1 hedefi olmayanlar · başarı sinyalleri |
| [[Personas]] | Üç kişi (koç Elif, öğrenci Mert, veli Ayşe) ve `## Access at a glance` erişim özeti |
| [[Scope and MVP]] | **Kapsam kesme çizgisi.** Çekirdek döngü · v1'de olanlar · v1.1'e ertelenenler · tamamen kapsam dışı · kabul edilen riskler · platform dağılımı · kesme ilkeleri |
| [[Open Questions]] | Cevabı beklenen `Q-xx` kararları, her birinin neyi blokladığı ve **o ana kadar ne yapacağımız**; `## Answered` kapanmış olanlar |
| [[Requirements v2 Delta]] | Ekim 2026 güncellemesinin özeti: başlık değişiklik (dispute modeli) · kural değişiklikleri · yeni FR'lar · güncellenen FR'lar · açılan/kapanan sorular · **mimariyle çelişenler** |
| `Source - Requirement Catalog (TR)` | Müşterinin ilk kataloğu, 37 numaralı bölüm. **Donmuş, asla düzenlenmez.** |
| `Source - Requirements v2 (TR)` | Ekim 2026 gereksinim seti, 23 bölüm. Donmuş. |
| `Source - Decision Log (TR)` | Müşterinin karar defteri: konu konu (A–G) kararlar + `## Açık maddeler` (A-01…A-11). Donmuş. |
| `Source - Backend Plan (TR)` | Müşteri tarafının teknik planı: modüller, yetki katmanı, durum makineleri, veritabanı, yapım sırası, tahmin. Donmuş — **bizim mimarimizle çelişen yerleri var**, bkz. [[Open Questions\|Q-26]] |

### `02-Requirements` — ne yapacağız

**25 adet `FR-xx` notu.** Hepsinin iskeleti aynı, o yüzden bir kere öğrenince hepsinde aynı yerden
okursun:

| Başlık | Ne yazar |
| --- | --- |
| `## Intent` | Bu alan neden var, bir paragraf |
| `## Requirements` | Numaralı maddeler (`FR-06.4`) — **test yazdığımız birim bunlar** |
| `## Acceptance criteria` | Hangi durumda "bitti" diyeceğiz |
| `## Authorization` | Kim yapabilir, kim göremez |
| `## Design notes` / `## Implementation…` | Nasıl kuracağımıza dair notlar |
| `## Out of scope (v1)` | Bu alanın bilinçli olarak yapılmayan kısmı (her notta yok) |
| `## Open questions` | Bu alanı bekleten `Q-xx`'ler |
| `## State machine` | Durum geçişleri (FR-04, FR-05, FR-09'da var) |
| `## Change log` | Not ne zaman neden değişti |

Alanlar: `FR-01` hesaplar · `FR-02` yetki · `FR-03` öğrenci profili · `FR-04` koç–öğrenci ·
`FR-05` veli–öğrenci · `FR-06` görevler · `FR-07` ödevler · `FR-08` Filiz · `FR-09` dersler ·
`FR-10` devam · `FR-11` program · `FR-12` kaynaklar · `FR-13` dosyalar · `FR-14` ilerleme
raporları · `FR-15` denemeler · `FR-16` bildirimler · `FR-17` koç takibi · `FR-18` fiyatlandırma ·
`FR-19` puantaj/hakediş · `FR-20` veli erişimi · `FR-21` denetim kaydı · `FR-22` abonelik ·
`FR-23` çizelgeler · `FR-24` okul karnesi · `FR-25` finans modülü.
Tam liste ve durumları: [[Requirements Index]].

**31 adet `BR-xxx` notu** — `Business Rules/` altında, her biri tek kural, tek dosya. Frontmatter'da
`source: İK-xxx` ile müşterinin numarasına, `area:` ile konusuna bağlı. Konu grupları: `relationships`,
`work`, `lessons`, `schedule`, `resources`, `exams`, `money`, `authorization`, `identity`, `platform`.
Giriş: [[Business Rules Index]] — oradaki `## The five that will bite us` en sık ihlal edilecek beşini
ayırıyor.

### `03-Domain` — kavramlar ve formüller

| Not | İçinde ne var |
| --- | --- |
| [[Domain Model]] | İşin şekli · aggregate'ler (hangi veri hangi bütüne ait) · değişmezler |
| [[Entity Map]] | ERD. `## How to read it` + yanında ham `entity-map.mmd` |
| [[State Machines]] | Altı durum makinesi: koç–öğrenci linki, veli linki, iş kalemi, ders, deneme sonucu, abonelik |
| [[Authorization Matrix]] | Rol × veri matrisi. `## The five bolded cells` en kritik hücreler, `## Rules of enforcement` nasıl zorlanacağı |
| [[Pricing and Earnings]] | Kavramlar · iki fiyat modeli · ders başına hesap zinciri · tarih etkili fiyat · neden snapshot da tutuyoruz · yeniden hesaplamaya ne zaman izin var · ücretlendirme kuralları · cari hesap · koç/veli/öğrenci ne görür · para gösterimi |
| [[Progress and Filiz]] | İlerleme nereden geliyor · günlük ilerleme ve Filiz · **boş bölen problemi** · haftalık · aylık (açık) · konu yüzdeleri · uygulama notu |

### `04-Architecture` — nasıl kuracağız

| Not | İçinde ne var |
| --- | --- |
| [[Architecture Overview]] | Şema · neden bu şekil · backend modül ağacı (FR eşlemeli) · veri · yatay konular tablosu · **ölçek gerçeklik kontrolü** |
| [[Tech Stack]] | Seçimler · beraberinde gelen konvansiyonlar · dağıtım (geçici) · v1'de bilinçli kullanılmayanlar |
| [[Data Model]] | Ana tablolar · konvansiyonlar · açık kalanlar |
| [[API Conventions]] | URL'ler · istek/yanıt · hatalar · handler içinde yetki · serializer · versiyonlama |
| [[Frontend Architecture]] | Klasör yapısı · iki framework uyarlaması · routing · **import kuralları** · state ve veri |
| [[Security and Privacy]] | KVKK · bu ürüne özgü tehditler · mühendislik tabanı · yaş ve rıza |
| `Decisions/` | 16 karar kaydı. Hepsi aynı iskelet: `## Status` · `## Context` · `## Decision` · `## Consequences` · `## Alternatives considered`. Giriş: [[ADR Index]] |

Kararların konuları: monorepo (0001) · auth (0002, **0012 ile geçersiz**) · veritabanı (0003) ·
tarih etkili fiyat (0004) · tek WorkItem tablosu (0005) · merkezi yetki katmanı (0006) · doküman
dili (0007) · türetilmiş durum (0008) · feature-sliced frontend (0009) · web/mobil paylaşımı (0010) ·
i18n yok (0011) · Clerk (0012) · hesap silme (0013) · hesap başına tek rol (0014) · derlenen
workspace paketleri (0015) · development build (0016).

> Bir ADR'nin `status:` alanı `superseded by ADR-xxxx` ise o karar geçersizdir ama not silinmez —
> `ADR-0002` böyle. Neden değiştiğini anlamak için ikisini sırayla oku.

### `05-Delivery` — sıra ve şu anki durum

| Not | İçinde ne var |
| --- | --- |
| [[Roadmap]] | M0→M8 sıralaması ve bağımlılık şeması · `## Why this order` · `## Risks` · `## Before M8, talk to a real coach` |
| [[Milestones]] | Her milestone'un **çıkış kriteri** (gösterilebilir bir şey) ve içindeki iş listesi |
| [[Task Board]] | Durum durum iş listesi: in progress / blocked / todo / done, + konvansiyonlar |
| `Tasks/T-xxx` | Tek iş. İskelet: `## Steps` · `## Done when`. Bitmiş olanlarda ayrıca `## Done`, `## Deliberately not done`, `## Follow-ups` — **ne yapılmadığı ve nedeni burada yazar, en kıymetli kısım o** |

### `06-Design`

[[UX Principles]] — kime tasarlıyoruz · ilkeler · pratik kısıtlar.
[[Screen Inventory]] — öğrenci (mobil) / koç (web) / veli (web) ekranları + her ekranın ihtiyaç
duyduğu ortak durumlar (boş, yükleniyor, hata).

### `99-Archive`
Geçersiz kalan notlar. Silinmiyor, buraya taşınıyor. `attachments/` ek dosyalar için.

---

## Numaralar nasıl okunur

| Önek | Ne | Örnek | Nerede yaşar |
| --- | --- | --- | --- |
| `FR-xx` | Fonksiyonel gereksinim alanı | `FR-06` | `02-Requirements/` |
| `FR-xx.n` | Tek test edilebilir madde | `FR-06.4` | FR notunun `## Requirements` içinde |
| `BR-xxx` | İş kuralı (müşterinin `İK-xxx`'i) | `BR-009` | `02-Requirements/Business Rules/` |
| `ADR-xxxx` | Mimari karar | `ADR-0012` | `04-Architecture/Decisions/` |
| `Mx` | Milestone | `M1` | [[Roadmap]], [[Milestones]] |
| `T-xxx` | İş kalemi | `T-004` | `05-Delivery/Tasks/` |
| `Q-xx` | Açık ürün sorusu | `Q-20` | [[Open Questions]] |
| `İK-xxx` | Müşterinin kural numarası | `İK-006` | `Source - *` içinde; `BR` notunun `source:` alanı eşler |
| `A-xx` | Müşterinin açık madde numarası | `A-09` | `Source - Decision Log (TR)`; `Q-xx` yanında parantezde |
| `K-xx` | Müşterinin karar numarası | `K-24` | `Source - Decision Log (TR)`; notlarda gerekçe olarak geçer |

Numaralar **asla yeniden kullanılmaz ve yeniden numaralandırılmaz.** Düşen bir gereksinim silinmez,
`status: dropped` olur. Kodda ve commit mesajında bu numaralar yazılır:
`feat(tasks): approval flow (FR-06.5, BR-007)`.

## Status alanları ne demek

**Gereksinimler:** `draft` (katalogla karşılaştırılmadı) · `specified` (anlaşıldı, kabul kriteri var,
yapılabilir) · `in-progress` · `implemented` · `deferred` · `dropped`.
**İşler:** `todo` · `doing` · `blocked` · `review` · `done`.
**ADR:** `proposed` · `accepted` · `superseded by ADR-xxxx`.
**Kaynak dosyalar:** `frozen` — dokunulmaz.

Not: `02-Requirements` içindeki neredeyse her şey şu an `specified`. Yani **spec hazır, kod henüz
yok**; gerçek ilerleme [[Task Board]]'da görünür, FR'ların status'unda değil.

## Nereye yazılır — kısa tarif

| Elinde olan | Nereye gider |
| --- | --- |
| Yeni bir gereksinim | `Templates/Requirement` kopyala → `02-Requirements/FR-xx …` → [[Requirements Index]]'e satır |
| Yeni sert kural | `Templates/Business Rule` → `Business Rules/BR-xxx …` → [[Business Rules Index]] |
| Yapısal bir teknik karar | `Templates/ADR` → `Decisions/ADR-00xx …` → [[ADR Index]] |
| Yeni iş | `Templates/Task` → `Tasks/T-xxx …` → [[Task Board]] |
| Cevabını bilmediğin bir soru | [[Open Questions]]'a `Q-xx` satırı — **kodda uydurma** |
| Müşteri konuşması | `Templates/Meeting Note` (kararlar / cevaplanan sorular / yeni sorular / aksiyonlar) |
| Kaynak dosyada gördüğün hata | Kaynağı **düzeltme** — ilgili FR notuna yaz + [[Open Questions]]'a satır |

Kod yazarken: ilgili FR notunun `status:`'unu ilerlet, eşleşen task notunu güncelle, yapısal bir
seçim yaptıysan ADR ekle. Dokümanla kod **aynı commit'te** gider.

## Bağlantılı notlar

[[Home]] · [[Vault Guide]] · [[Glossary]] · [[Requirements Index]] · [[Business Rules Index]] ·
[[ADR Index]] · [[Task Board]] · [[Open Questions]]

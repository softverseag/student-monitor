---
title: Kapsam ve MVP (TR)
status: draft
updated: 2026-10-20
---

# Kapsam ve MVP — v1'de ne var, ne yok

[[Scope and MVP]] notunun Türkçesi. Katalog ürünün tamamını anlatıyor; **hepsi v1'de çıkmıyor.**
Bu not anlaşılmış **kesme çizgisi** — işe başlamadan önce buraya bak. Burayı değiştirmek bir ürün
kararıdır, uygulama detayı değil.

> [!note] Bu not neden Türkçe
> Anlatım notu; hiçbir karar burada verilmez. Çelişki olursa **[[Scope and MVP]] kazanır**, bu not
> eskimiş demektir. Aynı gerekçe: [[Kasa Haritası (TR)]], [[Gereksinimler (TR)]].

Kesme çizgisi Ekim 2026 gereksinim setiyle yeniden çizildi: denemeler, kaynaklar, dosyalar, karne,
çizelgeler ve opsiyonel finans modülü **v1'e girdi**; düzenlenebilir takvim ızgarası, müfredat
modülü, QR ile bağlanma ve ödeme entegrasyonu **v1'den çıktı**.

**20 Ekim 2026'da yeniden çizildi:** **finans modülünün tamamı v1'den çıktı**
([[FR-18]], [[FR-19]], [[FR-25]]) ve platform dağılımı değişti — mobil üç rolü de taşıyor, web
yalnızca koça açık bir portala indi ([[ADR-0017]]). İkisi de aşağıdaki tablolarda.

## Önce oturtmamız gereken çekirdek döngü

> Koç plan hazırlar ve iş atar → öğrenci yapar ve "bitti" der → **sistem öğrenciye inanır**
> ([[BR-006]]); koç örnekleme bakar, gerektiğinde geri gönderir veya o kalemi onaya bağlar →
> iki taraf da dürüst bir ilerleme görür.

Diğer her şey — dersler, para, denemeler, veliler — bu döngünün üstüne asılı. **Döngü telefonda
pürüzsüz değilse gerisinin anlamı yok.**

## v1 — kapsam içinde

| Alan | Gereksinim | Neden v1 |
| --- | --- | --- |
| Hesaplar, giriş, roller | [[FR-01]], [[FR-02]] | bunsuz hiçbir şey çalışmaz |
| Öğrenci sınıf seviyesi | [[FR-03]] | ucuz, bağlam için gerekli |
| Koç–öğrenci bağı (davet kodu/linki, başvuru, ilişkiyi bitirme) | [[FR-04]] | ürün zaten ilişkinin kendisi |
| Veli bağı, koç onaylı, en fazla 2 | [[FR-05]] | aile döngüsünü kapatıyor |
| Görevler + ödevler (itiraz modeli, toplu onay) | [[FR-06]], [[FR-07]] | çekirdek döngü |
| **Çizelgeler — bir kez hazırla, çoğuna ata** | [[FR-23]] | müşteri "v1'in en önemli modülü" diyor; aboneliği haklı çıkaran şey |
| Filiz ilerleme karakteri (eşikler karara bağlandı) | [[FR-08]] | öğrencinin uygulamayı her gün açma sebebi |
| Ders isteği / kabul / ret / iptal, 3 ders tipi, grup dersleri | [[FR-09]] | ilişkinin takvim tarafı |
| Devam kaydı (hep açık, finanstan bağımsız) | [[FR-10]] | velinin ilk sorusu — finans v1.1'de gelince hakedişin de girdisi. v1'de kalıyor; takvim işiyle birlikte tekrar bakılacak |
| Salt okunur öğrenci zaman çizelgesi + okul saati ayarı | [[FR-11]] | ızgaranın maliyetine girmeden günün özeti |
| Deneme takibi (net otomatik, koç onayı) | [[FR-15]] | sınav hazırlığında en çok bakılan sayı |
| Kaynak havuzu + öneriler | [[FR-12]] | ödevleri besliyor, küçük iş |
| Dosya paylaşımı (PDF, 25 MB, koç → öğrenci) | [[FR-13]] | WhatsApp'a dönmek için bir sebep daha az |
| Okul karnesi | [[FR-24]] | 1–2 günlük iş, velinin en sevdiği veri (K-33) |
| Günlük + haftalık + aylık ilerleme, plandan konu yüzdesi | [[FR-14]] | döngünün işlediğini kanıtlıyor |
| Olay bildirimleri, görev saati hatırlatmaları (sessiz saatlerle), hedef kitleli şablonlar | [[FR-16]] | öğrenciye uygulamayı açtıran tek mekanizma (K-35) |
| Koç takip ekranı | [[FR-17]] | koçun 30 öğrenciyi nasıl yöneteceği |
| Veli salt okunur görünümü, 2 anahtar arkasında (ilerleme, denemeler) | [[FR-20]] | güven döngüsünü kapatıyor |
| Öğrenci limitli ücretsiz beta | [[FR-22]] | v1.1 paket kademeleri bir şey ifade etsin diye (K-28) |
| İlk günden denetim kaydı | [[FR-21]] | sadece-ekleme, sonradan geriye doldurulamaz |

## v1.1'e ertelenenler — her satır bilinçli bir takas

| Alan | Gerekçe |
| --- | --- |
| **Finans modülünün tamamı — fiyat, puantaj, hakediş, cari hesap, ekstre** ([[FR-18]], [[FR-19]], [[FR-25]]) | **20 Ekim 2026'da karara bağlandı.** İki gerekçe: başkasının parasına dokunmak hukuki ve KVKK riski taşıyor, acele edilmemeli; ayrıca koçlar ücreti zaten kendi usulüyle takip ediyor, acil bir ihtiyaç değil. v1 bunun yerine koçluk döngüsünü kanıtlıyor. Kurallar yazılı kalıyor ([[BR-020]]–[[BR-023]], [[BR-028]], [[BR-029]]), sadece uygulanmıyor. |
| Ödeme / abonelik faturalandırma entegrasyonu | fiyatlar belirsiz; önce ücretsiz beta ([[Open Questions\|Q-10]]) |
| Excel'den plan içe aktarma | plan editörü + plan kopyalama işi görüyor; koçların dosyalarında ortak bir şekil yok ([[FR-23]]) |
| Düzenlenebilir öğrenci takvim ızgarası | koç zaten göremiyor ([[BR-014]]) — yüksek maliyet, ticari getirisi yok (K-36) |
| Bağımsız müfredat/konu modülü | içerik üretim maliyeti; bunun yerine plan görevlerinden türetiliyor (K-26) |
| QR ile bağlanma | davet kodu ve linki yeterli |
| Kaynak içi ilerleme (kaçıncı sayfa/test) | v1'de havuz sadece kitabın kimliğini tutuyor |
| Yüklenen dosyalarda virüs taraması | bilinçli ertelenmiş risk; içerik tipi doğrulaması v1'de var ([[FR-13]]) |
| Uçtan uca finans şifrelemesi (anahtar koçta) | 3–4 haftalık iş; önce koçun gerçekten çekindiğini doğrula (K-08). Modülün kendisi v1 dışıyken zaten konusuz. |
| Admin / destek paneli | v1'de doğrudan veritabanı erişimi |
| Kurum / çok koçlu organizasyon hesapları | beklentiler bireysel koç modeliyle **çelişiyor**; veri modelinde nullable bir `organizationId` tutuluyor (K-12) |

## Tamamen kapsam dışı

- **Koç ile veli arasında ödeme.** Ne borçlu olduğunu *hesaplıyoruz*, parayı taşımıyoruz (K-01).
- **Sohbet / mesajlaşma.** Bildirimler tek yönlü. **Kabul edilmiş risk:** koçluk muhabbeti
  WhatsApp'ta kalacak ve görev konuşmasını da oraya çekebilir; beta geri bildiriminden sonra
  yeniden bakılacak.
- **Yapay zekâ hiçbir şey** — şablonlar saklı metin, prompt değil. Tüm v1 için geçerli.
- **İçerik:** soru bankası yok, video yok, müfredat yok.
- **Koç bulma / pazar yeri** yok.

## Kabul edilmiş riskler

1. **Mesajlaşma yok** — yukarıdaki.
2. ~~**iOS'ta PWA push'u** ancak uygulama ana ekrana eklenirse çalışıyor.~~ **20 Ekim 2026'da
   kapandı** — gerçek bir mobil uygulama çıkarıyoruz ([[ADR-0017]]), push native çalışıyor. Tek
   PWA planının kaybetmesinin başlıca sebebi de buydu.
3. **Öğrenci kullanımı koça bağlı** — koç ısrar etmezse veri girilmez, Filiz boş kalır. Davet
   sürtünmesini minimumda tut.
4. **KVKK sıralaması ters** — öğrenciler kendileri kaydoluyor ama çoğu reşit değil, veli bağı ise
   koç onayını bekliyor. **İlk gerçek kullanıcıdan önce çözülmeli** ([[Open Questions|Q-12]]).
5. **Yetişkin–çocuk etkileşimi** — şikâyet/engelleme mekanizmaları ve dosya içeriği denetimi yasal
   sorumluluk için gerekli.

## v1'de platform dağılımı

20 Ekim 2026'da karara bağlandı — [[ADR-0017]]. Tek PWA planı (K-27) reddedildi;
[[Open Questions|Q-26]]'nın kimlik doğrulama tarafı (Clerk mi, kendi JWT'miz mi) hâlâ açık.

| Uygulama          | Kitle                              | Kapsam                                                                                                                            |
| ----------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Mobil** (Expo)  | **üç rol de** — koç, öğrenci, veli | ürünün kendisi. Tam öğrenci ve koç deneyimi; velinin tek salt-okunur ekranı                                                       |
| **Web** (Next.js) | **yalnızca koç**                   | uygulamanın tanıtım sitesi + girişli koç portalı; var olma sebebi çizelge hazırlamanın ([[FR-23]]) klavye ve büyük ekran istemesi |
| **API** (NestJS)  | hepsi                              | tek backend, **tüm yetkilendirme burada** ([[BR-024]])                                                                            |

Kolay yanlış anlaşılan iki sonuç:

- **Web'e özel hiçbir şey yok.** Koçun web'de yapabildiği her şeyi mobilde de yapabiliyor; web bir
  kolaylık, bir yetenek değil. Koç nereden çalışacağına kendi karar veriyor.
- **Web girişinin koça açık olması bir ürün kararı, güvenlik sınırı değil.** API rolden ve
  istemciden bağımsız kalır, yetki ilişkiye bakar — veriyi asla "hangi istemci çağırdı" ile korumayız.

## Kesme ilkeleri

1. Bir özellik **doğru yetkilendirilemiyorsa çıkmaz.**
2. Bir iş kuralı hâlâ açıksa ([[Open Questions]]), o kurala bağlı **olmayan** kısmı çıkar.
3. **Tarih yazan her şey erken çıkar**, üstündeki raporlama sonra gelse bile — raporu sonradan
   üretebiliriz, olayı üretemeyiz.
4. Finans modülü **ayrılabilir** olmalı: varsayılan kapalı, çıkarken silinebilir ([[BR-029]]).
   Artık v1'in tamamen dışında — bu, aynı ilkenin en güçlü hali. Yine de v1'de hiçbir şey "para hiç
   gelmeyecek" varsayımıyla kurulmayacak.

## Bağlantılı notlar

[[Scope and MVP]] · [[Gereksinimler (TR)]] · [[Kasa Haritası (TR)]] · [[Roadmap]] · [[Milestones]] ·
[[Open Questions]]

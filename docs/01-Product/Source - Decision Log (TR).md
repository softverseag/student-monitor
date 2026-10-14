---
title: Source - Decision Log (TR)
type: source-document
language: tr
status: frozen
received: 2026-10-14
updated: 2026-10-14
---

> [!danger] Do not edit this note
> The client's decision record (`K-01`..`K-43`) and open items (`A-01`..`A-11`), received as
> `02-KARARLAR.md`. Every decision is folded into the `FR-xx` / `BR-xxx` notes and every open item
> is tracked as a `Q-xx` in [[Open Questions]] — the mapping lives in [[Requirements v2 Delta]].
> Cite decisions as `K-xx` next to the requirement they shaped.

# Karar Kaydı

> Verilen her kararın gerekçesiyle birlikte kaydı. Bir karar değişirse burası güncellenir ve
> `01-GEREKSINIMLER.md` ile `03-BACKEND-VE-DB.md` ona göre düzeltilir.
>
> Amaç: aynı tartışmayı ikinci kez yapmamak.

---

## A. Ticari model ve finans

**K-01 — Tahsilat v1'de yok.**
Sistem para taşımaz; hesaplar ve gösterir.
*Gerekçe:* ödeme kuruluşu mevzuatı, komisyon ve fatura zinciri yükü v1'de taşınamaz. Ayrıca kayıt dışı çalışan koçların tercihiyle doğrudan çatışır.

**K-02 — Fiyat manuel, koç–öğrenci ilişkisine ait, iki model.**
`ders_basi` ve `aylik_sabit`.
*Gerekçe:* fiyatlar öğrenciden öğrenciye ve koçtan koça değişiyor, sabit tarife yok. Türkiye'de koçlukta baskın model aylık paket; ilk metin ise yalnızca ders başı mantığıyla yazılmıştı.

**K-03 — Ders türü ayrı eksen.**
birebir / grup / deneme analizi — her tür için ayrı tutar.
*Gerekçe:* prototipte bu ayrım zaten vardı ve gerçek kullanıma uyuyor.

**K-04 — Grup dersinde ücret öğrenci başına, bölüşme yok.**
Takvimde tek ders kaydı, öğrenci başına ayrı yoklama ve hakediş satırı.
*Gerekçe:* fiyat zaten koç–öğrenci ilişkisine bağlı; 400 TL "grup dersinin fiyatı" değil "o öğrencinin grup dersi fiyatı". Bölüşme mantığı yazmaya hiç gerek kalmıyor, her öğrencinin ücreti farklı olabiliyor, biri gelmezse yalnızca onun satırı düşüyor.

**K-05 — Hakediş kaynağı fiyat modeline göre değişir.**
Ders başı → gerçekleşen ders kayıtları. Aylık sabit → dönem + aktif ilişki.
*Gerekçe:* ilk metnin §29.2'si "hakedişin kaynağı takvimdir" diyordu; aylık sabit modelde bu yanlış. Motor "dönem üretir, dönemin tutarı modele göre hesaplanır" şeklinde kurulacak.

**K-06 — Cari hesap mantığı.**
Hakediş = borç, elle girilen tahsilat = alacak, fark = bakiye. Görünüm aylık ekstre.
*Gerekçe:* veliye borç gösteriliyorsa borcun kapanma yolu da olmalı; yoksa rakam büyür ve ekrana kimse bakmaz. "Muhasebesini programdan yapsın" hedefinin asıl karşılığı borç/tahsilat dengesidir, hakediş tek başına değil.

**K-07 — Finans modülü opsiyonel ve varsayılan kapalı.**
*Gerekçe:* kayıt dışı çalışan koçun "mali denetim buradan veri çeker" korkusu gerçek bir benimseme riski. Modül kapalıyken uygulamanın geri kalanı tam çalışıyor, böylece korkan koç da ürünü kullanabiliyor.

**K-08 — Şifreleme Kademe 1: sunucuda şifreli, anahtar işletmede.**
Koça dürüst bildirim yapılır: yasal talep gelirse açmak zorunludur.
*Gerekçe:* uçtan uca şifreleme (Kademe 3) 3-4 haftalık iş ve tüm gelecek finans özelliklerini pahalılaştırıyor; henüz tek ödeyen müşteri yokken yapılacak yatırım değil. Kademe 1 geri dönülebilir bir karar, Kademe 3 değil.
*Not:* veri minimizasyonu ve şifreleme meşru mühendislik tercihleridir. Riskli olan tasarım değil **konumlandırmadır** — ürün "mali denetimden korunma aracı" olarak pazarlanmaz.

**K-09 — Finans modülü kapatılırken "verileri sil" seçeneği olur, gerçek silmedir.**
*Gerekçe:* koç tedirgin olduğu anda tek tıkla temizleyebileceğini bilirse veri girmeye daha istekli olur. Soft-delete bu sözü boşa çıkarır. İK-025'in tanımlı istisnası.

**K-10 — Veli borç görünürlüğü ayrı bir anahtar, ilişki bazında.**
*Gerekçe:* zorunlu olmamalı; koç kontrol etmeli.

**K-11 — Ders takvimi ve yoklama finanstan bağımsız, her zaman açık.**
*Gerekçe:* yoklama pedagojik veri, finansal değil; finans kapalıyken de koçun işine yarıyor.

**K-28 — v1 ücretsiz beta, faturalama v1.1.**
*Gerekçe:* fiyatlandırma belirlenmedi; elde tutma oranı görülmeden fiyat verilemez. Beta'nın duyurulmuş bitiş tarihi olur — süresiz ücretsiz başlayıp sonra para istemek en zor dönüşümdür. Öğrenci limiti koda baştan konur ki paket kademeleri sonradan anlam taşısın.

---

## B. Müşteri ve kapsam

**K-12 — Hedef müşteri bireysel koç. Kurum v1'de yok.**
Veri modelinde boş bırakılabilir `kurum_id` alanı hazır tutulur.
*Gerekçe:* kurum beklentileri bireysel koç beklentilerinin üstüne eklenen özellikler değil, bir kısmı **doğrudan çelişiyor** — öğrenci sahipliği (koça mı kuruma mı), para akışının yönü (koç kazanır / kurum kazanır + koça öder), ve en önemlisi: hiçbir kurum "finansı göremiyoruz, anahtar koçta" modelini kabul etmez. İkisini birlikte kovalamak ikisine de yetmeyen ürün üretir.
*Not:* "kurumlar ne ister" sorusunun gerçek cevabı 3-5 kurum yöneticisiyle görüşmeyle çıkar, tahminle değil. Yazılımı bloke etmez, paralelde yürür.

**K-27 — Platform: tek PWA.**
Koç geniş ekran düzeni, öğrenci ve veli mobil düzen. Mağaza uygulaması yok.
*Gerekçe:* tek kod tabanı, mağaza onay süreci yok, anında güncelleme. Koç zaten masaüstü portal istiyor, öğrenci telefon istiyor — responsive tek uygulama ikisini de karşılıyor.
*Bedeli:* iOS'ta push bildirimi yalnızca uygulama ana ekrana eklenirse çalışır.

**K-37 — Tek monolit + ayrı arka plan süreci. Mikroservis yok.**
*Gerekçe:* 2 kişiyle mikroservis, ürünü değil altyapıyı geliştirmek demek.

**K-38 — Yığın: Next.js + NestJS + Postgres (Neon) + JWT + Resend, dosya için Cloudflare R2.**
*Gerekçe:* ekibin bildiği yığın. Bilinen yığın, bilinmeyen "daha iyi" yığından her zaman hızlıdır.

---

## C. Çalışma akışı (görev ve ödev)

**K-13 — Onay akışı varsayılan olarak itiraz modeli.**
Öğrenci "tamamladım" dediğinde iş anında tamamlanmış sayılır; koç sonradan geri gönderebilir.
*Gerekçe:* her iş koç onayı beklerse 30 öğrencili bir koç günde yüzlerce onay tıklaması yapar. İki hafta yapar, sonra ya hepsini kör onaylar (veri anlamsızlaşır) ya da uygulamayı bırakır.

**K-14 — Koç iş bazında "onay gerekli" işaretleyebilir.**
*Gerekçe:* kontrolü kaybetmemesi için. Kuralı sistem değil koç seçiyor.

**K-15 — Toplu onay var (genel + öğrenci içi), toplu geri gönderme yok.**
*Gerekçe:* varsayılan otomatik olduğu için onay kuyruğuna yalnızca işaretli işler düşer, yani kuyruk baştan küçük; toplu onay onun emniyet valfi. Geri gönderme açıklaması bağlama özel, toplu yapılırsa anlamsızlaşır.

**K-16 — Toplu onay denetim kaydına iş başına ayrı yazılır.**
"Toplu onayla yapıldı" işaretiyle.
*Gerekçe:* tek toplu kayıt yazılırsa izlenebilirlik bozulur ve "bu işi gerçekten onayladı mı" sorusu cevaplanamaz.

**K-19 — Gecikme saatini koç ayarlar, değer işin üstüne kopyalanır ve donar.**
*Gerekçe:* koç ayarını sonradan değiştirdiğinde geçmiş işlerin gecikme durumu değişmemeli. Fiyat snapshot mantığının aynısı. Ayrıca iki koçlu öğrencide "hangi saat geçerli" sorusu kendiliğinden ortadan kalkıyor.

**K-22 — Görev ve ödev tek tablo + `tip` alanı.**
Türe özel opsiyonel alanlar: görev → plan, saat, süre, tekrar; ödev → kaynak, teslim tarihi.
*Gerekçe:* ilk metinde ödev bölümü görev bölümünün birebir kopyasıydı. Gerçek fark kaynak ve ek alanlarda, yaşam döngüsünde değil — durumlar, onay, gecikme mantığı, geçmiş ve bildirim aynı. Ayrı tutmak ikinci bir durum makinesi, ikinci onay akışı, ikinci istatistik motoru demek. Arayüzde ayrı ekranlar korunur, altındaki motor tek olur.

---

## D. İlişkiler ve yetki

**K-17 — Öğrenci kendi başına koçtan ayrılabilir, veli onayı yok.**
*Gerekçe:* prototipteki "ayrılma talebi veli onayına gider" kuralı üç yerle çelişiyordu: İK-002 öğrenciye doğrudan yetki veriyor, velinin yönetim yetkisi yok, ve velisi bağlı olmayan öğrenci hiç ayrılamaz hale geliyordu.

**K-18 — İlişki sonlandıktan sonra koçun erişimi salt-okunur.**
Koç geçmişi görür, yeni içerik üretemez. Öğrenci o koçun dosya ve kaynak önerilerini görmeye devam eder.
*Gerekçe:* hakediş geçmişi için koçun geçmişi görmesi zorunlu; yeni içerik üretmesi ise ilişki bittiği için anlamsız.

**K-20 — Görme / yönetme ayrımı yazılı kural haline getirildi.**
Öğrencinin kendi verisi tüm aktif koçlara görünür; koçun ürettiği içerik yalnızca sahibi tarafından yönetilir.
*Gerekçe:* ilk metinde §33 bu ilkeye dayanıyordu ama ilke hiç yazılmamıştı. Yazılmazsa ortaya çıkacak somut hata: ekranda öğrencinin tüm ödevleri tek listede ve her satırda "Onayla" düğmesi; geliştirici doğal olarak hepsine yetki verir, Koç B Koç A'nın ödevini onaylar, İK-007 bozulur ve Koç A'nın öğrenci takibi yanlış veri gösterir.

**K-21 — Deneme sonucunu onaylayacak koçu öğrenci seçer.**
Tek koçu varsa alan gösterilmez, otomatik atanır.
*Gerekçe:* deneme sonucu öğrencinin verisi. Aynı desen öğrencinin başlattığı her onay akışında kullanılacak.

**K-29 — Veli görünürlük anahtarları 3'e indirildi: ilerleme, deneme, finans.**
*Gerekçe:* prototipte 7 anahtar vardı (günlük, eksikler, haftalık, denemeler, ücret, koç notu, dosyalar). Maliyet anahtar sayısı değil kombinasyon sayısı: 7 anahtar = 128 olasılık ve her birinde velinin ekranı boş/yarım kalmadan görünmek zorunda. Koç da öğrenci başına 7 anahtarı ince ayar yapmaz. 3 anahtar = 8 kombinasyon, tasarlanabilir. Deneme sonucu hassas olabildiği için ayrı tutuldu.

---

## E. Eğitim içeriği

**K-25 — Müfredat verisi yok. Ders ve konu serbest metin.**
Koçun kendi geçmiş girdilerinden otomatik tamamlama önerilir.
*Gerekçe:* her sınıf seviyesi için ünite/konu listesi hazırlamak yazılım değil içerik işi ve haftalar sürer. Koçlar ve öğrenciler sorumlu oldukları konuları zaten biliyor. Otomatik tamamlama gerekli, yoksa "Türev" / "Türev ve uygulamaları" diye ikiye bölünür ve konu yüzdesi anlamsızlaşır.

**K-26 — Konu ilerlemesi plandan türetilir.**
Bağımsız müfredat modülü v1.1.
*Gerekçe:* konu zaten planın içinde bir düğüm; o konuya bağlı görevlerin tamamlanma oranı yüzdeyi veriyor. Ek veri, ek giriş, ek ekran yok. Kısıtı: yalnızca plandan gelen görevleri sayar.

**K-30 — Net otomatik hesaplanır, puan manuel girilir.**
Net kuralı sınav türüne göre değişir (ör. TYT/AYT'de yanlış ÷ 4).
*Gerekçe:* ilk metin "her şey manuel" diyordu; prototip daha iyisini yapmış. Net formülleri sabit ve bilinen, ucuz; öğrenciyi ders bazında net hesaplamaya zorlamak ise veri girişini öldürür.

**K-31 — Deneme ders sonuçları değişken yapıda saklanır.**
*Gerekçe:* ders listesi sınav türüne göre değişiyor (TYT 4 ders, AYT farklı, LGS farklı). Veri modeli tek sabit formüle bağlanmaz, yeni sınav türü eklenebilir olmalı.

**K-32 — Dosya paylaşımı daraltıldı.**
Yalnızca PDF, 25 MB, yalnızca koç → öğrenci, klasör/versiyon yok.
*Gerekçe:* yükleme ucuz; pahalı olan depolama, tarama ve sorumluluk. Lehine argüman: dosya uygulama içindeyse koçun WhatsApp'a dönmesi için bir sebep daha azalır.

**K-33 — Okul karnesi v1'de.**
*Gerekçe:* onay akışı yok, bildirim yok, durum makinesi yok — 1-2 günlük iş. Üstelik velinin en çok ilgilendiği somut veri.

**K-34 — Veli bildirim şablonları v1'de.**
*Gerekçe:* şablon tablosuna bir "hedef kitle" alanı eklemek yeterli; alıcı seçicinin veliyi desteklemesi zaten gerekiyor.

**K-35 — Görev saati hatırlatmaları v1'de.**
Öğrencinin sessiz saatlerine uyulur.
*Gerekçe:* öğrencinin uygulamayı açmasını sağlayan tek mekanizma bu. Olmadan uygulama pasif kalır ve ölür. Getirdiği altyapı: zamanlanmış iş çalıştırıcı + web push.

**K-36 — Düzenlenebilir öğrenci takvim ızgarası v1.1'e.**
Yerine salt-okunur gün/hafta zaman şeridi + tek "okul saatleri" ayarı.
*Gerekçe:* ızgarayı koç göremiyor (İK-014), yani ticari karşılığı yok; buna karşılık mobil dokunmatik ızgara + çoklu seçim bu uygulamadaki en zahmetli arayüzlerden biri. Görevler zaten saat ve süre taşıdığı için günlük liste öğrencinin programının kendisi.

---

## F. Ürün tonu ve Filiz

**K-23 — Filiz tonu: nazik ve cesaretlendirici. Tek varyant.**
*Gerekçe:* prototipte "hafif suçluluk hissettiren" seçeneği vardı. Kullanıcı kitlesi reşit değil; suçluluk üzerinden motivasyon hem etik olarak hem veli şikâyeti açısından riskli.

**K-24 — Filiz 4 durum, eşikler: %0–24 / %25–74 / %75–99 / %100.**
Görev ve ödev için ayrı hesap. Animasyon yalnızca günlük görünümde.
*Gerekçe:* prototipte belirlenmişti. Eşikler değiştirilebilir iş kuralı olarak tek yerde tutulur.

---

## G. Teknik değişmezler

**K-39 — Finans verisi ayrı veritabanı şemasında.**
`app` şemasından `finance` şemasına bağlantı yok, tutarla join yok.
*Gerekçe:* finans opsiyonel ve ileride şifreleme kademesi değişebilir. Ayrı şemada duruyorsa geçiş tek yeri etkiler.

**K-40 — Üç değişmez kural.**
1. Tüm zaman damgaları tek biçimde saklanır, gösterimde Türkiye saatine çevrilir.
2. Tutar oluştuğu anda donar (snapshot). Aynısı gecikme saati için de geçerli.
3. Denetim kaydı ilk günden yazılır, sonradan geriye doldurulamaz.

**K-41 — Tutar asla loglara, bildirim metnine, analitik olaylarına veya arama indeksine girmez.**
*Gerekçe:* en çok hata yapılan yer. Veriyi şifreleyip tutarı bildirim metnine koymak şifrelemeyi yalan yapar.

**K-42 — Hesaplama mantığı saf fonksiyonlarda, tek yerde.**
İlerleme yüzdeleri, gecikme kuralı, Filiz eşikleri, net formülleri.
*Gerekçe:* bunlar değişecek iş kuralları; dağıldıklarında değiştirmek için 40 yer aranır. Ayrıca ileride istemci tarafına taşınabilmeleri gerekiyor (bkz. K-08 → Kademe 3 geçişi).

**K-43 — Tek anlamlı test takımı: yetki matrisi.**
Her kaynak × her rol × her ilişki durumu.
*Gerekçe:* bu projede hata maliyeti en yüksek yer veri sızması. Her şeyi test etmeye çalışmak yerine buraya odaklanmak.

---

## Açık maddeler

| No | Konu | Neyi bloke ediyor |
|---|---|---|
| **A-01** | Onaylanmamış deneme sonucu istatistiğe girer mi? (İK-017) | Deneme istatistik modülü |
| **A-02** | Abonelik paketleri ve fiyatları | v1.1 faturalama |
| **A-03** | Beta'da koç başına aktif öğrenci limiti (sayı) | Limit kontrolü |
| **A-04** | Karne notu ölçeği: 100'lük mü 5'lik mi | Karne modülü |
| **A-05** | İki koç aynı öğrenciye aynı saate ders koyarsa engellenecek mi | Ders modülü |
| **A-06** | KVKK: 18 yaş altı veli onayı akışı, veri sorumlusu kim, saklama süreleri, silme talebi akışı | Kayıt akışı — **ilk gerçek kullanıcıdan önce** |
| **A-07** | Dosya saklama politikası: ne kadar süre, ilişki bitince ne olur | Dosya modülü |
| **A-08** | Deneme sonucu reddedilirse ne olur (öğrenci düzeltip yeniden gönderir mi) | Deneme modülü |
| **A-09** | Aylık genel ilerleme formülü | Aylık rapor |
| **A-10** | Repo nerede olacak: `softverseag` org'u mu kişisel hesap mı | Repo kurulumu |
| **A-11** | "Katılmadı" durumu ücretlendirilecek mi (koç bazında ayarlanabilir, varsayılan ne olacak) | Hakediş motoru |

---

## Değişiklik geçmişi

| Tarih | Ne değişti |
|---|---|
| 2026-10-10 | İlk sürüm. Adım 1-3 kararları (K-01 … K-43) ve açık maddeler (A-01 … A-11) kaydedildi. |

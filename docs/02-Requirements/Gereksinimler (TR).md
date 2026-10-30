---
title: Gereksinimler (TR)
status: draft
updated: 2026-10-30
---

# Gereksinimler — ne yapacağız, sade Türkçe

Bu not `02-Requirements` klasörünün tamamını tek sayfada, Türkçe anlatıyor: **25 fonksiyonel
gereksinim** (`FR-01`–`FR-25`) ve **31 iş kuralı** (`BR-001`–`BR-031`). Amaç, müşteriyle veya ekibe
yeni katılan biriyle konuşurken İngilizce notları tek tek açmak zorunda kalmamak.

> [!note] Bu not neden Türkçe
> Kasa kuralı "her not İngilizce" ([[Vault Guide]]). Bu, [[Kasa Haritası (TR)]] gibi bilinçli bir
> istisna: notun işi **anlatmak**, karar vermek değil. Burada hiçbir yeni kural yok — her madde
> ilgili `FR-xx` / `BR-xxx` notundan geliyor.
>
> **Çelişkide İngilizce not kazanır.** Burayla ilgili not çelişirse bu sayfa eskimiş demektir;
> düzeltilecek yer burasıdır, oradaki not değil.

Resmî, test yazdığımız metin hâlâ İngilizce notlar: [[Requirements Index]] ve
[[Business Rules Index]]. Kodda ve commit'te `FR-06.4` / `BR-009` diye bunlara atıf veriyoruz.

---

## Nasıl okunur

| Şey | Ne demek |
| --- | --- |
| `FR-xx` | Bir fonksiyon alanı (ör. görev yönetimi). İçinde numaralı maddeler var |
| `FR-xx.n` | Tek, test edilebilir madde. **Test birimimiz bu** |
| `BR-xxx` | Pazarlığı olmayan iş kuralı. Müşterinin `İK-xxx` numarasının karşılığı. İhlali hatadır |
| `Q-xx` | Hâlâ cevabı gelmemiş ürün sorusu → [[Open Questions]] |
| `K-xx` | Müşterinin karar defterindeki karar numarası → `Source - Decision Log (TR)` |
| `[V1.1]` | v1'de bilinçli olarak yapılmıyor, sonraya bırakıldı |

Numaralar **asla yeniden kullanılmaz**. Düşen bir gereksinim silinmez, `status: dropped` olur.

İki kaynak var ve ikisi de donmuş: müşterinin ilk kataloğu (Eylül 2026) ve
**Ekim 2026 güncellemesi (v2)**. v2'nin neyi değiştirdiği [[Requirements v2 Delta]]'da.
Aşağıda "v2" diye geçen her yer o güncellemeden geliyor.

## 25 alan, tek bakışta

| ID | Alan | Öncelik | v1 |
| --- | --- | --- | --- |
| FR-01 | Hesaplar ve oturumlar | zorunlu | ✅ |
| FR-02 | Roller ve yetkilendirme | zorunlu | ✅ |
| FR-03 | Öğrenci profili ve sınıf seviyesi | zorunlu | ✅ |
| FR-04 | Koç–öğrenci ilişkisi | zorunlu | ✅ |
| FR-05 | Veli–öğrenci ilişkisi | zorunlu | ✅ |
| FR-06 | Görev yönetimi | zorunlu | ✅ |
| FR-07 | Ödev yönetimi | zorunlu | ✅ |
| FR-08 | Filiz (ilerleme karakteri) | olmalı | ✅ |
| FR-09 | Ders planlama ve iptal | zorunlu | ✅ |
| FR-10 | Derse devam | zorunlu | ✅ |
| FR-11 | Öğrenci programı ve gizliliği | zorunlu | ✅ |
| FR-12 | Kaynak havuzu ve öneriler | olmalı | ✅ |
| FR-13 | Dosya paylaşımı | olmalı | ✅ |
| FR-14 | İlerleme raporlama (gün/hafta/ay) | zorunlu | ✅ |
| FR-15 | Deneme takibi | zorunlu | ✅ |
| FR-16 | Bildirimler | zorunlu | ✅ |
| FR-17 | Koçun öğrenci takibi | zorunlu | ✅ |
| FR-18 | Öğrenci bazlı fiyatlandırma | zorunlu | ⏳ v1.1 |
| FR-19 | Puantaj ve hakediş | zorunlu | ⏳ v1.1 |
| FR-20 | Veli bilgi erişimi | zorunlu | ✅ |
| FR-21 | Denetim kaydı (durum/işlem geçmişi) | zorunlu | ✅ |
| FR-22 | Abonelik ve ticari model | olmalı | ✅ |
| FR-23 | Çalışma çizelgeleri (plan) | zorunlu | ✅ |
| FR-24 | Okul karnesi | olmalı | ✅ |
| FR-25 | Finans modülü ve cari hesap | zorunlu | ⏳ v1.1 |

Neredeyse hepsi `specified` durumda: **spec hazır, kod henüz yok.** Gerçek ilerleme
[[Task Board]]'da görünür, FR'ların status'unda değil. Neyin v1'de olduğu [[Scope and MVP]]'de
kesinleşir.

---

# Bölüm 1 — Fonksiyonel gereksinimler

## Kimlik ve yetki

### FR-01 — Hesaplar ve oturumlar

**Niyet.** Koç, öğrenci ve veli kendi hesabını açabilir. Kayıt olmak bir **kişi** yaratır, bir
**ilişki** değil: yeni hesap, bağlantı kurulana kadar kimse hakkında hiçbir şey görmez.

- Kullanıcı koç, öğrenci veya veli olarak kaydolur; kayıt hiçbir zaman iki kullanıcıyı otomatik
  bağlamaz.
- Giriş, çıkış, kendi profilini görme/düzenleme, şifre kurtarma.
- Oturum mobilde uygulama kapanınca kaybolmaz; webde hareketsizlikte düşer. Çıkış, refresh
  token'ı geçersiz kılar.
- Yeni hesabın açılış ekranı **boş durum**: öğrenciye davet kodu, koça "ilk öğrencini davet et",
  veliye "erişim iste".
- **FR-01.8** Kullanıcı kendi hesabını silebilir. Kimlik bilgileri silinir, geçmiş kayıt
  **anonimleştirilerek korunur** ([[BR-025]], [[ADR-0013]]).
- **FR-01.9** Kayıttan sonra rol bir kez seçilir ve **hayat boyu değişmez** ([[ADR-0014]]).
  **Tartışmaya açıldı — [[Open Questions|Q-27]]:** "hesap başına tek rol" tamam, ama **kalıcı
  olması** lansman için fazla iddialı. Muhtemel esnetme: hesap **boşken** (hiç bağ, hiç içerik yok)
  rol değiştirilebilsin. Dört seçenek, maliyetleri ve her birinin savunması tek sayfada:
  [[Q-27 Role Permanence - Decision Brief]] — karar ortakla birlikte verilecek. Karar gelene kadar
  madde yazıldığı gibi geçerli.

**Dikkat.** Şifre sıfırlama bir e-postanın kayıtlı olup olmadığını sızdırmamalı. Silinmiş bir
hesabın token'ı çalışmamalı — sessizce yeniden yaratılmamalı.

**Açık.** [[Open Questions|Q-12]] reşit olmayan kullanıcıda KVKK rızasını kim verir ·
[[Open Questions|Q-19]] hesap silmede bekleme süresi olmalı mı ·
[[Open Questions|Q-27]] rol gerçekten kalıcı mı olmalı.

> [!check] Okundu — 2026-10-19, Batuhan Elmas
> FR-01 baştan sona okundu. **FR-01.9 dışındaki** her madde olduğu gibi kabul edildi; FR-01.9
> ikinci okumada itiraza uğradı ve [[Open Questions|Q-27]] olarak açıldı. İngilizce notta
> `checkedBy` alanı ve gerekçeli not var.

### FR-02 — Roller ve yetkilendirme

**Niyet.** Üç rol var, ama erişimi asıl daraltan **ilişki**. Koç olmak öğrencilere erişim vermez;
*Mert'in koçu olmak* Mert'in koçluk verisine — ve sadece bu koça ait olan kısmına — erişim verir.

**Bu, dikkatsiz bir sorgunun en kolay ihlal edeceği gereksinim. Her liste endpoint'i bir güvenlik
kararıdır.**

- Yetki **hem role hem ilişkiye** göre uygulanır ve **backend'de** uygulanır. Gizlenmiş buton izin
  değildir ([[BR-024]]).
- Koç yalnızca **aktif bağlı** olduğu öğrencinin verisine erişir; biten ilişki kendi geçmişi
  üzerinde **salt okunura** düşer ([[BR-030]]).
- **Gör / yönet ayrımı** ([[BR-024]], v2 §3.4):
  - Öğrencinin **kendi** verisi (kaynak havuzu, deneme sonuçları, karne, konu ilerlemesi) → tüm
    aktif koçlara **görünür**.
  - Koçun yarattığı **görev/ödev** → diğer koçlara görünür (etiketli, salt okunur), **yönetimi
    sadece sahibinde**.
  - Koçun **dersleri, dosyaları, bildirimleri, fiyatları, hakedişleri** → diğer koçlara **tamamen
    görünmez**.
- Her yetki kararı tek bir merkezî noktada şu beşliyi çözer: **aktör, rol, hedef öğrenci, ilişki
  durumu, içerik sahipliği** — artı finans için modül ve görünürlük anahtarları.
- Öğrenci **asla** fiyat ve hakediş verisine erişemez ([[BR-022]]).
- Veli yalnızca onaylı ve aktif bağlı olduğu öğrenciye, yalnızca koçun açtığı bilgilere erişir;
  hiçbir yönetim yetkisi yoktur.
- **FR-02.9** Görülemeyecek bir kayıt istendiğinde **403 değil 404** döner — API başka bir koçun
  verisinin varlığını sızdırmaz.

**Nasıl kurulur.** Her koç-sahipli tabloda `coachId`. Guard tekil kaydı korur, **zorunlu
repository seviyesinde scope filtresi** listeleri korur — ikisi birden gerekir ([[ADR-0006]]).

### FR-03 — Öğrenci profili ve sınıf seviyesi

**Niyet.** Sınıf seviyesi, her şeyin yaslandığı tek akademik bağlam: hangi sınava hazırlanıyor, koç
ne vermeli, hangi kaynak mantıklı.

- Sınıf seviyesi profilde tutulur; aktif bağlı her koç görebilir, hem öğrenci hem bağlı koç
  güncelleyebilir.
- Görev, ödev, ders, kaynak ve denemelere **bağlam olarak** verilir — o kayıtlara kopyalanmaz.
- Profil ayrıca **hazırlanılan sınav alanını** tutar — sınıf tek başına bunu belirlemiyor. Liste
  sabit (20 Ekim 2026'da karara bağlandı): `LGS` · `YKS – Sayısal` · `YKS – Eşit Ağırlık` ·
  `YKS – Sözel` · `YKS – Dil` · `Henüz belli değil`.
- **Sınıf seviyesi asla otomatik güncellenmez** (20 Ekim 2026). Eylülde çalışan bir iş yok, uygulama
  da sormuyor. Öğrenci veya bağlı koç elle değiştirir.

**Dikkat.** Desteklenecek seviyeler **5–12 ve mezun**. Naif bir 1–12 enum'u, Türkiye'de ciddi bir
kitle olan mezun adayları dışarıda bırakır. Değerler serbest metin değil, kontrollü liste olmalı —
yoksa raporda gruplanamaz.

**Sınav alanı listesi neden böyle.** `Henüz belli değil` gerçek bir durum: 9 ve 10. sınıftaki öğrenci
genelde alanını seçmemiş olur. Bu değer olmazsa koç formu geçmek için rastgele bir alan işaretler ve
kimse düzeltmez — kaynak önerisi ([[FR-12]]) ve raporlama bozulur. Etiketler `AYT` değil `YKS` diye
yazılıyor, çünkü alan seçimi yalnızca AYT'ye ait olsa da TYT'yi her YKS adayı giriyor; `AYT – Sayısal`
yazmak "TYT burada yok" gibi okunur.

**TYT ile AYT ayrımı profilde değil, deneme kaydında.** Net formülü sınav tipine göre değişiyor
([[FR-15]], [[BR-019]]). Profil sadece "hangi AYT alanı" sorusunu cevaplıyor.

**Neden elle güncelleniyor.** Her eylül otomatik bir sınıf artırmak, bir üst sınıfa geçmeyen her
öğrenci için yanlış sonuç verir. **Sınıfta kalan** öğrenci yanlış görünür. 12. sınıftaki öğrenci
mezun olabilir, mezun olarak devam edebilir veya bırakabilir. Asıl gerekçe şu: **bugün aklımıza
gelmeyen durumlar olacak.** Otomatik bir kural, henüz düşünmediğimiz durumlarda da doğru olmak
zorunda; elle güncelleme ise sadece insanın doğru olmasını istiyor.

**Bedeli — kabul edildi.** Her eylül bir grup öğrenci, biri düzeltene kadar geçen yılki sınıfıyla
görünecek. Koç sınıfı profilde görüyor ve düzeltebiliyor; yani hata görünür ve ucuz.

## İlişkiler

### FR-04 — Koç–öğrenci ilişkisi

**Niyet.** Erişimi veren hesap değil, **ilişki**. İki taraf da bilerek kurar, her iki taraf da tek
başına bitirebilir, ve her yetki kontrolü bu sınırın etrafına çizilir.

**Bağ kurma**

- Bir öğrenci **aynı anda birden fazla koçla** çalışabilir ([[BR-001]]).
- Bağlanma kontrollü bir mekanizmayla olur: davet kodu veya davet linki (QR `[V1.1]`). Güvenlik
  özelliği şu: **iki taraf da rıza gösterir**.
- Koç öğrenciyi davet eder → öğrenci kabul edince **aktif** olur. Öğrenci koça başvurur → koç kabul
  edince aktif olur.
- Bağlantı isteği **ders isteği değildir**; ders isteğini sadece koç açar ([[BR-011]]).
- Davet tek kullanımlıktır ve süresi dolar.

**Bitirme**

- Her iki taraf da tek başına bitirebilir — **veli onayı gerekmez** ([[BR-002]], K-17).
- Bitirmek geçmiş veriyi **asla fiziksel olarak silmez** ([[BR-025]]).
- Bittikten sonra ([[BR-030]]): koç o ilişkinin geçmişine **salt okunur** erişir (hakediş geçmişi
  için şart), yeni hiçbir şey yaratamaz; öğrenci o koçun paylaştığı dosyaları ve kaynak önerilerini
  **görmeye devam eder**.
- Aynı çift sonradan yeniden bağlanabilir; önceki dönem ayrı bir kayıt olarak durur.

**Sahiplik.** Koçun öğrenci için yarattığı her şey o koça yazılır — görev, ödev, ders, dosya,
bildirim, kaynak önerisi. Sistem her kayıt için "bunu hangi koç yarattı?" sorusunu cevaplayabilir.

**Durum makinesi.** `PENDING_STUDENT_ACCEPT | PENDING_COACH_ACCEPT → ACTIVE → ENDED`, ayrıca
`DECLINED` ve `EXPIRED`.

**Onay bekleyen iş, ilişki biterken ne olur** (karar 2026-10-30, [[Open Questions|Q-17]] kapandı).
İş **olduğu yerde donar**: otomatik onaylanmaz, otomatik geri gönderilmez. `submittedAt` kalır,
`approvedAt` hiç gelmez, dolayısıyla durum kalıcı olarak `PENDING_APPROVAL` okunur — bunun için ayrı
bir şey yazılmaz, durum zaten hesaplanıyor ([[ADR-0008]]) ve yeni bir olgu gelmiyor. İstatistikte
**tamamlanmadı** sayılır; ne `COMPLETED_LATE` ne `OVERDUE` olduğu için [[BR-010]]'un ayrımı bozulmaz.
Aynı çift yeniden bağlanırsa iş canlanmaz; yeni bağ ayrı bir kayıt.

**Neden donuyor.** Otomatik onay, hiçbir koçun bakmadığı bir tamamlamayı öğrenciye yazardı — ve iki
taraf da doğru anda bağı bitirip tamamlama toplayabilirdi. Otomatik geri gönderme ise zamanında
gönderim yapan öğrenciyi, kendisinin olmayan bir karar yüzünden cezalandırırdı. Donmak, hiçbir hüküm
uydurmayan tek seçenek. **Arayüz bunu açıklamak zorunda**: yoksa öğrenci sonsuza kadar "Onay
bekliyor" görür ve gitmiş bir koçu bekler — satırda bağın bittiği de yazmalı.

**Dikkat.** Aynı çift için iki aktif bağ olmasını **partial unique index** engellemeli. v1'de
çoklu koç içeriği ayrı bir akışta değil, satır içinde "X koçundan" etiketiyle gösterilir.

**Açık.** [[Open Questions|Q-28]] — aynı durumun deneme sonucu hâli: onaylayacak koç
([[BR-031]]) bağı bitirirse öğrencinin kendi verisi donar ve istatistiğe hiç girmez. Q-17'nin cevabı
koçun yarattığı işler için; bu satır öğrencinin.

### FR-05 — Veli–öğrenci ilişkisi

**Niyet.** Veli hesabı tek başına hiçbir şey ifade etmez. Bağı açan **koçun onayı** — öğrencinin
değil: bir reşit olmayanın verisini kimin göreceğine karar veren, mesleki sorumluluğu olan kişidir.

- Veli bağı **öğrencinin kodunu girerek** başlatır (v2 §4.2).
- Bağı **sadece öğrencinin koçu onaylayabilir** ([[BR-003]]). Öğrencinin birden fazla koçu varsa
  **herhangi biri** onaylayabilir; **kimin onayladığı kaydedilir**.
- Onaya kadar veli korunan hiçbir veriye erişemez.
- Bir öğrencinin **en fazla 2 aktif velisi** olur; üçüncüsü engellenir ([[BR-004]]).
- Veli yalnızca bağlı olduğu öğrenciyi ve yalnızca koçun açtığı bilgileri görür ([[FR-20]]);
  hiçbir yönetim yetkisi yoktur — atama yok, onay yok, iptal yok.
- Bağ iptal edilebilir, böylece kontenjan boşalır; iptal edilen bağ geçmişini korur.

**Durum makinesi.** `PENDING_COACH_APPROVAL → ACTIVE → REVOKED`, ayrıca `REJECTED`.

**Açık (30 Ekim incelemesi).** Veli bağını **kim iptal edebilir**? Gereksinim aktör söylemiyor;
[[State Machines]] "koç veya veli" diyor. Doğruysa, koç bağında iki tarafın da tek başına
bitirebilmesiyle ([[FR-04]]) arasındaki fark bilinçli demek — öğrenci kendi velisini kesemiyor — ve
bunun bir cümleyle yazılması gerekiyor. İkincisi: **koç veliyi doğrudan davet edebilir mi?** Şu an
yalnızca velinin öğrenci kodunu girdiği yön tanımlı.

**Tasarım notu.** İki veli genelde anne ve baba demek; ikisi de aynı şeyi görür, veli başına ayrı
ayar yok.

## İş: görev, ödev, çizelge

### FR-06 — Görev yönetimi

**Niyet.** Ürünün çekirdek döngüsü. Koç son tarihli bir iş verir, öğrenci "yaptım" der. Varsayılan
olarak sistem **öğrenciye inanır**: iş anında tamamlanır, koç sonradan itiraz edebilir
([[BR-006]] — v2'de ters çevrildi). Koç, önemsediği işlerde katı akışı kalem kalem saklı tutar.

> **Her hâlükârda:** "gönderildi" ve "onaylandı" aynı zaman damgasına çökmemeli.

**Oluşturma ve görme**

- Koç, aktif bağlı herhangi bir öğrenciye görev atar.
- Bir görev en az şunları taşır: öğrenci, atayan koç, tür, ders, konu, içerik, son tarih,
  **gecikme saati** (koçun varsayılanından kopyalanıp **donar**, [[BR-027]]), oluşturma bilgisi,
  güncel durum, **onay gerekli bayrağı**.
- Ders ve konu **serbest metin** — müfredat listesi yok. Tutarlılık için koçun kendi geçmiş
  değerleri otomatik tamamlama olarak önerilir (K-25).
- Öğrenci kendisine atanan her görevi, hangi koçun verdiğiyle birlikte görür. Diğer aktif koçlar
  görevi **salt okunur ve atıflı** görür, asla yönetemez ([[BR-024]]).

**Durumlar**

| Kod | Türkçe | Anlamı |
| --- | --- | --- |
| `OPEN` | Tamamlanmadı | atandı, gönderilmedi, süresi geçmedi |
| `PENDING_APPROVAL` | Onay bekliyor | gönderildi, koç bekleniyor — **sadece onay gerekli işlerde** |
| `RETURNED` | Geri gönderildi | koç geri yolladı, öğrenci tekrar yapacak |
| `COMPLETED_ON_TIME` | Zamanında tamamlandı | son tarih + gecikme saatinden önce gönderildi |
| `COMPLETED_LATE` | Geç tamamlandı | o sınırdan sonra gönderildi |
| `OVERDUE` | Gecikti / tamamlanmadı | süresi geçti, hiç gönderilmedi |

Arayüz etiketleri farklı olabilir; **bu kodlar olamaz.**

**Tamamlama — itiraz modeli**

- **Varsayılan:** öğrenci "yaptım" dediği an iş tamamlanır ve istatistiğe girer. Koç eylemi
  gerekmez.
- Atayan koç tamamlanmış işi **sonradan geri gönderebilir**; istatistik buna göre güncellenir.
- **İstisna:** koç oluştururken işi **"onay gerekli"** işaretleyebilir. Böyle bir iş gönderildiğinde
  `PENDING_APPROVAL`'a düşer ve ancak atayan koç onaylayınca kapanır.
- Onay ve geri gönderme yetkisi **yalnızca atayan koçta** ([[BR-007]]). Tamamlama bildirimi de
  **yalnızca o koça** gider — öğrencinin diğer koçlarına asla.
- Geri gönderirken açıklama yazmak **isteğe bağlıdır** ([[BR-008]]). Yazılırsa öğrenci okur.
- Geri gönderilen görev tekrar gönderilebilir; her tur kaydedilir.

**Toplu onay** (v2 §5.5)

- Koç bekleyen işleri **iki seviyede toplu onaylayabilir**: tüm öğrencileri genelinde ve tek öğrenci
  içinde.
- **Toplu geri gönderme yoktur** — geri gönderme açıklaması bağlama özeldir, teker teker yapılır
  (K-15).
- Toplu onay **kalem başına bir denetim kaydı** yazar, "toplu onayla yapıldı" işaretiyle (K-16).

**Gecikme**

- Gecikme **öğrencinin gönderim zamanından** hesaplanır, koçun onay zamanından **asla**.
- Sınır: **son tarih + kalemin donmuş gecikme saati**. Öncesi → zamanında; sonrası → geç; hiç
  gönderilmediyse ve sınır geçtiyse → gecikti.
- Her koç kendi varsayılan saatini belirler (ör. 20:00); değer oluşturmada kaleme kopyalanır ve bir
  daha değişmez ([[BR-027]]).
- `COMPLETED_LATE` ile `OVERDUE` **asla tek istatistikte birleştirilmez** ([[BR-010]]).

**Geçmiş.** En az şunlar korunur: oluşturma, son tarih, gecikme saati, her gönderim zamanı, her
onay zamanı, her geri gönderme zamanı ve notu, tekrar gönderimler, nihai durum. Gönderim zamanı ile
onay zamanı **ayrı alanlarda** durur ve birbirinin yerine geçmez. Tamamlanan veya süresi geçen
görevler silinmez ([[BR-025]]).

**Dikkat.** `OVERDUE` **türetilir**, saklanan bir geçiş değil — `dueAt`, `lateCutoff`, `submittedAt`
ve "şu an"ın fonksiyonu. "Gecikenleri işaretle" diye cron çalıştırma; sorguda hesapla. Zamanında /
geç ayrımı da öyle.

**Gönderimden sonra düzenleme** (karar 2026-10-30, [[Open Questions|Q-13]] kapandı).

- Atayan koç, öğrenci gönderdikten **sonra da** işi düzenleyebilir: içerik, ders, konu ve **son
  tarih**. İş onay beklerken de, tamamlanmışken de. Yalnızca atayan koç ([[BR-007]]).
- Düzenleme **gönderimi iptal etmez**. `submittedAt` yerinde kalır, iş `OPEN`'a dönmez. İşi tekrar
  yaptırmanın yolu **geri göndermektir**; ikisi ayrı eylem.
- Düzenlemeden sonra durum **yeniden türetilir** ([[ADR-0008]]). Yani son tarihi değiştirmek bir işi
  "zamanında"dan "geç"e taşıyabilir — bu kasıtlı: istatistik her zaman işin **şu anki** son tarihini
  yansıtır.
- **Son gönderim esas alınır.** Gönderildi → geri gönderildi → tekrar gönderildi zincirinde gecikme
  **en son** `submittedAt`'ten hesaplanır, ilkinden değil ([[BR-009]]). Önceki gönderimler geçmişte
  durur ama durumu belirlemez. Zamanında bir ilk gönderim, geç yapılan bir tekrarı aklamaz.
- **Gecikme saati donmuş kalır** ([[BR-027]]). Koç son tarihi oynatabilir; o işe kendi güncel
  varsayılan saatini yeniden yazamaz — yoksa eski bir iş, atandığında var olmayan bir kurala göre
  sessizce yeniden sınıflanır.
- Her düzenleme **denetim kaydı** yazar (kim, ne zaman, hangi alan — [[FR-21]]) ve öğrenci işin
  gönderiminden sonra değiştiğini görür.
- **Silme yok.** Ne gönderimden önce ne sonra ([[BR-025]]).

**Kabul edilen bedel.** Koç son tarihi geriye çekip zamanında bir tamamlamayı geç hâle getirebilir.
Önlem engellemek değil, **görünürlük**: değişiklik denetime yazılır ve öğrenci görür. Engellemek
zaten yetkiyi ortadan kaldırmazdı — aynı koç tamamlanmış işi geri gönderebiliyor ([[BR-006]]).

### FR-07 — Ödev yönetimi

**Niyet.** Türk koçu için "görev" ve "ödev" iki ayrı şey: görev her türlü koçluk işi (şunu oku,
haftanı planla, uyku düzenini topla), ödev ise somut akademik çalışma. Öğrenci ve veli bunları ayrı
düşünür — **istatistik de ayrı düşünmeli**.

**Davranış olarak ikisi birebir aynı.**

- Görev ve ödev **bağımsız içerik tipleri** olarak yönetilir ([[BR-005]]).
- Görev için tanımlı **her kural ödeve aynen uygulanır**: atayan koç, son tarih, itiraz modeli ve
  onay gerekli bayrağı, isteğe bağlı notla geri gönderme, donmuş gecikme saati, zamanında/geç/gecikti
  işleyişi, işlem geçmişi, bildirimler, çoklu koç desteği.
- Görev ilerlemesi ile ödev ilerlemesi **ayrı hesaplanır ve asla karışmaz**.
- Fark yalnızca **tipe özgü alanlarda** (K-22): görev plan bağlantısı, saat, süre ve tekrar
  taşıyabilir ([[FR-23]]); ödev ise **kaynak** (öğrencinin havuzundan seçilir, [[FR-12]]) ve teslim
  tarihi taşıyabilir.
- Görev günlük çizelgeden, ödev dersten sonra verilen iş olarak doğar — **kökeni** farklı, yaşam
  döngüsü aynı.

**Nasıl kurulur.** İki paralel tablo değil, `type` ayırıcılı **tek `WorkItem` tablosu**
(`TASK` | `ASSIGNMENT`) — kurallar aynı, kopyalarsak kaçınılmaz olarak birbirinden ayrışırlar
([[ADR-0005]]; müşteri ekibi de K-22'de bağımsız olarak aynı sonuca vardı). Tüm istatistikler
`type`'a göre gruplanır. Müşterinin istediği ayrım bir **ürün** ayrımı (ayrı liste, ayrı ilerleme,
ayrı Filiz) ve depolama ortak olsa da her yüzeyde korunmalı.

### FR-23 — Çalışma çizelgeleri (Plan / Çizelge)

**Niyet.** Müşterinin **"v1'in en önemli parçası"** dediği şey: koçun zamanını doğrudan kazandıran
ve abonelik ücretini haklı çıkaran özellik. Koç planı bir kez hazırlar — ana ünite → konu → görev
ağacı — ve 30 öğrencinin her birine aynı haftayı yeniden yazmak yerine çoğuna birden atar.

**Hazırlama**

- Koç **ana ünite → konu → görev** yapısında tekrar kullanılabilir plan oluşturur.
- Her plan görevi bir **gün ofseti** (atama başlangıcına göre) ve **süre** taşır.
- Planın seviye/etiketi serbest metin (ör. "12. sınıf · YKS") — müfredat taksonomisi yok (K-25).
- Ders ve konu serbest metin, ama **koçun kendi geçmiş girdilerinden otomatik tamamlamalı**: "Türev"
  ile "Türev ve uygulamaları" ikiye ayrılırsa konu yüzdeleri çöpe gider.
- Koç var olan bir planı **kopyalayarak** yeni bir plan üretebilir ve üzerinde düzenleme yapabilir.
  Kopya tüm ağacı taşır ve orijinalden bağımsızdır; birini düzenlemek diğerini etkilemez. Plan
  sınıfa, yaşa ve öğrencinin eksiğine göre değiştiği için varyasyon böyle üretilir: taban plan +
  küçük sapma.

**Atama**

- Plan **birden çok öğrenciye**, her birine kendi başlangıç tarihiyle atanır.
- Atama sırasında öğrenci bazında tek tek görev çıkarılabilir (o öğrenci için planı kısaltmak).
- Atanan görevler planın **kopyasıdır**: planı sonradan düzenlemek atanmış işi değiştirmez. (Fiyat
  ve gecikme saatindeki aynı snapshot mantığı.)
- Plandan doğan görevler **sıradan görevdir** ([[FR-06]]): aynı durumlar, gecikme, itiraz modeli,
  bildirim ve geçmiş. Hangi plan/konudan geldiklerini kaydederler.

**Sonrası**

- **Konu ilerlemesi plandan türetilir**: bir konunun yüzdesi, o konuya bağlı görevlerin tamamlanma
  oranıdır (K-26). v1'de ayrı bir konu takip modülü **yok**; bağımsız müfredat modülü `[V1.1]`.
- Planlar koça ait içeriktir: aynı öğrencinin diğer koçlarına görünmez ([[BR-024]]). Öğrenci sadece
  kendine atanan görevleri görür, plan kütüphanesini asla.

**v1 dışı.** Excel'den plan içe aktarma `[V1.1]` · planın bir parçasını (tek ünite/konu) başka plana
taşıma `[V1.1]`, tüm planı kopyalayıp gereksizi silmek v1'de yetiyor · bağımsız müfredat modülü
`[V1.1]`.

## İlerleme

### FR-08 — Filiz (ilerleme karakteri)

**Niyet.** Filiz, kuru bir tamamlama yüzdesinin üzerindeki duygusal katman: öğrenci tempoyu
tutturunca gözle görülür biçimde serpilen, tutturamayınca solan bir karakter. 17 yaşındaki birinin
uygulamayı kimse söylemeden açmasının sebebi.

- Sistem öğrencinin **günlük** ilerlemesini görsel bir karakterle/animasyonla gösterir.
- Filiz'in tam **dört** aşaması vardır.
- İlerleme **görev ve ödev için ayrı** hesaplanır → **iki Filiz** vardır ve birbirlerini asla
  etkilemezler.
- Aşamalar ve eşikler **karara bağlandı** (K-24) ama tek yerde tanımlı, **değiştirilebilir bir iş
  kuralı** olarak kalır — dağınık sabitler değil:

  | Aşama | Eşik (günlük tamamlama) | His |
  | --- | --- | --- |
  | 1 | %0–24 | üzgün |
  | 2 | %25–74 | idare eder |
  | 3 | %75–99 | mutlu |
  | 4 | %100 | kutlama |

- Filiz'in tonu **nazik ve cesaretlendirici — tek varyant**. Suçluluk hissettiren dil veya görsel
  yok: kitle reşit değil (K-23).
- Animasyon yalnızca **günlük** görünümde oynar; haftalık ve aylıkta sabit görsel.

**Hesap.** Belirli bir gün ve tip için ilerleme = `tamamlanan / o gün yapılacak`. İtiraz modelinde
gönderilen iş anında tamamlandığı için eski "bekleyen sayılır mı?" sorusu büyük ölçüde çözüldü —
sadece **onay gerekli** kalemler beklemede durabilir.

**Dikkat.** **Öğrenciyi koçun yavaşlığı için cezalandırma.** Onay gerekli kalemlerde önerilen
varsayılan: bekleyen tamamlanmış sayılır, sonradan geri gönderilirse geri alınır — itiraz modelinin
ruhuna uygun. Aşama hesabı saf ve paylaşılan bir fonksiyon olmalı ki mobil, web ve API aynı sayıyı
söylesin.

**Açık.** [[Open Questions|Q-02]] — gün sonunda onay bekleyen kalem ve geç gönderimin o günün
Filiz'ini geriye dönük onarıp onarmadığı.

### FR-14 — İlerleme raporlama (günlük, haftalık, aylık)

**Niyet.** Geçmiş, ürünün hafızası: koçluk konuşmasını somutlaştıran ("geçen hafta altı ödevin
dördünü yapmadın") ve velinin asıl görmek istediği şey.

- Geçmiş görev/ödev kayıtları tamamlandıktan veya süresi geçtikten sonra **asla silinmez**.
- Öğrenci kendi geçmişini **gün, hafta, ay** düzeyinde inceleyebilir; her düzeyde zamanında, geç ve
  eksik iş **ayırt edilebilir**.
- **Günlük:** en az şunlar ayrı tutulur — zamanında tamamlandı, geç tamamlandı, eksik/gecikti, onay
  bekliyor. Görev ve ödev istatistikleri **ayrı** hesaplanır.
- **Haftalık:** haftalık performans hesaplanır, görev/ödev ayrımı korunur; koç onayı gereken yerde
  onay durumu hesaba katılır.
- **Aylık:** altı sayı ayrı ayrı — görev zamanında / görev geç / görev eksik, ödev zamanında / ödev
  geç / ödev eksik. Genel bir aylık ilerleme değeri de üretilebilir, ama **formülü hâlâ açık**
  (A-09, [[Open Questions|Q-02]]).
- **Konu ilerlemesi ayrı bir modül değil**: bir konunun yüzdesi o konuya bağlı plan görevlerinin
  tamamlanma oranı ([[FR-23|FR-23.9]]). Yalnızca plandan doğan görevleri sayar — **bilinen ve kabul
  edilmiş bir sınır**.

**Dikkat — boş bölen problemi.** Hiç iş atanmamış öğrenci 0/0 alır. Ekranda **%0 gösterme**; "iş
atanmadı" de. %0, koçun tatilde olduğu haftayı öğrencinin suçu gibi gösterir.

**Dikkat.** Raporu olay kaydından ([[FR-21]]) hesapla ki bir durum kolonu üzerine yazıldığında
geçmiş rapor geriye dönük değişmesin. v1'de okuma anında hesapla — hacim küçük; rapor yavaşlayınca
günlük rollup tablosu düşün. Genel aylık değer velinin kilitleneceği sayı: [[Open Questions|Q-02]]
cevaplanmadan **yayına verme**, altı ham sayı o zamana kadar dürüst ve yeterli.

Hafta **pazartesi** başlar, gün `Europe/Istanbul` gece yarısı biter.

## Dersler ve program

### FR-09 — Ders planlama ve iptal

**Niyet.** Ders, faturalanabilir birim: koç saat önerir, öğrenci onaylar, ve gerçekte ne olduğu hem
öğrencinin takvimini hem koçun hakedişini besler. **Asimetri bilinçli** — planlamayı koç sürer,
öğrenci rıza verir.

**İstek**

- Ders isteğini **yalnızca koç** açar. Öğrenci koçtan ders **isteyemez** ([[BR-011]]).
- İstek en az şunları taşır: öğrenci, koç, tarih, saat, **ders tipi**, konu, durum.
- Ders tipleri en az: **birebir**, **grup**, **deneme analizi** (K-03). Her tip ayrı
  fiyatlandırılabilir ([[FR-18]]).

**Öğrencinin yanıtı**

- Öğrenci isteği **kabul** veya **ret** eder; kabul edilmeden ders kesinleşmez.
- Kabul edilen ders öğrencinin programına düşer ([[FR-11]]).
- Reddederken açıklama yazmak **isteğe bağlı**; ret ve açıklama isteyen koça iletilir.

**İptal**

- Kesinleşen dersi **hem koç hem öğrenci** iptal edebilir ([[BR-012]]); açıklama **isteğe bağlı**.
- Kim iptal etti, ne zaman, açıklama varsa ne — hepsi kaydedilir.
- **İptal edilen ders verilmiş sayılmaz ve asla faturalanmaz** (v2 §8.3 — karara bağlandı, kimin
  iptal ettiğinden bağımsız).

**Grup dersleri**

- Grup dersi **tek** takvim kaydı, **birden çok katılımcı** öğrenci yaratır.
- Her katılımcının **kendi** kabul/ret yanıtı, **kendi** devam kaydı ve **kendi** hakediş satırı
  olur.
- Ücret öğrenci başına, o öğrencinin grup fiyatından — **asla bölüşülmez** ([[BR-028]]).

**Durum makinesi.** `REQUESTED → ACCEPTED → (COMPLETED | CANCELLED)`, `REQUESTED`'tan `DECLINED`.

**Dikkat.** Koç kendi onaylı dersleriyle çakışan saat önerirse uyarılmalı. Öğrencinin diğer
yükümlülükleri koça tasarım gereği görünmez ([[BR-014]]) — o yüzden **çakışmayı kabul ederken
öğrenci görebilmeli**. Saat dilimi `Europe/Istanbul`, saklama UTC.

**Açık.** [[Open Questions|Q-14]] tekrarlayan dersler ("her salı 19:00") · [[Open Questions|Q-23]]
iki koç aynı öğrenciye aynı saati verebilmeli mi (A-05).

### FR-10 — Derse devam

**Niyet.** Planlanan ile olan farklı şeylerdir. Devam kaydı, takvim ile para arasındaki köprü ve
velinin "dersler gerçekten yapılıyor mu?" sorusunun cevabı.

- Durumlar: `ATTENDED` (katıldı), `NO_SHOW` (katılmadı), `CANCELLED` (iptal).
- Her kayıt öğrenci, koç, ders ve tarihe bağlıdır; puantaj/hakediş sisteminin veri
  kaynaklarındandır ([[FR-19]], [[BR-021]]).
- Devam **yalnızca koç tarafından**, ders bittikten sonra işlenir.
- Düzeltilen devam kaydı geçmişini korur — kim ne zaman değiştirdi ([[FR-21]]) — çünkü **parayı
  değiştirir**.
- Grup dersinde devam **katılımcı başına** işlenir ([[BR-028]]).
- Devam **finans modülünden bağımsızdır ve her zaman açıktır** (K-11): önce pedagojik veridir ve
  finansı hiç açmayan koç için de çalışır.

**Dikkat.** Koçlar hatırlatılmadan devam işlemez — "dünkü dersler durum bekliyor" uyarısını koçun
takip ekranına koy ([[FR-17]]). İşlenmemiş geçmiş dersler **görünür biçimde beklemede** olmalı,
sessizce "katıldı" sayılmamalı; yoksa hakediş rakamı kurgu olur.

### FR-11 — Öğrenci programı ve gizliliği

**Niyet.** Öğrencinin günü **onundur** — koç için bir gözetim yüzeyi değil. v2 kapsamı sertçe
daralttı (K-36): ilk kataloğun ima ettiği düzenlenebilir takvim ızgarası ertelendi, çünkü koç zaten
göremiyor ([[BR-014]]) ve görevler zaten saat ve süre taşıyor — **günlük liste öğrencinin
programıdır**.

**v1 — salt okunur zaman çizelgesi**

- Öğrenci **salt okunur gün/hafta zaman çizelgesi** görür: dersler ve görevler saatlerine yerleşmiş
  hâlde.
- Okul saatleri **tek bir ayar** (ör. "hafta içi 08:00–15:00"), tek tek takvim kaydı değil.
- Kayıt olmayan zaman aralığı zaten boştur; öğrenci açıkça "boş" kaydı yaratmaz.

**Gizlilik**

- Koç öğrencinin **tüm kişisel takvimini göremez**; okul saatlerini, kişisel etkinliklerini veya
  boş zamanını otomatik olarak göremez.
- Koç yalnızca **kendi yarattığı ders kayıtlarını** görür.

**v1 dışı.** Düzenlenebilir takvim ızgarası (06:00–24:00, çoklu slot seçimi, kişisel kayıt türleri)
`[V1.1]` (K-36). Gerekçe: koç bu veriyi göremiyor, yani ticari değeri düşük; buna karşılık
dokunmatik çoklu seçim ızgarası uygulamadaki en pahalı arayüzlerden biri.

**Dikkat.** Zaman çizelgesi bir **projeksiyondur** — kaynak gerçek dersler ve görevler, okul
saatleri bir profil ayarı. v1'de hiç `ScheduleEntry` satırı saklanmaz. İleride koça "boş slot bul"
verilecekse bu **öğrencinin başlattığı bir paylaşım** olmalı, otomatik okuma asla — o [[BR-014]]'ü
kırar.

## Materyal

### FR-12 — Kaynak havuzu ve öneriler

**Niyet.** Her sınav öğrencisinin bir kitap ve soru bankası yığını birikir; her koç da yedincisini
önermeden önce hangilerinin olduğunu bilmek ister. Havuz öğrencinin envanteri, öneri koçun bunun
üzerine verdiği tavsiye.

- Her öğrencinin kendi kaynak havuzu vardır; öğrenci en az **kitap adı, yayınevi, ders** girer.
- Tipler en az: kitap, soru bankası, deneme kaynağı, doküman, dijital kaynak, diğer materyal.
  **Tip listesi şema değişikliği olmadan genişleyebilmeli.**
- Öğrencinin **tüm** aktif koçları havuzu görebilir ([[BR-015]]). Bu, program gizliliğinden
  ([[BR-014]]) ayrı bir izindir — havuz **görünür**.
- Koç ödev oluştururken kaynağı **öğrencinin havuzundan** seçebilir.
- Koç öğrencisine kaynak önerebilir; öneri en az öğrenci, öneren koç, kaynak ve öneri zamanını
  taşır. Öğrenci kendisine yapılan önerileri görür.
- Birden fazla koç varsa **hangi koçun neyi önerdiği korunur** ([[BR-024]]); A koçu B koçunun
  önerisini düzenleyemez veya geri çekemez.

**v1 dışı.** Kaynak içi ilerleme takibi (öğrenci kaçıncı sayfada/testte) `[V1.1]`. v1'de havuz
sadece kitabın kimliğini tutar.

**Dikkat.** Öneri ile havuz kalemi **farklı nesneler**: öneriyi kabul etmek, nereden geldiğini
hatırlayan bir havuz kalemi **yaratır**. Dersler, deneme sonuçlarıyla aynı listeden gelmeli
([[FR-15]]) ki ders bazlı görünümler çakışsın.

### FR-13 — Dosya paylaşımı

**Niyet.** Koçlar sürekli PDF gönderiyor — çalışma kâğıdı, program, deneme analizi. Bugün bunlar
WhatsApp'ta yaşıyor ve bir hafta sonra bulunamıyor. Dosya paylaşımı bilinçli olarak kaynak havuzuyla
**aynı şey değil**: bu, koçun doküman itmesi; havuz ise öğrencinin envanteri.

- Paylaşım **yalnızca koç → öğrenci**. Öğrenci dosya yükleyemez.
- Koç dosyanın hangi öğrenci veya öğrencilere gideceğini seçer; öğrenci yalnızca **kendisiyle
  paylaşılanlara** erişir.
- **Sadece PDF, en fazla 25 MB** (K-32). Tip **uzantıdan değil dosya içeriğinden** doğrulanır.
- Dosya onu yükleyen koça aittir; aynı öğrencinin başka koçunun erişimi **yoktur** ([[BR-024]]).
- Koç paylaşımı geri alabilir; öğrenci erişimi kaybeder.
- **Klasör, etiket, sürüm yönetimi yok** (K-32).
- İlişki bittikten sonra öğrenci zaten paylaşılmış dosyalara **erişmeye devam eder** ([[BR-030]]);
  koç yeni bir şey paylaşamaz.
- Virüs taraması `[V1.1]` — bilinçli ertelenmiş bir risk.

**Dikkat.** Depolama S3 uyumlu, **kısa ömürlü imzalı URL**'lerle. Yetkiyi API verir, depolama asla
herkese açık nesne sunmaz. `.exe`'yi `.pdf` diye yeniden adlandırma denemesi içerik kontrolüyle
reddedilmeli. Asıl kullanım **toplu paylaşım**: teker teker öğrenci seçtiren arayüz kullanılmaz.

**Açık.** [[Open Questions|Q-24]] — saklama süresi: dosyalar ne kadar tutulacak (A-07).

## Denemeler ve okul

### FR-15 — Deneme takibi

**Niyet.** Türkiye'de ilerleme asıl denemeyle ölçülür. Öğrenci çoğu hafta tam bir deneme çözer ve
aylar içindeki **net** trendi, öğrencinin de koçun da velinin de en çok baktığı tek sayıdır.

Sonuçlar beyan usulü girildiği için koç doğrular — ve sonuç **öğrencinin verisi** olduğundan
**kimin doğrulayacağını öğrenci seçer** ([[BR-031]]).

**Kayıt**

- Öğrenci girdiği denemelerin sonuçlarını kaydeder: sınav adı, sınav tipi, tarih, ders bazlı
  doğru/yanlış, net, puan.
- **Net otomatik hesaplanır**, kural sınav tipine göre değişir (TYT/AYT: yanlış ÷ 4). **Puan elle
  girilir** ([[BR-018]], K-30).
- Ders listesi sınav tipine göre değişir; veri modeli **tek bir formüle veya ders setine bağlı
  olmamalı** — yeni sınav tipi şema değişikliği olmadan eklenebilmeli ([[BR-019]], K-31).

**Onay**

- Deneme sonucu koç onayına tabidir; öğrencinin girdiği sonuç **nihai sayılmaz** ([[BR-016]]).
- Durumlar: `PENDING_APPROVAL` (onay bekliyor), `APPROVED` (onaylandı), `REJECTED` (reddedildi).
- **Hangi aktif koçun onaylayacağını öğrenci seçer**. Tek koç varsa otomatik atanır, seçici
  gösterilmez.

**İstatistik**

- Onaysız sonuçların istatistiğe girip girmeyeceği **yeniden tartışmaya açıldı** (v2, A-01 →
  [[Open Questions|Q-20]]). **Karar verilene kadar [[BR-017]] geçerli:** ortalama, en iyi sonuç,
  trend, geçmiş performans ve ders bazlı analiz **yalnızca onaylı sonuçları** kullanır.
- Her istatistik **tek bir onaylı-sonuç kapsamının** arkasına kurulmalı ki Q-20 kararı tek bir yere
  dokunsun.

**Gelişim.** Onaylı sonuçlardan: son sonuç, geçmiş sonuçlar, en iyi sonuç, ortalama, bir önceki
denemeye göre değişim ve ders bazlı değişim üretilebilir.

**Dikkat.** Net formülü `net = doğru − yanlış / k` — YKS'de `k = 4`, LGS'de `k = 3` — tip bazlı
stratejide, tek bir saf modülde, asla gömülü sabit değil. Sınav tipleri sadece aritmetikte değil
**yapıda** da farklı: TYT tek oturum, AYT alan bazlı, LGS iki oturum. Netler ondalıklı olabilir
(42,75 sıradan bir değer).

**Açık.** [[Open Questions|Q-20]] onaysız sonuç istatistiğe girer mi (A-01) ·
[[Open Questions|Q-25]] reddedilen sonucun akıbeti (A-08).

### FR-24 — Okul karnesi

**Niyet.** Ürün okulun **yanında** çalışıyor ve velinin en çok önemsediği somut okul verisi karne.
Bilinçli olarak küçük tutuldu (K-33: "1–2 günlük iş"): onay akışı yok, bildirim yok, durum makinesi
yok — öğrencinin doldurduğu dönemlik bir not tablosu.

- Öğrenci dönem bazlı not tablosu girer: öğretim yılı, dönem (yılda 2), ders–not satırları.
- Notları **öğrenci girer**, **onay akışı yoktur**.
- Aktif bağlı tüm koçlar karneyi **görebilir** (öğrencinin kendi verisi, [[BR-024]] gör/yönet
  ayrımı). Onaylı veli de **görebilir** ([[FR-20]]) — salt okunur.
- Not ölçeği (100'lük mü 5'lik mi) **kararsız** — [[Open Questions|Q-22]] (A-04). Öğrencinin
  girdiğini sakla, karar gelene kadar şemaya ölçek gömme.

**Dikkat.** Karne verisi **hiçbir istatistiğe, Filiz'e veya ilerleme sayısına girmez** — yalnızca
bilgilendirme.

## İletişim ve takip

### FR-16 — Bildirimler

**Niyet.** Dürtme olmadan döngü durur: kimsenin görmediği iş, koçun haberi olmadığı bekleyen
gönderim. Bildirim sistemi canlı hissettiren şeydir — ve yanlış kişiye giderse çekilmez hâle
getirmenin en hızlı yolu.

**Olay bildirimleri**

- En az şu olaylarda ilgili kullanıcılar bilgilendirilir: yeni görev/ödev, tamamlama bildirimi,
  onay, geri gönderme, ders isteği, ders kabulü, ders reddi, ders iptali, deneme onay talebi,
  deneme onayı/reddi, kaynak önerisi, veli bağı onayı.
- Bildirim **yalnızca olaya dahil kullanıcılara** gider — öğrencinin diğer koçlarına **asla**
  ([[BR-007]], [[BR-024]]).

**Görev saati hatırlatmaları** (K-35)

- Görevin planlanan saatinde otomatik hatırlatma gider.
- Öğrenci kendi hatırlatma tercihlerini ve **sessiz saatlerini** belirler; sessiz saate denk gelen
  hatırlatma **ertelenir**.
- **Koçun gönderdiği bildirimler sessiz saatlere takılmaz.**

**Koçun gönderdiği bildirimler**

- Koç bağlı öğrencilerine elle bildirim gönderebilir, tek seferde **birden çok öğrenci** seçebilir.
- Koç **bildirim şablonu** oluşturup düzenleyip tekrar kullanabilir. Şablon bir **hedef kitle**
  alanı taşır: öğrenci veya veli (K-34).
- Bu açıkça **bir yapay zekâ prompt sistemi değildir** — şablon en fazla yer tutuculu saklı metin.
- Elle gönderimler kötüye kullanımı önlemek için **hız sınırlıdır**.

**Koç → veli**

- Koç bağlı öğrencinin velisine bildirim gönderebilir ve veliler için de şablon tutabilir.
- Öğrenciye giden bildirim **otomatik olarak veliye yansıtılmaz**.

**Dikkat.** Alıcı başına, olay başına **bir `Notification` satırı**; `type` + yapılandırılmış
`payload` ile — **önceden render edilmiş metin değil**, yoksa derin link ve sonradan değişen metin
imkânsızlaşır. Hatırlatmalar altyapı demek: zamanlanmış iş çalıştırıcı + `scheduled_reminder` benzeri
tablo. Toplu gönderim arka plan işi, istek içi döngü değil.

**Karara bağlandı (20 Ekim 2026).** Gerçek bir mobil uygulama çıkarıyoruz ([[ADR-0017]]), bu yüzden
push **native** — PWA üzerinde Web Push/VAPID değil. "iOS'ta push ancak ana ekrana eklenirse çalışır"
riski böylece ortadan kalktı; tek PWA planının kaybetmesinin başlıca sebebi de buydu.

### FR-17 — Koçun öğrenci takibi

**Niyet.** 30 öğrencisi olan bir koç her sabah 30 profil açamaz. Tek bir ekran şu üç soruyu
cevaplamalı: kim iyi, kim geride, kim **beni** bekliyor.

- Koç bağlı öğrencilerinin çalışma durumunu takip edebilir.
- En az şunları ayırt edebilir: işini tamamlamış öğrenciler, eksik işi olanlar, **koçun onayını
  bekleyen** işi olanlar.
- Bu ekrandan tek bir öğrenciye veya gruba hızlı bildirim gönderebilir ([[FR-16]]).
- Tüm rakamlar sahipliğe uyar: koç **kendi** verdiği işin ilerlemesini görür, öğrencinin diğer
  koçlarının verdiğini değil ([[BR-024]]).

**Dikkat.** Üç kova bir rapor değil, bir **eylem sıralaması**: önce **beni bekleyenler**, sonra
**geride olanlar**, sonra **iyi olanlar**. Başka her sıralama, uygulamanın yapması gereken triyajı
koça yaptırır. Ekran tek sorguda yüklenmeli, öğrenci başına N+1 ile değil. Devam kaydı işlenmemiş
geçmiş dersler de burada görünmeli ([[FR-10]]).

Katalog bu gereksinimin belirli bir dashboard tasarımını dayatmadığını açıkça söylüyor: istenen
**bilgi**, yerleşim değil.

## Para

> [!warning] v1.1'e ertelendi — v1'de yapılmıyor
> **20 Ekim 2026:** finans modülünün tamamı v1'den çıktı. Gerekçe: başkasının parasına dokunmak
> hukuki ve KVKK riski taşıyor, acele edilmemeli; ayrıca koçlar ücreti zaten kendi usulüyle takip
> ediyor, acil ihtiyaç değil. v1 bunun yerine koçluk döngüsünü kanıtlıyor. Aşağıdaki üç alan
> **yazılı ve geçerli**, sadece v1'de kodlanmıyor ([[Kapsam ve MVP (TR)]]).

> Bu üç alanın tamamı **opt-in finans modülünün** içinde ([[FR-25]], [[BR-029]]). Modül kapalıyken
> hiç fiyat verisi yoktur ve ürünün geri kalanı eksiksiz çalışır.

### FR-18 — Öğrenci bazlı fiyatlandırma

**Niyet.** Koçlar öğrenci bazında fiyatlıyor — ailenin durumuna, ne kadar süredir çalıştıklarına,
pazarlığa göre. Fiyat **ilişkiye** aittir; koça da öğrenciye de değil. **Ve öğrenci asla görmez.**

- Koç her öğrenci için ayrı fiyat tanımlar. Fiyatlar **elle girilir**; platform parayı asla
  taşımaz.
- Fiyat **koç–öğrenci ilişkisine** aittir: öğrenci birden çok koçla çalışıyorsa her koç kendi
  fiyatını bağımsız belirler ([[BR-020]], [[BR-024]]).
- İki fiyat **modeli** (K-02): **ders başı** ve **aylık sabit**. Model, hakedişin nasıl üretileceğini
  belirler ([[BR-021]]).
- Ders başı modelde **ders tipine göre ayrı tutar**: birebir, grup, deneme analizi (K-03).
- Fiyat **öğrenciye görünmez** ([[BR-022]]). Yalnızca sahibi koç ve öğrencinin onaylı velileri
  görür.
- Sistem fiyatın **hangi dönemden itibaren geçerli** olduğunu izler ki değişiklik geçmiş hakedişi
  bozmasın ([[BR-023]]). Fiyat değişikliği kim/ne zaman bilgisiyle kaydedilir.

**Nasıl kurulur — tarih etkili fiyat.** Fiyat, değiştirilebilir bir kolon değil **tarih etkili bir
seri** olarak saklanır:

```
CoachStudentRate(id, coachId, studentId,
                 model      /* PER_LESSON | MONTHLY_FLAT */,
                 feeType    /* ONE_ON_ONE | GROUP | EXAM_ANALYSIS, sadece ders başı modelde */,
                 amountMinor, currency,
                 effectiveFrom, effectiveTo /* null = güncel */,
                 createdBy, createdAt)
```

Yeni fiyat, mevcut satırı kapatır (`effectiveTo = now`) ve yenisini ekler. "D tarihli dersin
fiyatı" = `effectiveFrom <= D < effectiveTo` olan satır. Hakediş ayrıca tutarın **snapshot**'ını
tutar ([[FR-19]]) — çifte emniyet, çünkü [[BR-023]] ileride iyi niyetli bir "fiyatı güncelleyiver"
yamasıyla kırılmaya en açık kural.

Para **tam sayı kuruş + para birimi kodu**. Asla float.

### FR-19 — Puantaj ve hakediş

**Niyet.** Koçun bu ürüne para vermesinin en güçlü sebebi: ayın geliri, ay sonunda hafızadan
toplanmak yerine **gerçekten olmuş derslerden** kendi kendine hesaplanıyor — öğrenci bazında ve
toplamda.

- Hakediş kaynağı **fiyat modeline** bağlıdır (K-05, [[BR-021]]): **ders başı** → devam kaydı
  `ATTENDED` olan verilmiş dersler; **aylık sabit** → dönem + aktif ilişki (takvim bu modelde
  yalnızca süreklilik raporu ve ihtilaf kanıtı).
- Ders başı modelde hesap, verilmiş ders kayıtlarını o öğrenci, ders tipi ve tarih için geçerli
  fiyatla birleştirir.
- **Grup dersi katılımcı başına bir hakediş satırı** üretir, her biri o öğrencinin kendi grup
  fiyatından ([[BR-028]]).
- Bir hakediş kaydı en az şunlarla izlenebilir: öğrenci, koç, ilgili ders(ler), ders tarihi,
  uygulanan fiyat, hesaplanan tutar.
- Yalnızca sahibi koç ve öğrencinin onaylı velileri görebilir ([[BR-022]]); **öğrenci hiçbir şekilde
  göremez**.
- **İptal edilen ders asla faturalanmaz.** `NO_SHOW`'un faturalanıp faturalanmayacağı **koç başına
  bir ayar**; varsayılanı açık ([[Open Questions|Q-04]], A-11).
- Fiyatı sonradan değiştirmek geçmiş dersler için hesaplanmış tutarları **geriye dönük
  değiştirmez** ([[BR-023]]): 500 TL'ye verilmiş ders, fiyat 600 TL olunca da 500 TL kalır.
- Koç hakedişi **öğrenci bazında** ve **tüm öğrenci havuzu toplamında** görebilir; aylık dönem
  bazında, öğrenci ve ders kırılımıyla.
- Hakediş, cari hesabın **borç** tarafıdır; tahsilat ve aylık ekstre [[FR-25]]'te.

**Hesap zinciri**

```
Ders (ATTENDED)  ──►  TimesheetEntry  ──►  Earning
                       faturalanır mı?      amountMinor
                       uygulanan kural      rateSnapshotMinor
                                            rateId, lessonId, periodMonth
```

| Devam | Faturalanır | Not |
| --- | --- | --- |
| `ATTENDED` | evet | |
| `NO_SHOW` | koç ayarı | varsayılan açık — [[Open Questions|Q-04]]; geçici varsayılan: faturalanır |
| `CANCELLED` | **hayır** | v2'de karara bağlandı, kim iptal ederse etsin |

**Dikkat.** Hakediş satırı hem `rateSnapshotMinor` hem geldiği `rateId`'yi saklar; böylece biri
ileride fiyat satırını düzenlese bile [[BR-023]] ayakta kalır. **Yeniden hesaplamaya yalnızca
dayanak olgu değişince izin var** (devam kaydı düzeltildi) — fiyat değişince asla. Havuz toplamı
koça özeldir, bir veli yanıtına **asla sızmamalı**.

### FR-25 — Finans modülü ve cari hesap

**Niyet.** Fiyat ve hakediş "bana ne borçlu?" sorusunu cevaplıyor. Cari hesap döngüyü "gerçekte ne
ödendi?" ile kapatıyor — bu olmadan borç rakamı sadece büyür ve kimse ekrana bakmaz. Ve birçok koç
kayıt dışı çalıştığı için finans alanının tamamı **opt-in ve gerçekten silinebilir** ([[BR-029]]):
çekinen koç ürünün geri kalanını yine de kullanabilsin.

**Modül kontrolü**

- Platform **parayı asla taşımaz**: kart yok, ödeme kuruluşu yok, komisyon yok. Sadece hesaplar ve
  gösterir (K-01).
- Modül **varsayılan kapalı**, koç bazında açılır. Kapalıyken diğer her özellik eksiksiz çalışır.
- Modülü kapatırken koça **"verilerimi sil"** seçeneği sunulur ve bu **fiziksel silmedir** —
  [[BR-025]]'in tanımlı tek istisnası.
- Velinin **finans görünürlük anahtarı** ([[FR-20]]) yalnızca koçun modülü açıkken işler.

**Cari hesap**

- Hakedişler **borç**, koçun elle girdiği tahsilatlar **alacak**, farkı **bakiye** (K-06).
- Tahsilat kaydı en az: koç, öğrenci, tarih, tutar, isteğe bağlı not.
- Görünüm **aylık ekstre**: dönem borcu, dönemde tahsil edilen, bakiye.
- Koç her öğrencinin rakamını ayrı **ve** tüm havuzun toplamını görür.

**Güvenlik ve dürüstlük**

- Finans verisi sunucuda **şifreli** saklanır; çözme anahtarı işletmecide (K-08, "Kademe 1").
  Anahtarın koçta olduğu uçtan uca şifreleme `[V1.1]`.
- Koça dürüstçe söylenir: *"Finansal verileriniz şifreli saklanıyor. Yasal bir talep gelirse açıp
  vermekle yükümlüyüz."* Ürün asla bir **vergi denetiminden kaçma aracı** olarak konumlanmaz.
- **Tutarlar log'larda, bildirim metinlerinde, analitik olaylarında ve arama indekslerinde asla yer
  almaz** (K-41).
- Erişim [[BR-022]]'ye uyar: sahibi koç ve öğrencinin yetkili velileri. Öğrenci hiçbirini görmez;
  aynı öğrencinin başka koçu da görmez.

**Dikkat.** Müşterinin teknik planı finansı **kendi DB şemasında**, uygulama şemasından **hiç
foreign key almadan ve tutarlar üzerinde join yapmadan** izole ediyor (K-39) — hem silmeyi hem
ileride şifreleme yükseltmesini ucuzlatan şey bu. Şifreli tutar alanları sunucuda `SUM`'lanamaz;
toplamlar çözüldükten sonra hesaplanır. Log/push/analitik hiçbir yerde tutar olmaması **gözden
geçirmeyle değil, serializer testiyle** garanti edilmeli.

## Veli

### FR-20 — Veli bilgi erişimi

**Niyet.** Veli parayı ödüyor ve endişeleniyor, ama koçluk yapmıyor. Görünümü **bilgilendiricidir** —
işin yürüdüğüne ve paranın hesabının tutulduğuna dair haftalık bir içi rahatlama — yönetim konsolu
değil.

- Veli, koçun **kendisine açtığı** ilerleme bilgisini görür.
- Koç görünürlüğü **tam üç anahtarla** yönetir, koç–öğrenci ilişkisi bazında (K-29). **v1'de
  bunların ilk ikisi var**; finans anahtarı modülüyle birlikte v1.1'de geliyor:

  | Anahtar | Veliye ne açılır | v1 |
  | --- | --- | --- |
  | **İlerleme** | haftalık/günlük ilerleme, tamamlanan ve eksik iş, ders sürekliliği, koç notu | ✅ |
  | **Denemeler** | onaylı deneme sonuçları ve gelişim ([[BR-017]]) | ✅ |
  | **Finans** | ders ücreti, borç, ödenen, bakiye, ders kırılımı — yalnızca koçun finans modülü açıkken | ⏳ v1.1 |

  Kapalı anahtar, o alanın **hiç görünmemesi** demek — soluk değil, **yok**.
- Anahtarlardan bağımsız olarak veli **asla** şunları görmez: görev/ödev detayları, öğrencinin
  kişisel takvimi, koçun özel notları, diğer koçların fiyat ve hakediş verisi.
- Veli öğrencinin **okul karnesini** görür ([[FR-24]]).
- Fiyat ve hakediş veliye açık, **öğrenciye asla** ([[BR-022]]).
- Veli yalnızca aktif ve onaylı bağlı olduğu öğrenciyi görür ([[BR-003]]). **Varsayılan olarak
  hiçbir şey paylaşılmaz.**
- Veli koçtan bildirim alabilir, ama öğrencinin bildirimlerini otomatik almaz.

**Neden yedi değil üç anahtar.** Maliyet **kombinasyon sayısı**: 7 anahtar = 128 durum ve her biri
için anlamlı bir veli ekranı; 3 anahtar = 8. Müşteri prototipin 7 anahtarını bu yüzden kesti
(K-29). Denemeler kendi anahtarını korudu çünkü sonuçlar hassas.

**Dikkat.** İki veli aynı şeyi görür, veli başına ayar yok. Veli görünümü **haftalık tempoda** —
akış değil özet tasarla. Aylık özet bildirimi düşünülmeli: istediğimiz veli davranışı "özeti
okumak", "girip kurcalamak" değil.

## Platform

### FR-21 — Denetim kaydı (durum ve işlem geçmişi)

**Niyet.** Bu üründeki her ihtilaflı konuşma — "ben gönderdim", "dersin iptal olduğunu bana kimse
söylemedi", "fiyat o zaman farklıydı" — olay kaydıyla çözülür. [[FR-14]]'ün geriye dönük
değişmeyen bir geçmiş raporlayabilmesinin de tek yolu bu.

**Şimdi kurmak ucuz; sonradan geriye doldurmak imkânsız.**

- Önemli durum değişiklikleri **aktör ve zaman damgasıyla** izlenebilir.
- En az şu olaylar kaydedilir: görev/ödev oluşturma, tamamlama bildirimi, geri gönderme, onay, ders
  isteği, ders kabulü/reddi, ders iptali, deneme sonucu gönderimi/onayı, kaynak önerisi, fiyat
  değişikliği, puantaj/hakediş oluşturma.
- İş kalemleri için ayrıca: oluşturma zamanı, son tarih, her gönderim zamanı, her onay zamanı, her
  geri gönderme zamanı, varsa geri gönderme notu, tekrar gönderim detayları, nihai durum.
- Gönderim zamanı ile onay zamanı **ayrı alanlardır ve birbirinin yerine kullanılmaz**.
- Geçmiş kayıtlar raporlama için korunur; ilişki bitince veya kalem tamamlanınca silinmez
  ([[BR-025]]).

**Nasıl kurulur.** Tek bir `audit_log` tablosu: `actorId`, `entityType`, `entityId`, `action`,
`payload`, `createdAt`. **Sadece ekleme**, `(entityType, entityId, createdAt)` üzerinde indeks. İş
kalemi olayları aynı zamanda alanı sürdüğü (durum türetimi) için ayrıca tipli bir
`work_item_events` tablosunu hak ediyor.

**Denetim kaydı, değişiklikle aynı transaction içinde yazılır.** Sessizce olay kaçırabilen bir
denetim kaydı, hiç olmamasından kötüdür — çünkü insanlar ona güvenir.

### FR-22 — Abonelik ve ticari model

**Niyet.** Müşteri **koç**. Öğrenci ve veli ücretsiz kullanıyor — ürünün yayılma biçimi de bu: her
koç 30 öğrenci getiriyor ve o öğrencilerin bazılarının henüz platformda olmayan başka bir koçu var.

- Platformun ödeme yapan müşterisi koçtur; öğrenci ve veli ücretsiz kullanır.
- **v1, bitiş tarihi ilan edilmiş ücretsiz beta** (K-28) — ödeme entegrasyonu yok.
- **Koç başına aktif öğrenci limiti ilk günden koda konur**, ki ileride paket kademeleri bir şey
  ifade etsin; sayı açık ([[Open Questions|Q-21]], A-03).
- Faturalandırma v1.1'de, **aktif öğrenci sayısına göre kademeli**; paketler ve fiyatlar açık
  ([[Open Questions|Q-10]], A-02).
- Bu abonelik, koçun kendi öğrencilerine koyduğu ders ücretinden **tamamen ayrı bir kavram**
  ([[FR-18]]) — platform o paraya asla dokunmaz.
- **Koçun aboneliği düşerse öğrenci ve veli asla kesilmez**; en kötü ihtimalle erişimleri salt
  okunura düşer.

**Dikkat.** v1'de **modeli** gönder (koç başına `Subscription` satırı: plan, durum, dönem sonu,
öğrenci limiti) ama uygulamayı kapalı bırak. Yetkilendirmeyi lansmandan sonra geri takmak her
endpoint'e dokunmak demek; kapalı bir kontrolü şimdiden koymak hiçbir şeye mal olmuyor.

**Bir öğrenciyi koçu para ödemeyi bıraktı diye kilitleme.** Geçmişi onun kendi geçmişi ve ücretsiz
tarafı değersizleştiren şey tam olarak budur.

---

# Bölüm 2 — İş kuralları (BR-001 … BR-031)

Müşterinin 31 sert kuralı (`İK-001`–`İK-031`). Bunlar tasarım tercihi değil: **birini kırmak
hatadır.** Her biri `02-Requirements/Business Rules/` altında tek dosya; aşağıdakiler o notların
Türkçe özeti.

**v2 ile ne değişti:** İK-006 **ters çevrildi** (itiraz modeli) · İK-017 **yeniden açıldı** (Q-20) ·
İK-018/019 genişletildi (net otomatik) · İK-021 netleşti (fiyat modelleri) · İK-025'e finans
istisnası eklendi · **İK-027–031 yeni**.

## En kolay kırılacak beş kural

Fark etmeden ihlal etme kolaylığına göre sıralı:

1. **[[BR-024]]** — bir `where` içinde unutulan tek bir `coachId` rakip koçun içeriğini sızdırır; v2
   gör/yönet ayrımından sonra **tersi tuzak da var**: başka koçun kalemi üzerinde görünen bir
   "Onayla" butonu.
2. **[[BR-022]]** — koç görünümü ile öğrenci görünümü arasında paylaşılan tek bir DTO parayı açar.
3. **[[BR-023]]** — yerinde yapılan tek bir "basit" fiyat güncellemesi geçen ayın gelirini sessizce
   değiştirir. Aynı snapshot disiplini artık gecikme saatini de kapsıyor ([[BR-027]]).
4. **[[BR-009]]** — gecikmede `approvedAt` kullanmak doğru görünür ve yanlıştır; itiraz modelinde
   çoğu kalem zaten hiç "onaylanmadığı" için iki kat yanlıştır.
5. **[[BR-017]]** — ham sonuç tablosunu okuyan tek bir toplama her grafiği zehirler (kural Q-20 ile
   tartışmaya açık, ama tek-kapsam disiplini her hâlükârda şart).

**Her biri, özellik yazılmadan önce yazılmış, gürültüyle patlayan bir testi hak ediyor.**

## İlişkiler

**BR-001 — Bir öğrenci aynı anda birden fazla koçla çalışabilir.** Ciddi sınav öğrencisinin genelde
bir genel koçu artı branş öğretmenleri olur. Tek koç modellemek ilk gün yanlış, sonradan
düzeltilemez olurdu. `CoachStudentLink` kendi yaşam döngüsü olan çoka-çok bir bağ; **hiçbir yerde
`student.coachId` varsayılmaz.**

**BR-002 — İlişkiyi her iki taraf da bitirebilir**, tek başına, **veli onayı gerekmeden** (K-17).
Bitirmek geçmiş veriyi silmez. Koçluk ilişkileri biter, bazen kötü biter: ne taraflar kapana
kısılmalı ne de kayıt silinebilmeli. Şemada **hiçbir yerde cascade delete yok.**

**BR-003 — Veli bağı ancak koç onayıyla aktif olur.** Veli hesabını açar ve öğrencinin kodunu
girerek bağ ister, ama bağ koç onaylayınca aktif olur. Birden fazla koç varsa **herhangi biri**
onaylayabilir; **onaylayan kaydedilir**. Gerekçe: öğrenciler reşit değil; bir çocuğun verisini kimin
göreceğine karar veren, hesap verebilir meslek sahibidir — çocuk değil, veli olduğunu iddia eden
kişi hiç değil.

**BR-004 — Bir öğrencinin en fazla 2 aktif velisi olur.** Anne ve baba. Limit, reşit olmayan birinin
verisinin kazara geniş aileye yayılmasını engeller. Yalnızca uygulama mantığıyla değil, **onay
transaction'ında ve veritabanı kısıtıyla** kontrol edilir.

**BR-030 — İlişki bitince koçun erişimi salt okunur olur.** Koç o ilişkinin geçmişini okumaya devam
eder (hakediş geçmişi için şart) ama yeni hiçbir şey üretemez: görev, ödev, ders, dosya, bildirim
yok. Öğrenci o koçun paylaştığı dosyaları ve önerdiği kaynakları görmeye devam eder. Öğrenci
kendisine verilen materyali kaybetmemeli (K-18). Salt okunur, onaylamayı da kapsar: bağ bittiğinde
onay bekleyen iş **kalıcı olarak orada donar**, tamamlanmadı sayılır (2026-10-30, [[FR-04]]).

## İş (görev / ödev)

**BR-005 — Görev ve ödev bağımsız izlenir.** İkisi ayrı içerik tipi, ilerlemeleri ayrı hesaplanır,
biri diğerinin istatistiğini ve Filiz'ini **asla** etkilemez. Koç ve veli bunları farklı şeyler
olarak düşünüyor; rakamları birleştirmek koçun aradığı deseni tam olarak gizler.

**BR-006 — Tamamlama itiraz modeline göre işler.** Varsayılan: öğrencinin "yaptım"ı kalemi **anında
tamamlar** ve istatistiğe sokar. Atayan koç sonradan geri gönderebilir; geri gönderme istatistiği
geri alır. **İstisna:** koç oluştururken "onay gerekli" işaretleyebilir. **Neden:** her kalem onay
beklerse 30 öğrencili bir koç günde yüzlerce onay tıklamasıyla karşılaşır; iki hafta içinde ya
körlemesine onaylar (veri anlamsızlaşır) ya uygulamayı bırakır. Kontrolü istisnayı kalem kalem
seçerek koç elinde tutar — **kuralı sistem değil koç seçer** (K-13, K-14).
*Tarihçe:* orijinal İK-006 "öğrencinin 'yaptım'ı kalemi asla kapatmaz" diyordu; onay kuyruğunun
maliyeti görülünce **v2'de ters çevrildi**.

**BR-007 — Tamamlama bildirimini yalnızca atayan koç değerlendirir.** Öğrencinin diğer koçlarına ne
sorulur ne haber verilir. B koçunun A koçunun ödevi hakkında ne bağlamı vardır ne de onaylama işi.
`approve()` / `return()` **`actorId == workItem.coachId`** ister; başkası **404** alır.

**BR-008 — Geri gönderme açıklaması isteğe bağlıdır.** Asla zorunlu olmamalı. Koçlar işi ders
aralarında telefondan geri gönderiyor; gerekçe dayatırsan ya geri göndermeyi bırakırlar ya "." yazarlar
— özellik ölür. `returnNote` şemada, DTO'da ve arayüzde nullable.

**BR-009 — Gecikme öğrencinin gönderim zamanıyla ölçülür**, koçun onay zamanıyla **asla**. Öğrenci
yalnızca kendi gönderimini kontrol eder. Koçun yanıt süresi için öğrenciyi cezalandırmak istatistiği
baştan sahte yapar — ve bunun faturasını veliler koça keser. `approvedAt` hiçbir gecikme
karşılaştırmasına girmez; **bu, kuralı bilmeyen birine hata gibi göründüğü için kodda yorum satırını
hak ediyor.** Hangi gönderim? **En sonu** (2026-10-30). Gönderilip geri gönderilen ve tekrar
gönderilen bir iş, en son `submittedAt`'e göre değerlendirilir.

**BR-010 — Geç tamamlanan ile hiç tamamlanmayan aynı şey değil.** Asla aynı istatistikte
raporlanmaz. Bir öğrenci hakkında **zıt** şeyler söylerler: her şeyi bir gün geç bitirenin planlama
sorunu vardır, hiç bitirmeyenin motivasyon sorunu. Koç bunu bir bakışta ayırt edebilmeli.

**BR-027 — Gecikme saati kaleme kopyalanır ve donar.** Koç kendi varsayılanını belirler (ör. 20:00);
görev/ödev oluşturulurken bu değer **kayda kopyalanır ve bir daha değişmez**. Ayarı sonradan
değiştirmek mevcut hiçbir kalemin gecikmesini değiştirmez. Geçmiş, bir ayar değişikliğiyle yeniden
yargılanmamalı — fiyatlardaki snapshot mantığının aynısı. İki koçlu öğrencide "hangi saat geçerli?"
sorusunu da çözer: her kalem kendi saatini taşır (K-19).

## Dersler

**BR-011 — Ders isteğini yalnızca koç açar.** Öğrenci koçtan ders isteyemez. Koç kendi müsaitliğinin
sahibi; öğrencinin başlattığı bir istek kuyruğu koçun takvimini savunmak zorunda olduğu bir gelen
kutusuna çevirirdi.

**BR-012 — Kesinleşmiş dersi her iki taraf da iptal edebilir.** Hayat iki tarafta da oluyor. Kimin
iptal ettiği güven ve kayıt için önemli — **para için değil**: iptal edilen ders hiç faturalanmaz.
`cancelledBy`, `cancelledAt`, `cancelNote` saklanır ve denetim satırı yazılır.

**BR-013 — İptal açıklaması isteğe bağlıdır.** Ders isteğini reddetmek için de aynısı. [[BR-008]] ile
aynı gerekçe: hızlı ve rahatsız bir eylemde zorunlu alan ya kaçınma ya gürültü üretir.

**BR-028 — Grup dersi ücreti öğrenci başınadır, bölüşülmez.** Grup dersi **tek** takvim kaydı, ama
devam ve hakediş **katılımcı başına** üretilir, her biri o öğrencinin kendi grup fiyatından. Çünkü
fiyat zaten ilişkiye ait ([[BR-020]]): 400 TL "grup dersinin fiyatı" değil, **o öğrencinin** grup
fiyatı. Böylece bölüştürme mantığı hiç gerekmez, her katılımcı farklı fiyatlanabilir ve bir
katılmama yalnızca o öğrencinin satırını düşürür (K-04).

## Program ve kaynaklar

**BR-014 — Koç öğrencinin tüm kişisel programını göremez.** Ne okul saatleri, ne kişisel etkinlikler,
ne boş zaman. Koç yalnızca **kendi koçluk ilişkisi içindeki** ders kayıtlarını görür. Öğrencinin
takvimi özeldir; sessizce bir gözetim aracına dönüşen koçluk uygulaması öğrenciyi kaybeder — ve
günlük kullanıcı öğrencidir. `SCHOOL` ve `PERSONAL` kayıt türleri koça giden hiçbir DTO'ya
serialize edilmez.

**BR-015 — Koç kaynak havuzunu görür ve kaynak önerir.** Bu, [[BR-014]]'ün gizlilik duruşuna
**açık bir istisna**: havuz paylaşılır, takvim paylaşılmaz. Koç göremediği materyal hakkında tavsiye
veremez; müşteri bunu takvim gizliliği kuralına karışmasın diye ayrı bir izin olarak yazmış.

## Denemeler

**BR-016 — Deneme sonucu koç onaylayana kadar nihai değildir.** Sonuçlar beyan usulü ve elle
giriliyor; hem dürüst hatalar hem iyimser yuvarlamalar olağan. Doğrulanmamış bir sayı, ürünün
göstermek için var olduğu her trendi zehirlerdi. Durum `PENDING_APPROVAL` başlar, `APPROVED` veya
`REJECTED` olur; kararı yalnızca öğrencinin seçtiği koç verebilir ([[BR-031]]).

**BR-017 — Onaysız sonuç hiçbir istatistiğe girmez.** Ortalama, en iyi sonuç, gelişim, geçmiş
performans, ders bazlı performans — hepsinden dışlanır. **Tartışmaya açık** ([[Open Questions|Q-20]],
A-01): ya böyle kalacak ya da sonuçlar "doğrulanmamış" etiketiyle anında istatistiğe girecek
([[BR-006]]'nın itiraz modelini yansıtarak). **Karar gelene kadar kural yazıldığı gibi geçerli.**
Tek bir `approvedResults` kapsamı istatistiklerin tek kaynağı olmalı; hiçbir toplama ham tabloyu
okumamalı — kararı çevirmek tek bir yere dokunsun.

**BR-018 — Puan elle girilir, net hesaplanır.** Puan formülleri sınav tipine ve yıla göre değişiyor;
yanlış hesaplamak hiç hesaplamamaktan kötü — o yüzden puan elle kalıyor. Net formülleri ise sabit,
herkesçe bilinen ve ucuz (TYT/AYT: yanlış ÷ 4); öğrenciye ders ders net hesaplatmak veri girişini
öldürür (K-30). *Tarihçe:* orijinal İK-018 v1'de **her şeyi** elle yaptırıyordu; v2'de net otomatik
oldu.

**BR-019 — Net ve puan kuralları sınav tipine göre değişebilmeli.** Veri modeli tek bir formüle bağlı
olmamalı: net v1'den itibaren **tip bazında** otomatik hesaplanır, ders listesi tipe göre değişir ve
yeni sınav tipi **şema değişikliği olmadan** eklenebilir. YKS yanlışın dörtte birini, LGS üçte birini
götürüyor; sınav yapıları bakanlık kararıyla değişiyor. Şemaya gömülü formül, her değişiklikte bir
migration demek. Ders başına `correct`, `wrong`, `blank`, `net`, `score` + `examType` saklanır;
türetme `packages/shared` içinde tip bazlı stratejide yaşar.

**BR-031 — Deneme sonucunu onaylayacak koçu öğrenci seçer.** Tek aktif koç varsa otomatik atanır,
seçici gösterilmez. Sonuç **öğrencinin** verisi; hiçbir koç sahibi değil, dolayısıyla kimin
doğrulayacağına öğrenci karar verir. Bu, öğrencinin başlattığı her onay akışı için desen (K-21).
Seçilmeyen koç onay rotasında **404** alır.

## Para

**BR-020 — Her koç öğrenci başına kendi fiyatını belirler.** Fiyat koç–öğrenci ilişkisine aittir;
birden fazla koçla çalışan öğrencinin her koçla farklı fiyatı olur. Fiyat aile ve koç bazında
pazarlıkla belirleniyor: ne öğrenci kaydında ne koç kaydında durmalı. `CoachStudentRate`
`(coachId, studentId)` ile anahtarlanır; `Student` veya `Coach` üzerinde fiyat kolonu **yoktur**.

**BR-021 — Hakediş, fiyat modelinin kaynak kayıtlarından türer.** Ders başı modelde kaynak
**verilmiş ders kayıtları** (`ATTENDED`); aylık sabit modelde kaynak **dönem + aktif ilişki**, takvim
yalnızca süreklilik raporu ve ihtilaf kanıtı. "Hakediş takvimden gelir" cümlesi yalnızca ders başı
fiyatlama düşünülerek yazılmıştı; Türkiye'de baskın model olan **aylık sabitte** düpedüz yanlış
(K-02, K-05). Motor bir **dönem** üretir, dönemin tutarı modele göre hesaplanır. Faturalanabilirlik
kuralları dağınık `if`'ler değil bir **konfigürasyon tablosu** olmalı.

**BR-022 — Parayı yalnızca koç ve yetkili veliler görür.** Fiyat ve hakediş bilgisi ilgili koça ve
öğrencinin yetkili veli(leri)ne görünür. **Öğrenci asla göremez.** Ailenin koçluğa ne ödediği
öğrencinin işi değil ve bunu açmak koçluk ilişkisini değiştirir. Kazara ihlal edilmeye en açık kural
bu: paylaşılan bir DTO yeter. Para alanları öğrencinin çağırabileceği hiçbir şeyle aynı endpoint ve
yanıt tipinde olmamalı — **gözden geçirmeyle değil, öğrenciye açık yanıt şemaları üzerinde bir
testle** garanti et.

**BR-023 — Fiyat değişikliği geçmiş hakedişi yeniden yazmaz.** 500 TL'ye verilen ders, fiyat 600 TL
olunca 500 TL kalır. Müşteri tam olarak bu örneği verdi, çünkü muhasebeye olan güveni yok eden hata
bu: koç zam yapıyor ve geçen ayın geliri sessizce değişiyor. **Bilinçli olarak iki mekanizma:**
(1) fiyatlar tarih etkili, yerinde güncellenmez; (2) her `Earning` geldiği `rateId` ile birlikte
`rateSnapshotMinor` saklar. Yeniden hesaplamaya **yalnızca dayanak olgu değişince** izin var (devam
düzeltmesi), fiyat değişince asla.

**BR-029 — Finans modülü opt-in ve verisi gerçekten silinebilir.** Modül (fiyat, hakediş, tahsilat,
ekstre) **varsayılan kapalı**; koç bilerek açar ve kapalıyken ürünün geri kalanı eksiksiz çalışır.
Kapatırken sunulan **"verilerimi sil"** seçeneği **gerçek, fiziksel silmedir** — [[BR-025]]'in tanımlı
tek istisnası. Kayıt dışı çalışan koçlar finansal iz bırakmaktan korkuyor ve bu korku gerçek bir
benimseme riski. Tek tıkla silebileceğini bilen koç veriyi girmeye razı olur; **soft delete bu sözü
yalan yapardı** (K-07, K-09). Finans verisi, domainin geri kalanından **hiç referans almayan** izole
bir şemada yaşar (K-39) — silme yolu bu yüzden mümkün. Denetim kaydı modülün açıldığını/kapandığını/
silindiğini kaydeder, **hiçbir tutarı değil**.

## Yetki ve platform

**BR-024 — Bir koç başka bir koçun içeriğini yönetemez (gör/yönet ayrımı).**

- Öğrencinin **kendi** verisi (kaynak havuzu, deneme sonuçları, karne, konu ilerlemesi) → **tüm**
  aktif koçlara görünür.
- Koçun ürettiği **görev ve ödevler** → öğrencinin diğer aktif koçlarına görünür (üreten koç
  etiketli), ama **yalnızca yaratan koç yönetir**: onay yok, düzenleme yok, geri gönderme yok, silme
  yok.
- Koçun **dersleri, dosyaları, bildirimleri, fiyatları ve hakedişleri** → diğer koçlara **tamamen
  görünmez**.

Koçlar aynı öğrenciyi paylaşan bağımsız profesyoneller. Aralarında sızıntı hem mahremiyet hem ticari
ihlal — ve yazılı gör/yönet kuralı olmadan bariz arayüz (tek görev listesi, her satırda "Onayla"
butonu) geliştiriciyi B koçuna A koçunun işini onaylatmaya götürür, A koçunun takibini sessizce
bozar. Görülemeyen kayıt istendiğinde **404** döner, 403 değil — varlık sızdırılmaz.

**BR-025 — Geçmiş kayıtlar korunur.** Kalemi tamamlamak, son tarihin geçmesi veya ilişkinin bitmesi
geçmişi silmez. **Tanımlı tek istisna** (v2'de eklendi): finans modülünü kapatan koç finans verisini
gerçekten silebilir ([[BR-029]]). Geçmiş, koçluk kaydının **kendisi**; ihtilafları da çözüyor, her
raporu da besliyor. Domainde hard delete yok: yalnızca durum geçişleri ve soft-delete bayrakları,
cascade delete yok, sadece-ekleme denetim kaydı.

**BR-026 — Her öğrencinin sınıf seviyesi tutulur ve bağlı koçlara görünür.** Koçun verdiği her ödev,
kaynak ve sınav kararının temel akademik bağlamı. Öğrenci ve bağlı koç güncelleyebilir, değişiklikte
denetim kaydı yazılır.

---

## Açık sorular — bu sayfadaki her "açık"ın tek listesi

| Soru | Ne bekliyor | Kimi blokluyor |
| --- | --- | --- |
| [[Open Questions\|Q-02]] | Aylık genel ilerleme formülü ve günlük uç durumlar (A-09) | FR-08, FR-14 |
| [[Open Questions\|Q-04]] | `NO_SHOW` faturalanır mı — koç ayarının **varsayılanı** (A-11) | FR-19, FR-25 |
| [[Open Questions\|Q-10]] | Abonelik paketleri, fiyatlar, ödeme sağlayıcı (A-02) | FR-22 (v1.1) |
| [[Open Questions\|Q-12]] | Reşit olmayan hesapta KVKK rızasını kim verir | FR-01 |
| [[Open Questions\|Q-14]] | Tekrarlayan dersler | FR-09 |
| [[Open Questions\|Q-19]] | Hesap silmede bekleme süresi | FR-01 |
| [[Open Questions\|Q-20]] | Onaysız deneme sonucu istatistiğe girer mi (A-01) | FR-15, BR-017 |
| [[Open Questions\|Q-21]] | Beta aktif öğrenci limiti (A-03) | FR-22 |
| [[Open Questions\|Q-22]] | Karne not ölçeği: 100'lük mü 5'lik mi (A-04) | FR-24 |
| [[Open Questions\|Q-23]] | İki koç aynı öğrenciye aynı saati verebilir mi (A-05) | FR-09 |
| [[Open Questions\|Q-24]] | Dosya saklama süresi (A-07) | FR-13 |
| [[Open Questions\|Q-25]] | Reddedilen deneme sonucunun akıbeti (A-08) | FR-15 |
| [[Open Questions\|Q-26]] | Müşterinin teknik planıyla çelişkiler — **platform tarafı kapandı** ([[ADR-0017]]), kimlik doğrulama ve barındırma tarafı açık | FR-16 |
| [[Open Questions\|Q-27]] | Rol hayat boyu sabit mi kalmalı, yoksa hesap boşken değiştirilebilir mi | FR-01, ADR-0014 |
| [[Open Questions\|Q-28]] | Onaylayacak koç bağı bitirirse onay bekleyen deneme sonucu ne olur | FR-15, BR-031 |

Cevabı bilinmeyen bir kuralı **kodda uydurma** — [[Open Questions]]'a satır ekle.

## Bağlantılı notlar

[[Requirements Index]] · [[Business Rules Index]] · [[Kasa Haritası (TR)]] · [[Glossary]] ·
[[Requirements v2 Delta]] · [[Scope and MVP]] · [[Open Questions]] · [[Authorization Matrix]] ·
[[Domain Model]] · [[Progress and Filiz]] · [[Pricing and Earnings]]

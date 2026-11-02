---
title: "Neden LadeStack'i Geliştirdim: Tarayıcıda Çalışan, Kuruluma İhtiyaç Duymayan Araçların Önemi"
description: "Modern web araçları sizi hesap açmaya zorlamamalı veya özel belgelerinizi uzak sunuculara yükletmemelidir. LadeStack'i neden tamamen istemci taraflı bilgi işlem üzerine kurduğumu anlatıyorum."
pubDate: "2026-10-12"
readingTime: 6
category: "Ürün Felsefesi · LadeStack"
slug: "why-i-built-ladestack-browser-first-tools"
lang: "tr"
---

Birkaç yıl önce, normal şartlarda on saniyeden fazla sürmemesi gereken sıradan bir işi halletmem gerekiyordu: bir görseli küçültmek ve üniversiteye ait üç sayfalık bir belgeyi tek bir PDF dosyasında birleştirmek. İnternette arama yaptım, çıkan ilk sonuca tıkladım ve anında e-posta adresimi zorunlu kılan bir açılır pencereyle, ardından da «7 günlük ücretsiz deneme» için kredi kartı bilgilerimi isteyen bir ödeme ekranıyla karşılaştım.

Sonunda kart istemeyen bir dönüştürücü bulduğumda ise, kişisel bilgilerimi içeren belgelerimin adı sanı belirsiz bir ülkedeki uzak bulut sunucusuna yavaş yavaş yüklenişini gösteren bir ilerleme çubuğuyla baş başa kaldım.

Bu durum beni derinden rahatsız etti. Bir kullanıcının sırf bir PDF sayfasını döndürmek veya bir fotoğrafın boyutunu değiştirmek için neden kişisel dosyalarını dünyanın öbür ucuna göndermesi gereksin ki? Günümüzün dizüstü bilgisayarları ve akıllı telefonları çok çekirdekli güçlü işlemcilere ve gigabaytlarca belleğe sahip. Web tarayıcısı artık sadece düz metin görüntüleyen basit bir pencere değil; yetenekli ve bağımsız bir çalışma ortamıdır.

İşte bu çarpık düzeni değiştirmek adına Hindistan'ın Pune kentinde **LadeStack**'i (https://ladestack.in/) hayata geçirdim. Amacım son derece açıktı: Tüm hesaplamaların doğrudan kendi cihazınızda çalıştığı, hesap açma zorunluluğu olmayan, hızlı, pratik ve gizliliğe saygılı geliştirici araçları ile web uygulamaları üretmek.

## Günümüz Web Araçlarının Temel Sorunları

İnternetteki popüler araç sitelerinin büyük bir bölümü kullanıcıya fayda sağlamaktan ziyade iletişim bilgisi toplamak ve reklam göstermek için tasarlanmıştır:

1. **Zorunlu Kayıt Engelleri**: Yılda bir defa kullanacağınız basit bir araç için hesap oluşturmak, onay e-postası beklemek ve yeni bir şifre ezberlemek zorunda bırakılırsınız.
2. **Kişisel Verilerin Buluta Taşınması**: Özgeçmişlerinizi, sözleşmelerinizi, faturalarınızı veya fotoğraflarınızı yüklediğinizde; bu dosyaların nerede saklandığını, kimlerin erişebildiğini ve üçüncü şahıs disklerinde ne kadar süre tutulduğunu kontrol edemezsiniz.
3. **Yapay Hız ve Kullanım Kısıtlamaları**: PDF birleştirme veya kod biçimlendirme gibi en temel işlemler için bile bilerek hız kesilir ve kullanıcılar pahalı aylık aboneliklere yönlendirilir.
4. **Yerel Ortam Kurulumunun Zorlukları**: Küçük bir fikri hızlıca denemek için bile bilgisayarınıza Node.js kurmak, paket bağımlılıklarını çözmek ve ortam değişkeni hatalarıyla boğuşmak zorunda kalırsınız.

Yazılım insanın önüne engel çıkarmamalıdır. Çalışmak istediğinizde araçlarınız anında açılmalı ve işini sessizce yapmalıdır.

## LadeStack'in Temel Tasarım İlkeleri

Tarayıcı tabanlı kodlama ortamımız **GB Coder**'dan belge araçlarımız **LS PDF** ve **MD2PDF**'e kadar LadeStack ekosistemindeki tüm uygulamaları dört ana ilke doğrultusunda geliştirdim:

### 1. Sözde Değil, Mimaride Yerel İşlem

Bir işlem kullanıcının işlemcisi ve tarayıcı standartları aracılığıyla yapılabiliyorsa, o dosya asla bizim sunucularımıza gitmemelidir. **LS PDF** ve **LS Image Compressor** araçlarında birleştirme, bölme, sıkıştırma ve filigran ekleme gibi tüm işlemler WebAssembly, Web Workers ve HTML5 Canvas API sayesinde doğrudan tarayıcı sekmenizde gerçekleşir. Dosyalarınızı depolamıyoruz, çünkü teknik olarak onları hiçbir zaman teslim almıyoruz.

### 2. Giriş Engeli Olmayan Doğrudan Fayda

Bir kodu düzenlemek, **Swift Resume** ile iş takip sistemlerine (ATS) uyumlu bir özgeçmiş hazırlamak ya da **Bharat Land Converter** ile geleneksel arazi ölçümlerini dönüştürmek için oturum açmanıza gerek yoktur. Sayfa yüklendiği anda araç kullanıma hazırdır. İşiniz bittiğinde dosyanız yerel diskinize iner ve geride hiçbir dijital iz kalmaz.

### 3. Öncelikli Yerel Depolama

Kullanıcıları buluta veri yedeklemeye mecbur bırakmak yerine `IndexedDB` ve `localStorage` gibi tarayıcı içi depolama çözümlerini kullanıyoruz. GB Coder'da yazdığınız kodlar veya özgeçmiş taslaklarınız sayfayı yenileseniz dahi tarayıcınızda güvende kalır. İstediğiniz an tüm projeyi ZIP arşivi veya PDF olarak dışa aktarabilirsiniz.

### 4. Gözü Yormayan Sade Arayüzler

Bir çalışma aracı sakinlik ve odaklanma sağlamalıdır. Uygulamalarımı net tipografi, klavye erişilebilirliği ve anlaşılır görsel hiyerarşiyle tasarlıyor; dikkat dağıtan reklam pencerelerinden uzak duruyorum.

## Bugüne Kadar Neler Ürettik?

Kişisel denemelerle başlayan yolculuk, bugün kapsamlı bir araç ekosistemine dönüştü:

- **GB Coder** (`code.ladestack.in`): Monaco Editor tabanlı, hem statik web geliştirmeyi hem de WebContainers ile gerçek Node.js projelerini doğrudan tarayıcıda çalıştıran online IDE.
- **LS PDF** (`pdf.ladestack.in`): Belgeleri sunucuya yüklemeden tarayıcı belleğinde işleyen, 17 işlevli yerel PDF araç takımı.
- **MD2PDF** (`md2pdf.ladestack.in`): Markdown notlarını ve GitHub dokümantasyonlarını KaTeX matematik desteği ve kod renklendirmeyle profesyonel PDF kitaplarına dönüştüren yayın aracı.
- **LS Image Compressor** (`img.ladestack.in`): Cihaz üzerinde Canvas API ile çalışan, JPEG, PNG ve WebP formatlarını dönüştürüp sıkıştıran görsel optimizasyon aracı.
- **Swift Resume** (`resume.ladestack.in`): A4 canlı önizleme ve yerel taslak kaydı sunan, ATS standartlarına tam uyumlu özgeçmiş hazırlayıcı.
- **Bharat Land Converter** (`land.ladestack.in`): Hindistan'ın geleneksel bölgesel arazi ölçüm birimlerini (Guntha, Bigha, Biswa) uluslararası birimlerle kıyaslayan teknik hesaplayıcı.

## Karşılaştığımız Mühendislik Zorlukları

Hesaplamaları tarayıcı içerisine taşımak kolay bir süreç değildir. Tarayıcı sekmelerinin belirli bellek sınırları vardır ve büyük dosyalar dikkatsizce işlenirse düşük donanımlı cihazlarda çökmelere sebep olabilir.

Bu sorunları aşmak için arayüz akışını kilitlemeyen **Web Workers** mimarisinden, bellek sızıntılarını önleyen `Uint8Array` dizilerinden ve parçalı veri akışlarından yoğun olarak yararlanıyorum.

LadeStack'i tek başıma inşa ederken öğrendiğim en değerli kural şudur: En iyi yazılım, varlığını hissettirmeden çalışan, hızlı açılan, verilerinize saygı duyan ve işiniz bittiğinde kenara çekilen yazılımdır. Geliştirmelerimi her zaman bu çizgide sürdüreceğim.


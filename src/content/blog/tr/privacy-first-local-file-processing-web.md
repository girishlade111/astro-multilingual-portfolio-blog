---
title: "Mimariden Gelen Gizlilik: Sunucu Kullanmadan İstemcide PDF ve Medya İşleme"
description: "Kişisel belgelerinizi bulut dönüştürücülere yüklemenin neden gereksiz bir risk olduğunu, LS PDF ve LS Image Compressor'ın dosyaları %100 yerel tarayıcı belleğinde nasıl işlediğini anlatıyorum."
pubDate: "2026-10-30"
readingTime: 6
category: "Web Mimarisi · Güvenlik"
slug: "privacy-first-local-file-processing-web"
lang: "tr"
---

Her gün dünyada milyonlarca insan banka dekontlarını, sağlık raporlarını, kimlik fotokopilerini, gizli iş sözleşmelerini ve aile fotoğraflarını «ücretsiz» online dönüştürücü sitelerine yüklüyor. Bunu çoğunlukla iki PDF dosyasını birleştirmek veya iş başvuru formuna eklenecek bir fotoğrafın boyutunu küçültmek gibi sıradan işleri halletmek için yapıyorlar.

İnsanların çoğu indirme işlemi biter bitmez belgelerinin sunucudan silindiğini varsayar. Ancak yazılım mühendisliği açısından bakıldığında, bir dosya uzak bir sunucunun sabit diskine ulaştığı anda verilen gizlilik sözleri kırılganlaşır: otomatik sistem yedekleri alınır, geçici klasörlerin temizlenmesi gecikebilir, erişim günlüklerinde meta veriler saklanır ve bulut altyapılarında her zaman sızıntı veya yanlış yapılandırma riski bulunur.

**LadeStack** bünyesinde **LS PDF** (`pdf.ladestack.in`) ve **LS Image Compressor** (`img.ladestack.in`) araçlarını tasarlarken tavizsiz bir mimari ilke benimsedim: **Kullanıcı verilerini korumanın en kesin yolu, o verileri sunucuya hiçbir zaman kabul etmemektir.**

## İstemci Taraflı Hesaplamaya Doğru Paradigma Değişimi

Geçmiş yıllarda web tarayıcıları, PDF gibi karmaşık ikili (binary) formatları ayrıştırmak veya yüksek çözünürlüklü piksel matrislerini işlemek için yeterli güce sahip değildi. Bu nedenle bu tür ağır işlemler ImageMagick, Ghostscript veya Poppler gibi sunucu taraflı yazılımlara aktarılırdı.

Fakat günümüzde günlük dosya işlemleri için bu mimari tamamen eskimiştir. JavaScript motorlarının tipli dizileri (TypedArrays) optimize etmesi, WebAssembly'nin donanıma yakın hızda çalışması ve HTML5 Canvas API'sinin doğrudan ekran kartı donanım hızlandırmasından yararlanması sayesinde tarayıcı, tüm bu işlemleri kendi bilgisayarınızda rahatlıkla yapabilir.

```text
[Geleneksel Bulut Yaklaşımı]
Dosya -> İnternetten Yükleme -> Uzak Sunucu Diski -> Backend İşlemi -> Geri İndirme
(Yavaş, veri kotası tüketir, büyük gizlilik ve güvenlik riski taşır)

[LadeStack Yerel Mimarisi]
Dosya -> Tarayıcı RAM'inde ArrayBuffer -> Web Worker / Canvas -> Yerel Blob URL
(Yükleme yok, anında sonuç, mutlak gizlilik güvencesi)
```

## LS PDF'in Arka Planı: Bellekte Çalışan 17 Fonksiyon

**LS PDF**, tamamen istemci tarafında çalışan iki güçlü kütüphane üzerine inşa edilmiştir: ekrana çizim ve metin çıkarma işlemlerini yürüten **PDF.js** ile PDF bayt akışlarını düzenleyen, birleştiren ve bölen **pdf-lib**.

### 1. Ağ Üzerinden Tek Bayt Göndermeden Birleştirme ve Bölme

LS PDF'te üç farklı PDF dosyasını birleştirdiğinizde şu adımlar gerçekleşir:
1. Standart HTML5 File API ile dosyaları seçersiniz.
2. `FileReader.readAsArrayBuffer()` çağrısıyla dosyalar doğrudan tarayıcının RAM belleğine `ArrayBuffer` olarak aktarılır.
3. `PDFDocument.load()` belgenin sayfa ve nesne yapısını doğrudan bellek içinde çözümler.
4. İstenen sayfalar `newDoc.copyPages(sourceDoc, pageIndices)` ile yeni oluşturulan belgeye kopyalanır.
5. Birleştirilen dosya `Uint8Array` dizisine dönüştürülüp `URL.createObjectURL(new Blob([...]))` ile yerel bir bellek adresine çevrilir ve anında diskinize indirilir.

Standart bir dizüstü bilgisayarda tüm bu süreç 200 milisaniyeden kısa sürer. İnternet hattınızdan dışarıya tek bir bayt dahi çıkmaz.

### 2. Web Workers ile Sayfa Donmalarını Engellemek

Yüzlerce vektörel çizim veya yüksek çözünürlüklü tarama içeren ağır PDF'leri ayrıştırmak tarayıcının ana iş parçacığını (main thread) kilitleyebilir. Eğer ana iş parçacığı 50 milisaniyeden uzun süre meşgul edilirse kaydırma takılır, tıklamalar işlemez ve tarayıcı «Sayfa Yanıt Vermiyor» uyarısı verir.

Her zaman 60fps akıcılığında bir arayüz sunabilmek adına LS PDF, ağır hesaplamaların tamamını arka planda çalışan **Web Workers** iş parçacıklarına devreder:

```typescript
// Bellek kopyalamadan veriyi arka plan iş parçacığına devretme
const worker = new Worker('/workers/pdf-worker.js');
const buffer = await file.arrayBuffer();

worker.postMessage({ action: 'EXTRACT_TEXT', buffer }, [buffer]);
```

`buffer` nesnesini «Transferable Object» olarak aktararak, bellekte gereksiz kopyalama yapmadan sahipliğini saniyenin binde biri sürede arka plana devrederiz. İşlem tamamlandığında yalnızca temiz metin veya sonuç verisi ana ekrana döner.

## LS Image Compressor'ın Arka Planı: Doğrudan Canvas Kontrolü

**LS Image Compressor**'da uzak sunucu API'lerine başvurmak yerine tarayıcının donanım hızlandırmalı **HTML5 Canvas API**'sini doğrudan yönetiyoruz.

### 1. Boyutlandırma ve Hedef Boyuta Otomatik Yakınsama

Bir görseli araca bıraktığınızda:
1. Görsel, ana iş parçacığı dışında bir `ImageBitmap` nesnesine dönüştürülür.
2. İstenen maksimum genişlik ve yükseklik sınırlarına göre en-boy oranı hesaplanır.
3. Görsel, yüksek kaliteli bikübik enterpolasyonla bir `OffscreenCanvas` üzerine çizilir.
4. `.convertToBlob({ type: 'image/webp', quality })` fonksiyonuyla sıkıştırılmış dosya elde edilir.

Belirli bir dosya boyutu sınırı gerektiğinde (örneğin: «resmi bir başvuru için bu 4 MB'lık fotoğrafı 200 KB altına düşür»), araç ikili arama (Binary Search) algoritması çalıştırır. Sıkıştırma kalitesini 0,1 ile 1,0 arasında 3-4 hızlı denemeyle hassas şekilde ayarlayarak tam istenen dosya boyutuna kilitlenir.

### 2. Panodan Doğrudan Yapıştırma ile Sıfır Sızıntı

Pek çok ticari servis görselleri sunucuya yükletir. Yerel işleme sayesinde kimlik kartı veya şirket içi tasarım ekran görüntülerini doğrudan panonuzdan (`Ctrl+V`) yapıştırabilir ve hiçbir yere sızma endişesi yaşamadan anında küçültebilirsiniz.

## Ekonomik ve Ahlaki Kazanımlar

Web yazılımlarını tarayıcıda çalışacak şekilde kurgulamak, geleneksel SaaS firmalarının yanaşmadığı samimi bir kazan-kazan ortamı yaratır:

- **Geliştirici İçin Sıfır Sunucu Maliyeti**: Tüm hesaplama kullanıcının kendi işlemcisinde yapıldığı için LadeStack devasa bulut sunucu faturaları veya bant genişliği giderleri ödemez. Bu sayede araçlarımızı kalıcı olarak tamamen ücretsiz sunabiliyoruz.
- **Sözde Değil, Pratikte Güvenlik**: «Dosyalarınıza asla bakmıyoruz» diyen 40 sayfalık gizlilik sözleşmeleri hazırlamamıza gerek yoktur; çünkü mimarimiz dosyalarınızı görmemizi fiziksel olarak imkansız kılar.
- **Çevrimdışı Çalışabilirlik**: Kodlar tarayıcı önbelleğine alındığı için, internet bağlantınız kopsa bile araçlar kesintisiz çalışmaya devam eder.

Gizlilik, kurumsal şirketlere satılan pahalı bir lüks özellik olmamalıdır. Modern tarayıcıların gerçek hesaplama gücüne güvenerek, herkes için daha hızlı, daha ekonomik ve baştan sona güvenli araçlar üretmek mümkündür.


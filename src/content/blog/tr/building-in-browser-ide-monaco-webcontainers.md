---
title: "GB Coder'ın Mimarisi: Node.js ve Monaco Editor'ü Doğrudan Tarayıcıda Çalıştırmak"
description: "GB Coder'ın teknik mimarisi: Bulut sanal makinelerine ihtiyaç duymadan, Monaco Editor, WebContainers ve IndexedDB'yi birleştirerek eksiksiz bir geliştirme ortamı kurmanın yöntemi."
pubDate: "2026-10-24"
readingTime: 7
category: "Teknik İnceleme · GB Coder"
slug: "building-in-browser-ide-monaco-webcontainers"
lang: "tr"
---

Yazılım öğrenmeye ilk başladığım dönemde, kararlı bir çalışma ortamı kurabilmek işin neredeyse yarısı kadar vakit alıyordu. Düşük donanımlı bir dizüstü bilgisayarınız varsa veya üniversitenin ortak laboratuvar bilgisayarlarını kullanıyorsanız; Node.js kurmak, ortam değişkenlerini ayarlamak, VS Code eklentileriyle uğraşmak ve Git SSH anahtarlarını yapılandırmak, henüz çalışan tek bir satır kod yazamadan saatlerinizi tüketebiliyordu.

**GB Coder**'ı (`code.ladestack.in`) işte tam olarak bu ilk engeli ortadan kaldırmak için geliştirdim. Herhangi bir modern tarayıcıda iki saniyede açılan, akıllı kod tamamlama ve sözdizimi denetimi sunan, gerçek kodları çalıştırabilen ve asla uzak sunucu yönetimi veya saatlik sanal makine faturası talep etmeyen bir geliştirici stüdyosu hayal ettim.

Bu makalede GB Coder'ın mimarisini, aldığımız teknik kararları ve masaüstü kalitesindeki geliştirme deneyimini doğrudan tarayıcı içine nasıl taşıdığımızı anlatıyorum.

## GB Coder'ın İki Aşamalı Çalışma Motoru

Farklı projelerin gereksinimleri birbirinden tamamen farklıdır. HTML ve CSS temellerini öğrenen bir öğrencinin ağır bir Linux terminaline ihtiyacı yoktur; buna karşılık React projesini denemek isteyen bir geliştirici `npm install` ve yerel bir geliştirme sunucusu olmadan çalışamaz.

GB Coder'ı hem hafif hem de güçlü kılabilmek için iki ayrı motor tasarladım:

```text
┌────────────────────────────────────────────────────────┐
│                   GB Coder Arayüzü                     │
│         (Monaco Editor + Dosya Gezgini + Sekmeler)     │
└───────────┬────────────────────────────────┬───────────┘
            │                                │
     [Mod 1: Statik Deneme Alanı]   [Mod 2: WebContainers]
            │                                │
    Yalıtılmış <iframe> Önizleme     Wasm Tabanlı Node.js Çekirdeği
    Çift yönlü postMessage İletişimi Sanal POSIX Dosya Sistemi
    Anlık DOM Yansıması              Yerel Terminal ve npm Sunucusu
```

### 1. Hafif ve Hızlı Statik Deneme Alanı

Küçük arayüz denemeleri için sanal bir konteyner başlatmak gereksiz bir kaynak israfıdır. Statik motor, Microsoft'un açık kaynaklı **Monaco Editor** çekirdeğini güvenlik açısından sıkı bir şekilde yalıtılmış bir `<iframe>` ile birleştirir.

Kullanıcı HTML, CSS veya JavaScript kodlarını değiştirdiğinde:
- Gereksiz hesaplamaları engellemek için gecikme (debounce) uygulanır.
- Dosyalar bellek üzerinde doğrudan tek bir HTML belgesi olarak birleştirilir.
- Çerçeveye enjekte edilen özel bir komut dosyası `console.log`, `console.error` ve çalışma zamanı hatalarını yakalayarak `postMessage` aracılığıyla editörün altındaki dahili konsola aktarır.

Bu işlem milisaniyenin altında yanıt verir ve eski dizüstü bilgisayarlarda veya akıllı telefonlarda dahi son derece akıcı çalışır.

### 2. WebContainers ile Gerçek Node.js Çalışma Ortamı

Full-stack bir projeye geçtiğinizde GB Coder, StackBlitz tarafından geliştirilen **WebContainers** teknolojisini devreye sokar.

WebContainers, WebAssembly tabanlı bir mikro işletim sistemini tarayıcınızın Web Workers katmanında doğrudan çalıştırır. Gerçek bir Node.js ortamı, sanal bir POSIX dosya sistemi ve simüle edilmiş bir ağ katmanı sağlar. İnteraktif bir terminal açabilir, `npm install` çalıştırabilir, komut satırı araçlarını kullanabilir ve Vite veya Next.js gibi yerel HTTP sunucuları başlatıp çıktıyı yan panelde anında görebilirsiniz.

Tüm işlemler kendi bilgisayarınızın işlemcisinde döner. Uzak veri merkezlerinde Docker konteynerlerinin uyanmasını beklemezsiniz, sekme açık kaldığı için fatura ödemezsiniz ve tuşa basmanızla kodun çalışması arasında hiçbir ağ gecikmesi yaşanmaz.

## Tarayıcının Sınırlarını Aşmak

Bir geliştirme ortamını tarayıcı sekmesine taşımak, masaüstü uygulamalarının hiç karşılaşmadığı teknik zorlukları beraberinde getirir.

### 1. Çapraz Kaynak Yalıtımı (Cross-Origin Isolation) Sorunu

WebContainers ve çok iş parçacıklı WebAssembly'yi güvenle çalıştırabilmek için tarayıcılar iki katı HTTP başlığı zorunlu kılar:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Bu başlıklar yüksek hassasiyetli zamanlayıcıları ve paylaşılan belleği (`SharedArrayBuffer`) etkinleştirirken, açıkça `CORP` başlığı içermeyen harici CDN yazı tiplerini, betiklerini ve gömülü öğeleri tamamen engeller.

Bu sorunu çözmek adına Monaco Editor'ün arka plan işçileri, sözdizimi kuralları ve simgeleri tamamen paketlenip aynı kaynak üzerinden yerel olarak sunuldu; böylece üçüncü taraf CDN bağımlılıkları tamamen sıfırlandı.

### 2. IndexedDB ile Sıfır Kayıplı Yerel Kayıt

Bir tarayıcı sekmesi yanlışlıkla kapatılabilir, yenilenebilir veya işletim sistemi tarafından bellek yetersizliğinde sonlandırılabilir. Kullanıcıyı sürekli kaydetmeye zorlamak veya verileri uzak bir sunucuya göndermek iş akışını bozar ve veri kaybı riski taşır.

GB Coder'da her yeni dosya, düzenleme ve silme işlemi tarayıcının yerel **IndexedDB** veri tabanına işlemsel (transactional) olarak anında yazılır:

```typescript
interface VirtualFile {
  path: string;
  content: string;
  updatedAt: number;
  isBinary: boolean;
}
```

Bilgisayarınızın şarjı bitip kapansa bile, sayfayı tekrar açtığınız an klasör yapınız, açık sekmeleriniz ve henüz kaydedilmemiş tampon verileriniz eksiksiz olarak geri gelir.

Çalışmanızı kendi masaüstünüze aktarmak istediğinizde ise tek bir tıklamayla `JSZip` aracılığıyla tüm IndexedDB ağacını standart bir `.zip` arşivi olarak bilgisayarınıza indirebilirsiniz.

## Geliştirici Deneyimine Yönelik Arayüz İpuçları

Bir kod editörü saatlerce aralıksız kullanılan bir araçtır. En ufak bir görsel pürüz bile zamanla büyük bir yorgunluğa sebep olur:

- **Monaco İş Parçacığı Ayarları**: Sözdizimi denetimi ve otomatik tamamlama önerileri ayrı Web Worker'larda işlenir; böylece dosya boyutu ne kadar büyürse büyüsün yazma işlemi 60fps akıcılığını korur.
- **Gözü Yormayan Renkler**: Çinko (zinc) tonları, hafif odak çerçeveleri ve okunaklı dosya simgeleriyle sakin bir çalışma alanı oluşturuldu.
- **Alışıldık Kısayollar**: `Ctrl+P` ile dosya arama, `Ctrl+\` ile dikey bölme, `Ctrl+\`` ile terminal açma gibi standart VS Code kısayolları birebir korunmuştur.

## Sonuç

GB Coder, modern web tarayıcılarının eski sınırlarını çoktan aştığının açık bir göstergesidir. Monaco Editor, WebAssembly ve yerel depolama imkanlarını doğru birleştirdiğinizde, geliştiricilere karmaşık kurulumlar veya pahalı aylık üyelikler dayatmadan muazzam bir üretkenlik sunabilirsiniz.

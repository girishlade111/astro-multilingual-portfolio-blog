---
title: "Makine Mühendisliğinden Full-Stack Geliştiriciliğe: Fiziksel Sistemler Kodumu Nasıl Şekillendirdi?"
description: "Fabtech ve SVERI'deki makine sistemleri, toleranslar ve fiziksel sınırlar üzerine aldığım eğitimin, sağlam web mimarileri ve sezgisel arayüzler kurmamda nasıl bir rehbere dönüştüğünü anlatıyorum."
pubDate: "2026-10-18"
readingTime: 6
category: "Kariyer Yolculuğu · Sistem Düşüncesi"
slug: "from-mechanical-engineering-to-fullstack-dev"
lang: "tr"
---

Benim teknik serüvenim JavaScript kütüphaneleriyle veya ilişkisel veri tabanlarıyla başlamadı. 2018 yılında Fabtech Technical Campus'ün atölyesinde, elimde kumpas ve mikrometreyle çelik parçaların ölçülerini milimetrenin yüzde biri hassasiyetinde kontrol ediyordum. Daha sonra Pandharpur'daki SVERI Mühendislik Fakültesi'nde makine mühendisliği okuduğum dönemde günlerim termodinamik, akışkanlar mekaniği ve mukavemet formülleriyle geçiyordu.

O günlerde makine mühendisliği ile yazılım geliştirme birbirinden tamamen kopuk iki farklı evren gibi görünüyordu. Biri fiziksel kütle, sürtünme, ısı ve çelik dişlilerle ilgilenirken; diğeri soyut metinler, sanal bellek ve tarayıcının DOM ağacıyla uğraşıyordu.

Fakat full-stack web geliştirme ve UI/UX tasarımı alanına adım attığımda, makine mühendisliğinin bana yazılım dünyasındaki en kıymetli bakış açısını çoktan kazandırdığını fark ettim: **Gerçek fiziksel sınırlar altında sistemli düşünme yetisi**.

## Mekanik Toleranslar ve Yazılım Durumları

İmalat atölyesinde matematiksel olarak kusursuz bir ölçü diye bir şey yoktur. 25,00 mm çapında bir mili 25,02 mm iç çapındaki bir rulmana geçirmek istiyorsanız mutlaka bir tolerans payı belirlersiniz (örneğin +0,01 mm / -0,00 mm). Eğer torna ustası metali fazla talaş kaldırarak işlerse boşluk oluşur ve parça devir altındaki titreşimden parçalanır. Az işlerse sürtünmeden doğan ısıyla mil sıkışır.

TypeScript ve React ile arayüz geliştirmeye başladığımda tam olarak aynı ilkeyle karşılaştım. Yazılımda «tolerans», veri tipi tanımlamalarınız, girdi doğrulama kurallarınız ve durum sınırlarınızdır:

- Bir API isteği liste yerine beklenmedik şekilde `null` döndüğünde, arayüzünüz temiz bir boş durum mu gösteriyor yoksa yakalanmamış bir hatayla bembeyaz kesilip çöküyor mu?
- Kullanıcı beklenmedik bir karakter girdiğinde veya bir düğmeye yarım saniyede üç kez peş peşe bastığında durum makineniz bu titreşimi sönümleyebiliyor mu, yoksa veri tabanındaki kayıtlar mı bozuluyor?

Mekanik disiplin bana sadece «sorunsuz senaryoya» göre kod yazmamayı öğretti. Fiziksel dünyada parçalar ısınır, esner ve aşınır. Web ortamında da bağlantılar kopar, sunucular gecikir ve kullanıcılar beklenmedik işlemler yapar. Hata ihtimallerini gözeterek mimari kurmak kuruntu değil, temel mühendislik ahlakıdır.

## Gerilme Yığılması ve Performans Darboğazları

Mukavemet biliminde herkesin öğrendiği ilk kurallardan biri **gerilme yığılmasıdır** (stress concentration). Çekme kuvvetine maruz kalan çelik bir kirişin kenarına 90 derecelik dik bir çentik açarsanız, kuvvet çizgileri o sivri köşede aşırı yoğunlaşır ve malzeme yorulma çatlağıyla kırılır. Usta bir mühendis kuvveti homojen dağıtmak için o köşeyi her zaman yumuşak bir kavisle (fillet) yuvarlar.

Web dünyasında da tıpatıp aynı gerilme yığılmaları mevcuttur ve bu yığılma neredeyse her zaman tarayıcının ana iş parçacığında (main thread) gerçekleşir:

```text
[Ana İş Parçacığı] -> Ağır Ayrıştırma -> Eşzamanlı DOM Değişimi -> Zorunlu Yeniden Düzenleme -> Ekran Donması
```

**LS PDF** ve **LS Image Compressor** araçlarını geliştirirken büyük boyutlu dosyaları ana iş parçacığında doğrudan işlemek, o çelik kirişe sivri bir çentik atmakla eşdeğerdi: tarayıcı kilitleniyor, tıklamalar kayboluyor ve sayfa akıcılığını yitiriyordu.

Bu gerilmeyi yumuşatmak için şu çözümleri hayata geçirdim:
1. Ağır hesaplamaları ekran çiziminden ayırmak için **Web Workers** kullanmak.
2. Eşzamanlı döngüleri `requestIdleCallback` veya asenkron üreteçler yardımıyla küçük zaman dilimlerine bölmek.
3. İkili (binary) dosya işlemlerinde çöp toplayıcıya binen yükü hafifletmek için `Uint8Array` gibi tipli dizileri tercih etmek.

İşlemci çevrimlerinin ve saniyede 60 karelik ekran süresinin sınırlı birer fiziksel kaynak olduğunu anladığınız an, performans iyileştirme tesadüf olmaktan çıkıp kesin bir mühendisliğe dönüşür.

## Mekanik Montaj ve Bileşen Mimarisi

Bir dişli kutusu tasarlarken hiçbir parça yekpare bir demir kütlesinden yontulmaz. Dişliler, miller, kamalar, rulmanlar ve gövde; her biri standart bağlantı noktaları ve toleransları olan bağımsız parçalar olarak üretilir. Bir diş kırıldığında bütün makineyi hurdaya ayırmaz, sadece o dişliyi değiştirirsiniz.

**LadeStack**'i ve bu çok dilli Astro portfolyosunu inşa ederken de bileşenlerimi aynı makine parçaları gibi ele alıyorum:

- **Net Sorumluluk Sınırları**: Bir bileşen sadece kendi işini yapmaya yetecek kadar bilgiye sahip olmalıdır. Kontrolsüz global durum kullanımı, bir rulmanı mile kaynakla sabitlemek kadar hatalıdır.
- **Değiştirilebilir Modülerlik**: Bir yardımcı işlev veya arayüz parçası, etrafındaki sistemleri bozmadan sökülüp yenilenebilmelidir.
- **Hileli Kodlar Yerine Bakım Kolaylığı**: En iyi makineler sıradan bir anahtarla tamir edilebilenlerdir. En iyi kod da altı ay sonra başkası baktığında kolayca anlaşılabilendir.

## Mühendislik ile Tasarımın Buluştuğu Nokta

Birçok insan mühendislik ile UI/UX tasarımını zıt kutuplar olarak görür: biri katı ve hesapçı, diğeri öznel ve sanatsal. Ben bu ayrıma katılmıyorum.

İyi tasarım, insan algısına ve psikolojisine göre uyarlanmış mühendislikten başka bir şey değildir. Bir torna tezgahında acil durdurma kolunun kolay erişilir bir yerde olması, göstergelerin parlamaması ve kolların ergonomik olması gerektiği gibi; dijital bir arayüzde de hiyerarşik yazı tipleri, klavye erişilebilirliği, mantıklı varsayılan ayarlar ve net hata mesajları bulunmalıdır.

Pandharpur'daki atölye tezgâhlarından Pune'da bağımsız dijital ürünler geliştirmeye uzanan bu yolculuk bana şunu öğretti: İşlenen malzeme değişebilir ama zanaatın özü daima aynıdır. Sistemi derinlemesine kavramak, platformun kurallarına saygı duymak, gereksiz zorlukları ayıklamak ve insanların her koşulda güvenebileceği sağlam araçlar üretmek.

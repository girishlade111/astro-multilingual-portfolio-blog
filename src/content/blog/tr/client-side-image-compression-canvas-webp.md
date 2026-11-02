---
title: "Sunucuya Yuklemeden Gorsel Sikistirma: HTML5 Canvas ve WebP Mimarisi"
description: "LS Image Compressor ile tek bir piksel bile disari aktarilmadan tarayici belleginde gorsel boyutunu yuzde 85 azaltmanin yolu."
pubDate: "2026-10-29"
readingTime: 6
category: "Web Architecture"
slug: "client-side-image-compression-canvas-webp"
lang: "tr"
tags: ["image-compression", "webp", "canvas-api", "privacy"]
tool: "LS Image Compressor"
---

Gorselleri harici bir bulut sunucusuna yuklemeden, tarayicinin kendi grafik gucunu kullanarak sikistiran **LS Image Compressor** (image.ladestack.in) aracini gelistirdim.

`OffscreenCanvas` sayesinde arayuz donmadan yuksek kaliteli WebP donusumu saglanir.

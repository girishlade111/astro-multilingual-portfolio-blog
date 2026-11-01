---
title: "Şablon Blog: Astro JS ile Çok Dilli ve SEO Odaklı Mimari Oluşturmak"
description: "Saf Markdown formatında yazılmış ve desteklenen dokuz dilin tamamında doğrudan semantik HTML'e dönüştürülen örnek blog yazısı."
pubDate: "2026-11-01"
readingTime: 4
category: "Mimari · Astro JS"
slug: "template-post"
lang: "tr"
---

**Şablon Blog Yazısına** hoş geldiniz. Bu makale tamamen standart Markdown (`.md`) formatında yazılmıştır ve derleme aşamasında Astro JS tarafından otomatik olarak temiz, semantik HTML koduna dönüştürülür.

Bu portfolyodaki her blog yazısı bire dokuz çok dilli yapıyı takip eder: tek bir makale, desteklenen dokuz dilin (`en`, `jp`, `ko`, `zh`, `ru`, `pt`, `tr`, `fr` ve `es`) her biri için ayrı bir Markdown dosyası olarak sunulur.

## 1. SEO İçin Neden Saf Astro JS ve Markdown

Arama motorları, net semantik hiyerarşiye ve doğru dil meta verilerine sahip hızlı HTML belgelerine öncelik verir. İçeriği Markdown ile yazıp Astro ile oluşturduğunuzda:

- **Sıfır İstemci Yükü**: Markdown dosyaları, gereksiz JavaScript paketleri olmadan doğrudan hafif HTML etiketlerine (`<article>`, `<h2>`, `<p>`, `<pre>`, `<blockquote>`) derlenir.
- **Dile Özel URL Yapısı**: Her dil `/tr/blog/template-post`, `/en/blog/template-post` ve `/jp/blog/template-post` gibi kendi URL öneki altında çalışır.
- **Otomatik `hreflang` İndeksleme**: Her sayfa `<head>` bölümünde diğer sekiz dildeki karşılığını işaret ederek arama motorlarının ziyaretçilere doğru dili sunmasını sağlar.

## 2. Çok Dilli Bloglar İçin Klasör Yapısı

Gelecekte yeni bir blog yazısı eklemek için dokuz dil klasörünün her birinde aynı dosya adına (slug) sahip bir Markdown dosyası oluşturmanız yeterlidir:

```text
src/content/blog/
├── en/template-post.md
├── jp/template-post.md
├── ko/template-post.md
├── zh/template-post.md
├── ru/template-post.md
├── pt/template-post.md
├── tr/template-post.md
├── fr/template-post.md
└── es/template-post.md
```

### Standart Frontmatter Şeması

Her Markdown dosyası, yerelleştirilmiş meta verilerini tanımlayan temiz bir YAML frontmatter bloğu ile başlar:

```yaml
---
title: "Yerelleştirilmiş Makale Başlığınız"
description: "Arama motorları ve sosyal medya kartları için kısa SEO açıklaması."
pubDate: "2026-11-01"
readingTime: 4
category: "Engineering"
slug: "your-post-slug"
lang: "tr"
---
```

## 3. Kesintisiz Dil Değiştirme

Okuyucu bu makaleyi okurken gezinme çubuğundan dili değiştirdiğinde, uygulama kullanıcıyı aynı makalede tutar ve seçilen dildeki Markdown dosyasını anında yükler.

> İyi bir mimari yazma sürecini kolaylaştırır. Düşüncelerinizi temiz Markdown ile yazın, dokuz hedef dile çevirin ve HTML dönüşümü ile SEO optimizasyonunu Astro'ya bırakın.

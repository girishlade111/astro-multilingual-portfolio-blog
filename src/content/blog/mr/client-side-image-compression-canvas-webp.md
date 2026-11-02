---
title: "ब्राउझरमध्ये इमेज कॉम्प्रेशन: HTML5 Canvas आणि आधुनिक WebP चे जादूई परिणाम"
description: "फोटोचा दर्जा उत्तम ठेवून फाईलची साईझ ८०% ने कशी कमी करावी? Canvas 2D आणि WebP अल्गोरिदमचा वापर करून इन-ब्राउझर कॉम्प्रेसर कसा बनवला."
pubDate: "2026-10-21"
readingTime: 6
category: "वेब परफॉर्मन्स आणि ग्राफिक्स"
slug: "client-side-image-compression-canvas-webp"
lang: "mr"
---

वेबसाईट चालवताना किंवा ऑनलाईन फॉर्म भरताना सर्वात मोठी डोकेदुखी असते ती म्हणजे "इमेजची साईझ ५०० केबीच्या आत असावी"! लोकांकडे मोबाईलने काढलेले ४ ते ५ एमबीचे फोटो असतात, आणि ते लहान करण्यासाठी ते असुरक्षित साईट्सवर फोटो अपलोड करत फिरतात.

या समस्येवर मी क्लायंट-साइड इमेज ऑप्टिमायझेशन टूल विकसित केले. यात एकही सर्व्हर कॉल न करता ५ एमबीचा फोटो अवघ्या ३०० केबीचा होतो, आणि विशेष म्हणजे डोळ्यांना फरकही कळत नाही!

## हे कसे काम करते?

ब्राउझरमध्ये उपलब्ध असणारे `HTMLCanvasElement` आणि आधुनिक `image/webp` फॉरमॅट हे अत्यंत शक्तिशाली आहेत:

1. **डायनॅमिक आस्पेक्ट रेशो रिसायझिंग**: जर फोटो ४००० पिक्सलचा असेल, तर त्याला स्क्रीनच्या गरजेनुसार १९२० किंवा १२८० पिक्सलवर ऑप्टिमाइझ केले जाते.
2. **बाय-क्युबिक स्मूथिंग**: `ctx.imageSmoothingQuality = 'high'` वापरून फोटोच्या कडा शार्प ठेवल्या जातात.
3. **WebP एन्कोडिंग**: जेपेग (JPEG) च्या तुलनेत WebP मध्ये २५ ते ३५% जास्त कॉम्प्रेशन मिळते आणि रंग उडत नाहीत.

```javascript
// क्लायंट-साइड इमेज कॉम्प्रेशनचा सोपा फंक्शन
async function compressImageInBrowser(file, maxWidth = 1920, quality = 0.82) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), 'image/webp', quality);
  });
}
```

अशा साध्या आणि नेटिव्ह वेब एपीआयचा योग्य वापर केला, तर मोठमोठे सर्व्हर न चालवताही भारी प्रॉडक्ट्स उभे करता येतात.

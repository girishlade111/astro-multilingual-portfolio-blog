---
title: "Engineering LadeStack Drive: Zero-Knowledge File Sharing and Local Encryption"
description: "How LadeStack Drive implements client-side AES-GCM-256 encryption, auto-expiring scoped links, and zero-telemetry cloud storage for sensitive files."
pubDate: "2026-11-03"
readingTime: 6
category: "Products"
slug: "ladestack-drive-decentralized-cloud-storage"
lang: "en"
tags: ["cloud-storage", "client-side-encryption", "scoped-links", "privacy"]
tool: "LadeStack Drive"
---

Traditional cloud storage platforms like Google Drive and Dropbox are designed around surveillance economics. Files stored on standard cloud servers are indexed, scanned for training AI models, and made vulnerable to corporate data breaches.

I architected **LadeStack Drive** (drive.ladestack.in) on an uncompromising premise: **the server should never possess the encryption keys to your files**.

## Zero-Knowledge Client-Side AES-GCM-256

When a user drops a file onto LadeStack Drive, the file never travels across the wire in plaintext. Instead, the Web Crypto API generates a cryptographically secure 256-bit symmetric key directly in browser memory:

```typescript
export async function encryptFileForUpload(file: File): Promise<{
  encryptedBlob: Blob;
  iv: Uint8Array;
  keyExport: string;
}> {
  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const buffer = await file.arrayBuffer();

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    buffer
  );

  const rawKey = await window.crypto.subtle.exportKey('raw', key);
  const keyExport = Array.from(new Uint8Array(rawKey))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return {
    encryptedBlob: new Blob([ciphertext]),
    iv,
    keyExport
  };
}
```

## Scoped Auto-Expiring Access Links

The decryption key is appended exclusively into the URL's anchor hash (`#key=...`). Because browsers never send URL hash fragments to web servers in HTTP requests, the storage host only receives an opaque block of encrypted binary noise.

When the recipient clicks the link, their client browser extracts the key from the hash and decrypts the file locally in memory.

## True Digital Privacy

By removing corporate custodians from the loop, sensitive architecture blueprints, legal contracts, and financial statements remain truly confidential.

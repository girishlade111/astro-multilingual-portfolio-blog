---
title: "LadeStack Driveの設計：クライアント暗号化とゼロ知識ファイル共有"
description: "ブラウザ内AES-GCM-256暗号化と有効期限付きリンクにより、サーバーに平文データを残さないセキュアストレージの構築。"
pubDate: "2026-11-03"
readingTime: 6
category: "Products"
slug: "ladestack-drive-decentralized-cloud-storage"
lang: "jp"
tags: ["cloud-storage", "client-side-encryption", "scoped-links", "privacy"]
tool: "LadeStack Drive"
---

一般的なクラウドストレージは、アップロードされたファイルをサーバー側で平文のまま保存・解析することが多く、情報漏洩のリスクがあります。

私はサーバーが復号キーを一切持たない**LadeStack Drive** (drive.ladestack.in) を設計しました。

## Web Crypto APIによるブラウザ内暗号化

ファイルはブラウザのWeb Crypto APIを用いてAES-GCM-256で即座に暗号化され、暗号文のみがストレージに保存されます。復号鍵はURLのハッシュフラグメント（#）に含まれるため、サーバーに鍵が送信されることはありません。

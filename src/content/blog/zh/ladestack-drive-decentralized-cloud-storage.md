---
title: "LadeStack Drive 架构：端到端加密与零知识文件流转"
description: "解析如何基于 Web Crypto API 实现纯前端 AES-GCM-256 加密与阅后即焚链接，杜绝云端数据审查风险。"
pubDate: "2026-11-03"
readingTime: 6
category: "Products"
slug: "ladestack-drive-decentralized-cloud-storage"
lang: "zh"
tags: ["cloud-storage", "client-side-encryption", "scoped-links", "privacy"]
tool: "LadeStack Drive"
---

传统网盘服务普遍在服务器端持有密钥，存在巨大的隐私泄露隐患。

我设计了 **LadeStack Drive** (drive.ladestack.in)。它将加密动作完全前置在用户浏览器端，密钥仅存在于 URL Hash 中，服务器只作为无状态的密文分发通道，实现了绝对的个人资产保护。

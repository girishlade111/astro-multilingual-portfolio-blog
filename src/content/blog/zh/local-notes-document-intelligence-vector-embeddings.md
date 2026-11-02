---
title: "文档智能：基于 WebAssembly 的浏览器端本地向量检索实践"
description: "探索如何在不依赖远端大模型的前提下，利用量化模型与余弦相似度在前端实现私密、实时的语义知识库检索。"
pubDate: "2026-11-05"
readingTime: 6
category: "Prototypes"
slug: "local-notes-document-intelligence-vector-embeddings"
lang: "zh"
tags: ["vector-search", "embeddings", "wasm", "knowledge-graphs"]
tool: "Document Intelligence"
---

为了在完全保护隐私的前提下实现笔记的语义联想，我探索了在浏览器端通过 WebAssembly 运行轻量量化模型并建立本地向量索引的方案。全流程零网络请求，毫秒级响应。

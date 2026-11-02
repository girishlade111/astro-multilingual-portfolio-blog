---
title: "문서 인텔리전스: 브라우저 내부 벡터 검색과 시맨틱 임베딩 구현"
description: "클라우드 전송 없이 WebAssembly 기반 소형 모델과 코사인 유사도를 통해 브라우저에서 직접 구동하는 지능형 검색."
pubDate: "2026-11-05"
readingTime: 6
category: "Prototypes"
slug: "local-notes-document-intelligence-vector-embeddings"
lang: "ko"
tags: ["vector-search", "embeddings", "wasm", "knowledge-graphs"]
tool: "Document Intelligence"
---

개인 노트 데이터를 외부 서버로 전송하지 않고 브라우저 내부에서 직접 텍스트 벡터를 추출하고 코사인 유사도를 계산하는 로컬 검색 프로토타입을 구축했습니다.

---
title: "33개의 웹 게임 포털을 초기 로딩 지연 없이 구축한 성능 최적화 기법"
description: "GameHub 아키텍처: React 동적 임포트, Web Audio API를 활용한 효과음 합성, 메모리 누수 없는 캔버스 상태 관리."
pubDate: "2026-10-30"
readingTime: 6
category: "Web Architecture"
slug: "building-33-mini-games-nextjs-code-splitting"
lang: "ko"
tags: ["game-development", "nextjs", "code-splitting", "performance"]
tool: "GameHub"
---

33가지의 독립된 캐주얼 게임을 단일 웹 앱에서 서비스할 때 가장 큰 문제는 자바스크립트 번들과 사운드 파일의 용량 폭증입니다.

저는 이를 해결하기 위해 **GameHub** (games.ladestack.in)를 설계하여 첫 화면 렌더링(FCP)을 0.8초 이내로 단축시켰습니다.

## 온디맨드 동적 컴포넌트 로딩

플레이어가 게임을 실행하기 전까지는 어떠한 게임 소스 코드도 다운로드되지 않도록 Next.js 동적 임포트를 적용했습니다.

## 가벼운 Web Audio API 사운드 합성

기존 MP3 음원 대신 브라우저의 Web Audio API 신디사이저를 통해 점프음과 타격음을 즉석에서 합성하여 수 메가바이트의 오디오 로딩을 절감했습니다.

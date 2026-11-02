---
title: "실시간 베를레 물리와 자이로 센서 결합: 3D 랜야드 인터랙션 구현기"
description: "무거운 물리 엔진 없이 베를레 적분, 스플라인 곡선 및 모바일 기울기 센서 연동을 Three.js로 구현한 기술적 도전."
pubDate: "2026-11-02"
readingTime: 8
category: "Web Graphics"
slug: "3d-web-physics-interactive-lanyard-threejs"
lang: "ko"
tags: ["threejs", "verlet-physics", "device-orientation", "3d-web"]
tool: "Portfolio Hero 3D"
---

포트폴리오 히어로 영역에 마우스 드래그와 스마트폰의 기울기에 반응하는 3D ID 카드 랜야드를 구현했습니다.

수 메가바이트의 물리 엔진 대신 가벼운 **베를레 적분(Verlet Integration)** 방식을 자체 구현하여 모바일에서도 배터리 소모 없이 60 FPS를 안정적으로 달성했습니다.

## 모바일 기울기 센서(Gyro) 결합

기기의 `DeviceOrientation` 각도를 3차원 중력 벡터로 변환하여, 사용자가 스마트폰을 좌우로 기울이거나 뒤집었을 때 카드가 자연스럽게 흔들리도록 설계했습니다.

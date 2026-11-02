---
title: "3層デザイントークンとアクセシビリティ（WCAG 2.2）を両立するUI設計"
description: "ハードコードを全廃し、プリミティブ・セマンティック・コンポーネントの3層トークンで保守性の高いWebインターフェースを作る手法。"
pubDate: "2026-11-06"
readingTime: 6
category: "Capabilities"
slug: "design-systems-three-tier-tokens-accessibility"
lang: "jp"
tags: ["design-systems", "design-tokens", "accessibility", "wcag-2-2"]
tool: "Design Systems"
---

保守しやすいWebアプリケーションを構築するためには、色や余白の直接指定を排除し、**3層デザイントークン構造**を導入することが不可欠です。

意図に基づいたセマンティックトークンを用いることで、WCAG 2.2 AAのコントラスト比を数学的に保証し、一貫した操作感を提供できます。

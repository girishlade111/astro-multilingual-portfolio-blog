---
title: "インド独自の土地面積単位を精密換算する Bharat Land Converter の設計"
description: "Guntha、Bigha、Ground、Centなど、州ごとに大きく異なるインドの複雑な土地単位系を正確に統一換算するオフライン型ツールの開発記録。"
pubDate: "2026-10-27"
readingTime: 5
category: "Utilities"
slug: "bharat-land-converter-indian-measurement-systems"
lang: "jp"
tags: ["land-converter", "regional-units", "guntha-bigha", "offline-tools"]
tool: "Bharat Land Converter"
---

インドにおける土地取引や登記記録は、州や地域ごとに異なる歴史的な面積単位が混在しており、極めて複雑です。

例えば、ウッタル・プラデーシュ州の「Bigha」は西ベンガル州やラジャスタン州のそれと面積が異なります。マハーラーシュトラ州では「Guntha」が基準となり、タミル・ナードゥ州では「Ground」や「Cent」が用いられます。

計算の誤りによるトラブルを防ぐため、私は**Bharat Land Converter** (land.ladestack.in) を開発しました。

## 地域固有の単位とその複雑性

- **1 Guntha** = 1,089 平方フィート（約 101.17 平方メートル）
- **1 Ground** = 2,400 平方フィート
- **1 Cent** = 435.6 平方フィート
- **Bigha** = 地域によって広さが数倍異なる

すべての単位ペアごとに直接の換算式を書くと組み合わせが膨大になり、丸め誤差の原因になります。

## 基準単位（平方フィート）を経由した正規化設計

本システムでは、すべての入力を一度「平方フィート（Square Feet）」という基準単位に変換し、そこから目的の単位へ展開する2段階アプローチを採用しています。

```typescript
export function convertLandArea(value: number, fromFactor: number, toFactor: number): number {
  const sqFt = value * fromFactor;
  return sqFt / toFactor;
}
```

## 地方の低速回線でも瞬時に動作

現地の農地や建設現場など、通信環境が制限される現場でも確実に動くよう、総容量30KB以下の軽量設計とし、完全オフラインで動作します。

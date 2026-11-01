---
title: "テンプレートブログ：Astro JSによる多言語SEOファースト設計"
description: "純粋なMarkdownで記述され、サポートされている全9言語でセマンティックなHTMLへ直接変換されるテンプレート記事です。"
pubDate: "2026-11-01"
readingTime: 4
category: "アーキテクチャ · Astro JS"
slug: "template-post"
lang: "jp"
---

**テンプレートブログ記事**へようこそ。この記事は標準的なMarkdown（`.md`）のみで記述されており、Astro JSによってビルド時にクリーンでセマンティックなHTMLへと自動的に変換されます。

このポートフォリオのすべてのブログ記事は、9つの言語（`en`、`jp`、`ko`、`zh`、`ru`、`pt`、`tr`、`fr`、`es`）それぞれに対応した9つのMarkdownファイルで構成されています。

## 1. SEOに純粋なAstro JSとMarkdownを採用する理由

検索エンジンは、明確なセマンティック階層と正確な言語メタデータを持つ高速なHTMLドキュメントを高く評価します。Markdownで記事を執筆しAstroでレンダリングすることで、以下のメリットが得られます。

- **クライアント側の負荷ゼロ**: Markdownファイルは不要なJavaScriptバンドルを含まず、軽量なHTMLタグ（`<article>`、`<h2>`、`<p>`、`<pre>`、`<blockquote>`）に直接コンパイルされます。
- **言語ごとの専用URL**: すべての言語は `/jp/blog/template-post`、`/en/blog/template-post`、`/ru/blog/template-post` のように独立したURLパスを持ちます。
- **自動 `hreflang` インデックス**: 各ページの `<head>` 内で他の8言語の翻訳ページと相互リンクし、世界中の訪問者に最適な言語ページを届けます。

## 2. 多言語ブログのディレクトリ構造

今後新しいブログ記事を追加する場合は、9つの言語フォルダそれぞれに同じスラッグ名のMarkdownファイルを作成するだけです。

```text
src/content/blog/
├── en/template-post.md
├── jp/template-post.md
├── ko/template-post.md
├── zh/template-post.md
├── ru/template-post.md
├── pt/template-post.md
├── tr/template-post.md
├── fr/template-post.md
└── es/template-post.md
```

### フロントマターの基本構成

各Markdownファイルの先頭には、言語ごとのメタデータを定義するYAMLフロントマターを記述します。

```yaml
---
title: "ローカライズされた記事タイトル"
description: "検索エンジンおよびSNSシェアカード用の簡潔なSEO概要。"
pubDate: "2026-11-01"
readingTime: 4
category: "Engineering"
slug: "your-post-slug"
lang: "jp"
---
```

## 3. シームレスな言語切り替え

この記事を読んでいる最中にナビゲーションバーから言語を切り替えると、現在の記事ページを維持したまま、選択した言語のMarkdown記事へと即座に切り替わります。

> 優れたアーキテクチャは執筆の妨げになりません。クリーンなMarkdownで思考を書き留め、9つの言語に翻訳すれば、HTMLへの変換とSEO配信はすべてAstroが担います。

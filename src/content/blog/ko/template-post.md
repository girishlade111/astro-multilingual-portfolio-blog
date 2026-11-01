---
title: "템플릿 블로그: Astro JS를 활용한 다국어 SEO 최적화 아키텍처"
description: "순수 마크다운(Markdown)으로 작성되어 지원하는 9개 언어 모두에서 시맨틱 HTML로 직접 변환되는 템플릿 아티클입니다."
pubDate: "2026-11-01"
readingTime: 4
category: "아키텍처 · Astro JS"
slug: "template-post"
lang: "ko"
---

**템플릿 블로그 포스트**에 오신 것을 환영합니다. 이 글은 표준 마크다운(`.md`) 형식으로만 작성되었으며, 빌드 시점에 Astro JS를 통해 깔끔한 시맨틱 HTML로 자동 변환됩니다.

이 포트폴리오의 모든 블로그 글은 지원되는 9개 언어(`en`, `jp`, `ko`, `zh`, `ru`, `pt`, `tr`, `fr`, `es`)별로 각각 하나씩, 총 9개의 마크다운 파일로 동일하게 번역되어 관리됩니다.

## 1. SEO를 위해 순수 Astro JS와 마크다운을 사용하는 이유

검색 엔진은 명확한 시맨틱 구조와 정확한 언어 메타데이터를 갖춘 빠른 HTML 문서를 우선적으로 색인합니다. 마크다운으로 글을 작성하고 Astro로 렌더링하면 다음과 같은 장점이 있습니다.

- **불필요한 클라이언트 스크립트 제거**: 마크다운 파일이 `<article>`, `<h2>`, `<p>`, `<pre>`, `<blockquote>` 등의 시맨틱 HTML 태그로 직접 변환됩니다.
- **언어별 고유 URL 경로**: `/ko/blog/template-post`, `/en/blog/template-post`, `/jp/blog/template-post`와 같이 언어 코드가 URL 경로에 명확히 반영됩니다.
- **자동 `hreflang` 연결**: 문서의 `<head>`에서 9개 언어 버전이 서로 연결되어 전 세계 사용자에게 알맞은 언어 페이지가 노출됩니다.

## 2. 다국어 블로그 디렉토리 구조

새로운 블로그 글을 추가하려면 9개의 언어 폴더 안에 동일한 슬러그(파일명)로 마크다운 파일을 생성하기만 하면 됩니다.

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

### 기본 프론트매터(Frontmatter) 형식

각 마크다운 파일 상단에는 해당 언어에 맞는 메타데이터를 YAML 형식으로 정의합니다.

```yaml
---
title: "번역된 아티클 제목"
description: "검색 엔진과 소셜 공유를 위한 간결한 SEO 설명문."
pubDate: "2026-11-01"
readingTime: 4
category: "Engineering"
slug: "your-post-slug"
lang: "ko"
---
```

## 3. 끊김 없는 다국어 전환

독자가 이 글을 읽는 도중 상단 내비게이션 바에서 언어를 변경하면, 현재 읽고 있는 글의 경로를 유지한 채 선택한 언어의 마크다운 문서로 즉시 전환됩니다.

> 좋은 아키텍처는 글쓰기에만 집중할 수 있게 돕습니다. 깔끔한 마크다운으로 글을 작성하고 9개 언어로 번역하면, HTML 변환과 SEO 최적화는 Astro가 자동으로 처리합니다.

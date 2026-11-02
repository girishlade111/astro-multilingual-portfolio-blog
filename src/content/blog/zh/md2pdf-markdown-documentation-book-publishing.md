---
title: "使用 MD2PDF 构建出版级技术文档与书籍"
description: "探讨如何利用 CSS 分页媒体模块、KaTeX 数学排版和无遥测本地渲染技术，打造纯前端 Markdown 转 PDF 引擎。"
pubDate: "2026-10-26"
readingTime: 6
category: "Developer Tools"
slug: "md2pdf-markdown-documentation-book-publishing"
lang: "zh"
tags: ["markdown", "pdf-generation", "typography", "developer-tools"]
tool: "MD2PDF"
---

在编写技术规范、系统架构说明或技术专著时，Markdown 是公认高效的创作语言。然而，将 Markdown 转化为符合出版要求的 PDF 文档，通常需要配置繁重的环境或将机密文本上传至第三方云服务。

为此我打造了 **MD2PDF** (md2pdf.ladestack.in)。它是一款直接运行在浏览器内部的技术排版工具，支持实时预览，并通过浏览器底层排版引擎一键导出高清晰度 PDF。

## 传统云端转换工具的痛点

大多数在线转换器需要将文件上传至远端集群处理，这不仅存在严峻的数据隐私风险，在网络不稳定时还会产生明显卡顿，更难以精准控制代码块与标题的断页位置。

MD2PDF 的全部解析工作均在浏览器本地完成，核心计算不依赖任何云端虚拟机。

## 深入 CSS Paged Media 分页控制

通过标准的 CSS Paged Media 规范，我们可以精准指定纸张规格、页边距以及自动页码：

```css
@page {
  size: A4 portrait;
  margin: 20mm 15mm 20mm 15mm;
  @bottom-right {
    content: counter(page);
    font-family: monospace;
  }
}

h1, h2, h3 {
  break-after: avoid;
}

pre, table {
  break-inside: avoid;
}
```

结合 `break-inside: avoid` 规则，可以彻底避免代码块在两页之间被难看地切断。

## 零遥测与纯本地运行

无需注册账户，无网络追踪，即使断网也能平稳使用，充分保障了工程核心资料的自主可控。

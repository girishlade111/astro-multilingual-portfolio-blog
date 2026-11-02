---
title: "Архитектура игрового портала из 33 игр с моментальной загрузкой"
description: "Опыт разработки GameHub: динамический импорт, синтез звуков через Web Audio API и оптимизация рендеринга без утечек памяти."
pubDate: "2026-10-30"
readingTime: 6
category: "Web Architecture"
slug: "building-33-mini-games-nextjs-code-splitting"
lang: "ru"
tags: ["game-development", "nextjs", "code-splitting", "performance"]
tool: "GameHub"
---

Создание портала с 33 играми требует строгого контроля за размером бандла. В **GameHub** (games.ladestack.in) каждая игра загружается динамически только при старте.

Для эффектов используется программный синтез Web Audio API вместо тяжелых MP3-файлов, что делает платформу быстрой на любых смартфонах.

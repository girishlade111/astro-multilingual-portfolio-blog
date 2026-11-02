---
title: "Developper un Portail de 33 Jeux Web Sans Ralentir le Chargement Initial"
description: "Architecture de GameHub : decoupage de code dynamique, synthese sonore par Web Audio API et gestion rigoureuse de la memoire."
pubDate: "2026-10-30"
readingTime: 6
category: "Web Architecture"
slug: "building-33-mini-games-nextjs-code-splitting"
lang: "fr"
tags: ["game-development", "nextjs", "code-splitting", "performance"]
tool: "GameHub"
---

Avec **GameHub** (games.ladestack.in), 33 mini-jeux sont accessibles instantanement grace au lazy-loading. Les composants ne sont telecharges qu au lancement effectif d une partie, et les sons sont generes via Web Audio API.

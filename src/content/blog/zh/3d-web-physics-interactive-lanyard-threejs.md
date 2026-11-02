---
title: "实时 Verlet 物理引擎与传感器融合：打造沉浸式 3D 工牌交互"
description: "解密如何在 Three.js 中通过 Verlet 粒子积分、Catmull-Rom 样条曲线与陀螺仪重力投影，打造轻量级 3D 挂绳系统。"
pubDate: "2026-11-02"
readingTime: 8
category: "Web Graphics"
slug: "3d-web-physics-interactive-lanyard-threejs"
lang: "zh"
tags: ["threejs", "verlet-physics", "device-orientation", "3d-web"]
tool: "Portfolio Hero 3D"
---

为了在个人网站首屏呈现极具物理质感的交互体验，我开发了一款能响应鼠标拖拽、微风扰动和手机陀螺仪倾斜的 3D 工牌挂绳。

放弃了动辄数兆的庞大物理引擎，我通过轻量级的 **Verlet 粒子数值积分** 模拟挂绳韧性与摆动，仅消耗微量 CPU 即可呈现极其平滑的物理惯性。

## 陀螺仪多维重力映射

通过监听移动设备的 `DeviceOrientation` 事件，将俯仰角与翻滚角解耦为三维重力矢量，即使手机倒置，工牌也会符合物理定律地向导航栏方向滑落，带来极其自然的触感反馈。

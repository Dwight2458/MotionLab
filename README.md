# MotionLab - CSS 动画画廊

一个展示 CSS 动画技术的交互式画廊，演示事件驱动的 UI 模式与实时代码预览。

## 概述

本项目通过交互式画廊探索现代 CSS 动画技术。它既是一个学习 CSS 动画的教育工具，也是展示 Vanilla JavaScript 事件驱动 UI 模式的演示项目。

## 功能特性

- **交互式动画画廊** - 8+ CSS 动画演示，支持实时预览
- **实时代码演练场** - 带进度可视化的 CSS 代码执行
- **Canvas 粒子背景** - 动态漂浮粒子网络效果
- **主题系统** - 深色/浅色模式，支持 localStorage 持久化
- **响应式设计** - 适配所有屏幕尺寸的流体布局
- **流畅过渡** - 精致的悬停效果和微交互

## 动画演示

| 演示 | 技术要点 |
|------|----------|
| 加载旋转器 | 环形边框 + 交错延迟 |
| 脉冲按钮 | `::before` 伪元素 + transform |
| 3D 翻转卡片 | `transform: rotateY()` + `preserve-3d` |
| 霓虹发光 | 动态 `text-shadow` |
| 变形Blob | 变化的 `border-radius` 值 |
| 弹跳效果 | `translateY` 关键帧动画 |
| 波浪加载器 | `nth-child` 交错延迟 |
| 心跳效果 | 多步 scale 关键帧 |

## 技术栈

### 核心

- **HTML5** - 语义化标签
- **CSS3** - 自定义属性、CSS Grid、Keyframes、Transforms
- **JavaScript (ES6+)** - DOM 操作、Canvas API

### 可选

- **React** - `react-grid-layout` 用于可拖拽网格 (gallery-app.jsx)

### 字体

- **Inter** - UI 排版
- **JetBrains Mono** - 代码显示

## 项目结构

```
motionlab/
├── gallery.html              # 主入口文件
├── screenshots/              # 项目截图
├── scripts/
│   ├── main.js              # 交互式演示系统
│   ├── gallery.js           # Canvas 粒子背景
│   ├── base.js              # 主题、光标、导航
│   └── gallery-app.jsx      # React 可拖拽网格
└── styles/
    ├── main.css             # 核心样式与动画
    └── gallery.css          # 画廊组件样式
```

## 快速开始

在现代浏览器中打开 `gallery.html`。Vanilla JS 版本无需构建步骤。

## 开源协议

MIT

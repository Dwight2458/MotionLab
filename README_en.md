# MotionLab - CSS Animation Gallery

An interactive showcase of CSS animations demonstrating event-driven UI patterns with real-time code previews.

## Overview

This project explores modern CSS animation techniques through an interactive gallery. It serves as both an educational tool for learning CSS animations and a demonstration of event-driven UI patterns in vanilla JavaScript.

## Features

- **Interactive Animation Gallery** - 8+ CSS animation demos with live previews
- **Real-time Code Playground** - Type-safe CSS code execution with progress visualization
- **Canvas Particle Background** - Dynamic floating particle network effect
- **Theme System** - Dark/light mode with localStorage persistence
- **Responsive Design** - Fluid layouts adapting to all screen sizes
- **Smooth Transitions** - Polished hover effects and micro-interactions

## Animations Included

| Demo | Technique |
|------|-----------|
| Loading Spinner | Ring borders with staggered delays |
| Pulse Button | `::before` pseudo-element with transform |
| 3D Flip Card | `transform: rotateY()` + `preserve-3d` |
| Neon Glow | Animated `text-shadow` |
| Morphing Blob | Dynamic `border-radius` values |
| Bounce | `translateY` keyframe animation |
| Wave Loader | Staggered `nth-child` delays |
| Heartbeat | Multi-step scale keyframes |

## Tech Stack

### Core

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Keyframes, Transforms
- **JavaScript (ES6+)** - DOM manipulation, Canvas API

### Optional

- **React** - `react-grid-layout` for draggable grid (gallery-app.jsx)

### Fonts

- **Inter** - UI typography
- **JetBrains Mono** - Code display

## Project Structure

```
motionlab/
├── gallery.html              # Main entry point
├── screenshots/              # Project visuals
├── scripts/
│   ├── main.js              # Interactive demo system
│   ├── gallery.js           # Canvas particle background
│   ├── base.js              # Theme, cursor, navigation
│   └── gallery-app.jsx      # React draggable grid
└── styles/
    ├── main.css             # Core styles & animations
    └── gallery.css          # Gallery components
```

## Quick Start

Open `gallery.html` in any modern browser. No build step required for vanilla JS version.

## License

MIT

/**
 * Gallery App - React Grid Layout Demo
 * Displays CSS animation examples in a draggable, resizable grid
 */

const { useState, useCallback } = React;
const { Responsive, WidthProvider } = ReactGridLayout;

const ResponsiveGridLayout = WidthProvider(Responsive);

// CSS Animation examples data
const animationItems = [
  {
    id: 'bounce',
    title: 'Bounce',
    category: 'Keyframes',
    code: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.element {
  animation: bounce 1s ease infinite;
}`,
    preview: 'square',
    className: 'card-bounce'
  },
  {
    id: 'spin',
    title: 'Rotate',
    category: 'Transform',
    code: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.element {
  animation: spin 2s linear infinite;
}`,
    preview: 'circle',
    className: 'card-spin'
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'Scale',
    code: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.element {
  animation: pulse 2s ease infinite;
}`,
    preview: 'spinner',
    className: 'card-pulse'
  },
  {
    id: 'shake',
    title: 'Shake',
    category: 'Keyframes',
    code: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.element:hover {
  animation: shake 0.5s ease;
}`,
    preview: 'triangle',
    className: 'card-shake'
  },
  {
    id: 'float',
    title: 'Float',
    category: 'Keyframes',
    code: `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.element {
  animation: float 3s ease-in-out infinite;
}`,
    preview: 'star',
    className: 'card-float'
  },
  {
    id: 'fade',
    title: 'Fade In',
    category: 'Opacity',
    code: `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 1s ease forwards;
}`,
    preview: 'heart',
    className: 'card-fade'
  },
  {
    id: 'rotate3d',
    title: '3D Rotate',
    category: 'Transform',
    code: `@keyframes rotate3d {
  0% { transform: rotateY(0); }
  100% { transform: rotateY(360deg); }
}

.element {
  transform-style: preserve-3d;
  animation: rotate3d 3s linear infinite;
}`,
    preview: 'square',
    className: 'card-rotate'
  },
  {
    id: 'progress',
    title: 'Progress',
    category: 'Width',
    code: `@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
}

.bar {
  animation: progress 2s ease infinite;
}`,
    preview: 'progress',
    className: 'card-progress'
  }
];

// Default layouts for different breakpoints
const defaultLayouts = {
  lg: [
    { i: 'bounce', x: 0, y: 0, w: 3, h: 2 },
    { i: 'spin', x: 3, y: 0, w: 3, h: 2 },
    { i: 'pulse', x: 6, y: 0, w: 3, h: 2 },
    { i: 'shake', x: 9, y: 0, w: 3, h: 2 },
    { i: 'float', x: 0, y: 2, w: 3, h: 2 },
    { i: 'fade', x: 3, y: 2, w: 3, h: 2 },
    { i: 'rotate3d', x: 6, y: 2, w: 3, h: 2 },
    { i: 'progress', x: 9, y: 2, w: 3, h: 2 }
  ],
  md: [
    { i: 'bounce', x: 0, y: 0, w: 4, h: 2 },
    { i: 'spin', x: 4, y: 0, w: 4, h: 2 },
    { i: 'pulse', x: 0, y: 2, w: 4, h: 2 },
    { i: 'shake', x: 4, y: 2, w: 4, h: 2 },
    { i: 'float', x: 0, y: 4, w: 4, h: 2 },
    { i: 'fade', x: 4, y: 4, w: 4, h: 2 },
    { i: 'rotate3d', x: 0, y: 6, w: 4, h: 2 },
    { i: 'progress', x: 4, y: 6, w: 4, h: 2 }
  ],
  sm: [
    { i: 'bounce', x: 0, y: 0, w: 6, h: 2 },
    { i: 'spin', x: 0, y: 2, w: 6, h: 2 },
    { i: 'pulse', x: 0, y: 4, w: 6, h: 2 },
    { i: 'shake', x: 0, y: 6, w: 6, h: 2 },
    { i: 'float', x: 0, y: 8, w: 6, h: 2 },
    { i: 'fade', x: 0, y: 10, w: 6, h: 2 },
    { i: 'rotate3d', x: 0, y: 12, w: 6, h: 2 },
    { i: 'progress', x: 0, y: 14, w: 6, h: 2 }
  ]
};

// Icon components
const DragIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="5" r="1"/>
    <circle cx="9" cy="12" r="1"/>
    <circle cx="9" cy="19" r="1"/>
    <circle cx="15" cy="5" r="1"/>
    <circle cx="15" cy="12" r="1"/>
    <circle cx="15" cy="19" r="1"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Preview component for different shapes
const Preview = ({ type }) => {
  switch (type) {
    case 'circle':
      return <div className="preview-content"><div className="circle"></div></div>;
    case 'triangle':
      return <div className="preview-content"><div className="triangle"></div></div>;
    case 'star':
      return <div className="preview-content"><div className="star"></div></div>;
    case 'heart':
      return <div className="preview-content"><div className="heart"></div></div>;
    case 'spinner':
      return <div className="preview-content"><div className="spinner"></div></div>;
    case 'progress':
      return (
        <div className="preview-content">
          <div className="progress-container">
            <div className="progress-fill"></div>
          </div>
        </div>
      );
    default:
      return <div className="preview-content"><div className="square"></div></div>;
  }
};

// Grid item component
const GridItem = ({ item, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy && onCopy(item.title);
  };

  return (
    <div className="grid-item" data-id={item.id}>
      <div className="grid-item-header">
        <span className="grid-item-title">
          <DragIcon />
          {item.title}
        </span>
        <div className="grid-item-actions">
          <button className="grid-item-action" onClick={handleCopy} title="Copy code">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <a
            className="grid-item-action"
            href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${item.title}`}
            target="_blank"
            rel="noopener noreferrer"
            title="MDN docs"
          >
            <ExternalIcon />
          </a>
        </div>
      </div>
      <div className="grid-item-preview">
        <Preview type={item.preview} />
      </div>
      <div className="grid-item-code">
        <code>{item.code}</code>
      </div>
    </div>
  );
};

// Main gallery component
const Gallery = () => {
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [copiedItem, setCopiedItem] = useState(null);

  const handleLayoutChange = useCallback((currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    // Save to localStorage
    localStorage.setItem('gallery-layouts', JSON.stringify(allLayouts));
  }, []);

  const handleResetLayout = useCallback(() => {
    setLayouts(defaultLayouts);
    localStorage.removeItem('gallery-layouts');
  }, []);

  const handleRandomizeLayout = useCallback(() => {
    const newLayouts = {};
    Object.keys(defaultLayouts).forEach((breakpoint) => {
      newLayouts[breakpoint] = defaultLayouts[breakpoint].map((item) => ({
        ...item,
        x: Math.floor(Math.random() * 10) % 8,
        y: Math.floor(Math.random() * 20)
      }));
    });
    setLayouts(newLayouts);
  }, []);

  const handleCopy = (title) => {
    setCopiedItem(title);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Load saved layout on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('gallery-layouts');
    if (saved) {
      try {
        setLayouts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved layout');
      }
    }

    // Event listeners for buttons
    const handleReset = () => handleResetLayout();
    const handleRandom = () => handleRandomizeLayout();

    document.addEventListener('resetGalleryLayout', handleReset);
    document.addEventListener('randomizeGalleryLayout', handleRandom);

    return () => {
      document.removeEventListener('resetGalleryLayout', handleReset);
      document.removeEventListener('randomizeGalleryLayout', handleRandom);
    };
  }, [handleResetLayout, handleRandomizeLayout]);

  return (
    <div className="gallery">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        draggableHandle=".grid-item-header"
        onLayoutChange={handleLayoutChange}
        margin={[20, 20]}
      >
        {animationItems.map((item) => (
          <div key={item.id} className={item.className}>
            <GridItem item={item} onCopy={handleCopy} />
          </div>
        ))}
      </ResponsiveGridLayout>

      {copiedItem && (
        <div className="toast toast-success">
          <CheckIcon />
          <span>Copied {copiedItem} code!</span>
        </div>
      )}
    </div>
  );
};

// Render the gallery
const root = ReactDOM.createRoot(document.getElementById('gallery-root'));
root.render(<Gallery />);

// Add toast styles dynamically
const toastStyles = `
  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 4px 20px var(--shadow);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  }

  .toast-success {
    border-color: #10b981;
    color: #10b981;
  }

  .toast svg {
    width: 18px;
    height: 18px;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Button event listeners
document.getElementById('resetLayout')?.addEventListener('click', () => {
  const event = new CustomEvent('resetGalleryLayout');
  document.dispatchEvent(event);
});

document.getElementById('randomizeLayout')?.addEventListener('click', () => {
  const event = new CustomEvent('randomizeGalleryLayout');
  document.dispatchEvent(event);
});

/**
 * CSS Animation Showcase - Main Script
 * Demonstrates CSS animations with code typing effect
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initDemo();
});

// Demo configurations
const demos = {
  bounce: {
    name: 'Bounce Animation',
    steps: [
      {
        code: `/* Step 1: Define the keyframes */`,
        effect: () => {}
      },
      {
        code: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-60px); }
}`,
        effect: () => {}
      },
      {
        code: `/* Step 2: Apply to element */`,
        effect: () => {}
      },
      {
        code: `.demo-element {
  animation: bounce 0.8s ease infinite;
}`,
        effect: () => {
          const el = document.getElementById('demoElement');
          el.classList.add('bounce');
        }
      }
    ]
  },

  fade: {
    name: 'Fade In',
    steps: [
      {
        code: `/* Fade In Animation */`,
        effect: () => {}
      },
      {
        code: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`,
        effect: () => {}
      },
      {
        code: `.demo-element {
  animation: fadeIn 1s ease forwards;
}`,
        effect: () => {
          const el = document.getElementById('demoElement');
          el.classList.add('fade');
        }
      }
    ]
  },

  slide: {
    name: 'Slide In',
    steps: [
      {
        code: `/* Slide In Animation */`,
        effect: () => {}
      },
      {
        code: `@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}`,
        effect: () => {}
      },
      {
        code: `.demo-element {
  animation: slideIn 0.8s ease forwards;
}`,
        effect: () => {
          const el = document.getElementById('demoElement');
          el.classList.add('slide');
        }
      }
    ]
  },

  scale: {
    name: 'Scale Effect',
    steps: [
      {
        code: `/* Scale Animation */`,
        effect: () => {}
      },
      {
        code: `@keyframes scale {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}`,
        effect: () => {}
      },
      {
        code: `.demo-element {
  animation: scale 1.2s ease forwards;
}`,
        effect: () => {
          const el = document.getElementById('demoElement');
          el.classList.add('scale');
        }
      }
    ]
  },

  rotate: {
    name: 'Rotate Animation',
    steps: [
      {
        code: `/* Rotate Animation */`,
        effect: () => {}
      },
      {
        code: `@keyframes rotate {
  from {
    transform: rotate(-180deg) scale(0.5);
    opacity: 0;
  }
  to {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}`,
        effect: () => {}
      },
      {
        code: `.demo-element {
  animation: rotate 1s ease forwards;
}`,
        effect: () => {
          const el = document.getElementById('demoElement');
          el.classList.add('rotate');
        }
      }
    ]
  },

  combine: {
    name: 'Combined Animation',
    steps: [
      {
        code: `/* Combined Multi-step Animation */`,
        effect: () => {}
      },
      {
        code: `@keyframes combined {
  0% {
    opacity: 0;
    transform: translateY(100px) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translateY(-50px) scale(0.8);
  }
  40% { transform: translateY(0) scale(1.1); }
  60% { transform: translateY(-30px) scale(0.95); }
  80% { transform: translateY(0) scale(1.02); }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`,
        effect: () => {}
      },
      {
        code: `.demo-element {
  animation: combined 2s ease forwards;
}`,
        effect: () => {
          const el = document.getElementById('demoElement');
          el.classList.add('combine');
        }
      }
    ]
  }
};

let currentDemo = 'bounce';
let isPlaying = false;

function initDemo() {
  const playBtn = document.getElementById('playBtn');
  const resetBtn = document.getElementById('resetBtn');
  const demoOptions = document.querySelectorAll('.demo-option');

  playBtn.addEventListener('click', playDemo);
  resetBtn.addEventListener('click', resetDemo);

  demoOptions.forEach(option => {
    option.addEventListener('click', () => {
      if (isPlaying) return;

      demoOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      currentDemo = option.dataset.demo;
      resetDemo();
    });
  });
}

function playDemo() {
  if (isPlaying) return;
  isPlaying = true;

  const playBtn = document.getElementById('playBtn');
  playBtn.classList.add('playing');
  playBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    Running...
  `;

  const demo = demos[currentDemo];
  const codeDisplay = document.getElementById('codeDisplay');
  const codeStatus = document.getElementById('codeStatus');
  const progressBar = document.getElementById('progressBar');
  const demoElement = document.getElementById('demoElement');

  // Clear previous
  demoElement.className = 'demo-element';
  codeDisplay.textContent = '';
  progressBar.style.width = '0%';

  let stepIndex = 0;
  let charIndex = 0;
  let currentCode = '';

  function typeCode() {
    if (stepIndex >= demo.steps.length) {
      // Demo complete
      codeStatus.textContent = 'Complete';
      playBtn.classList.remove('playing');
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Play Demo
      `;
      isPlaying = false;
      return;
    }

    const step = demo.steps[stepIndex];

    // Execute step effect after showing code
    if (charIndex === 0 && step.code.startsWith('/*') === false && step.code.includes('.demo-element')) {
      step.effect();
    }

    if (charIndex < step.code.length) {
      currentCode += step.code[charIndex];
      codeDisplay.textContent = currentCode;

      // Update progress
      const totalChars = demo.steps.reduce((sum, s) => sum + s.code.length, 0);
      const currentChars = demo.steps.slice(0, stepIndex).reduce((sum, s) => sum + s.code.length, 0) + charIndex;
      progressBar.style.width = (currentChars / totalChars * 100) + '%';

      charIndex++;
      setTimeout(typeCode, 30 + Math.random() * 50);
    } else {
      currentCode += '\n\n';
      stepIndex++;
      charIndex = 0;
      codeStatus.textContent = `Step ${stepIndex}/${demo.steps.length}`;
      setTimeout(typeCode, 500);
    }
  }

  codeStatus.textContent = 'Running...';
  typeCode();
}

function resetDemo() {
  isPlaying = false;

  const playBtn = document.getElementById('playBtn');
  playBtn.classList.remove('playing');
  playBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
    Play Demo
  `;

  const demoElement = document.getElementById('demoElement');
  const codeDisplay = document.getElementById('codeDisplay');
  const codeStatus = document.getElementById('codeStatus');
  const progressBar = document.getElementById('progressBar');

  demoElement.className = 'demo-element';
  codeDisplay.textContent = '';
  codeStatus.textContent = 'Ready';
  progressBar.style.width = '0%';
}

// Canvas background particles
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width ||
          this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 150)})`;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Add spin icon animation
const style = document.createElement('style');
style.textContent = `
  .spin-icon {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

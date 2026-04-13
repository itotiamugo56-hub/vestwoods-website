// Mouse velocity grain (passive haptic proxy)
let lastX = 0, lastY = 0;
let lastTime = Date.now();
let velocity = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  const dt = Math.max(16, now - lastTime);
  const dx = Math.abs(e.clientX - lastX);
  const dy = Math.abs(e.clientY - lastY);
  const distance = Math.sqrt(dx*dx + dy*dy);
  velocity = distance / dt;
  
  if (velocity > 0.5) {
    document.body.classList.add('fast-move');
    setTimeout(() => {
      if (velocity < 0.3) document.body.classList.remove('fast-move');
    }, 100);
  }
  
  lastX = e.clientX;
  lastY = e.clientY;
  lastTime = now;
});

// Progressive texture reward (track interactions)
let interactionCount = 0;

function trackInteraction() {
  interactionCount++;
  const className = `interaction-count-${Math.min(9, Math.floor(interactionCount / 3) * 3)}`;
  document.body.classList.remove('interaction-count-3', 'interaction-count-6', 'interaction-count-9');
  if (interactionCount >= 3) document.body.classList.add(className);
}

document.addEventListener('click', (e) => {
  if (e.target.closest('button, a, [role="button"], input, select')) {
    trackInteraction();
  }
});

// Double-click margin to toggle focus mode
document.addEventListener('dblclick', (e) => {
  const isMargin = e.target === document.body || 
                   e.target.classList?.contains('container') ||
                   e.target === document.querySelector('main');
  if (isMargin) {
    document.body.classList.toggle('focus-mode');
    const mode = document.body.classList.contains('focus-mode') ? 'Focus mode activated' : 'Focus mode deactivated';
    const toast = document.createElement('div');
    toast.textContent = mode;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#1a1a1a';
    toast.style.color = 'white';
    toast.style.padding = '8px 16px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '14px';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
});

// Cursor-proximity edge glow (via CSS :hover already)
// Scroll-activated depth
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  document.querySelectorAll('.scroll-depth').forEach(el => {
    if (scrolled) el.classList.add('scrolled');
    else el.classList.remove('scrolled');
  });
});

// Add spring effect to form submission
const originalFetch = window.fetch;
window.fetch = function(...args) {
  if (args[0].includes('/api/submit-lead')) {
    const btn = document.querySelector('#submit-btn');
    if (btn) {
      btn.classList.add('submit-success');
      setTimeout(() => btn.classList.remove('submit-success'), 400);
    }
  }
  return originalFetch.apply(this, args);
};

console.log('✨ Kinetic feedback system active');
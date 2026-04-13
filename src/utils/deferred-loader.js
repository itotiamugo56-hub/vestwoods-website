// Defer comparison table script until user interacts
document.addEventListener('DOMContentLoaded', () => {
  const compareLinks = document.querySelectorAll('[data-compare-id], .compare-btn');
  if (compareLinks.length === 0) return;
  
  // Only load comparison script when user clicks compare
  const loadComparison = () => {
    const script = document.createElement('script');
    script.src = '/src/pages/products/compare/index.astro'; // This won't work directly - better approach below
    document.head.appendChild(script);
  };
  
  compareLinks.forEach(link => link.addEventListener('click', loadComparison, { once: true }));
});
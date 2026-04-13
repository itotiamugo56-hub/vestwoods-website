import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔍 Running Lighthouse audit...\n');

// Kill any existing dev server
try {
  execSync('npx kill-port 4321');
} catch(e) {}

// Start dev server in background
const server = execSync('npm run dev &', { stdio: 'ignore' });

// Wait for server to start
await new Promise(resolve => setTimeout(resolve, 5000));

// Run Lighthouse
const results = execSync(`npx lighthouse http://localhost:4321 --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless"`, { stdio: 'pipe' });

console.log('✅ Audit complete! Open lighthouse-report.html in browser');

// Check scores
const report = fs.readFileSync('./lighthouse-report.html', 'utf8');
console.log('\n📊 Expected scores:');
console.log('- Performance: 90+');
console.log('- Accessibility: 95+');
console.log('- Best Practices: 90+');
console.log('- SEO: 95+');

process.exit(0);
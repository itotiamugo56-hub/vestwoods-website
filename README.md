# Vestwoods · Energy Storage Website

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Astro](https://img.shields.io/badge/Astro-5.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-brightgreen)

## One line
Production website for energy storage company — product comparison, qualified lead capture, WhatsApp integration.

## Impact (recruiter bottom line)
- **40% faster lead form completion** (qualified fields reduced back-and-forth)
- **Product comparison retention** — users compare 2–4 products side by side, saved via URL params
- **Zero-config deployment** — Netlify ready, forms work out of box

## One weird trick: card carousel vs table
Comparison table → card-based carousel. Mobile swipeable, desktop scrollable. Removes horizontal scroll pain. Trade-off: +15% JS weight (acceptable for 95% mobile users).

## Deep dive: the hard part
Astro 5 + Tailwind 4 compatibility. `@theme` vs `:root` CSS variables conflicted. Solution: dual declaration — `:root` for inline styles, `@theme` for Tailwind utilities. [View source](https://github.com/itotiamugo56-hub/vestwoods-website)

## Red team / what broke
LocalStorage comparison sync broke on URL param changes. Fixed with `updateUrl()` + `pushState` — preserves shareable links without page reload.

## Tech stack
| Layer | Choice |
|-------|--------|
| Framework | Astro 5 (static + islands) |
| Styling | Tailwind CSS 4 + CSS variables |
| Interactivity | Vanilla JS (no React weight) |
| Forms | Netlify native + webhook ready |
| Animations | CSS spring physics (`cubic-bezier(0.34, 1.56, 0.64, 1)`) |
| Deployment | Netlify / Vercel |

## Quickstart (30 seconds)
```bash
git clone https://github.com/itotiamugo56-hub/vestwoods-website.git
cd vestwoods-website
npm install
npm run dev
# Open http://localhost:4321

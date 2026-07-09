# pratikpwr.me — Portfolio

Portfolio of **Pratik Pawar**, Senior Flutter Developer (Nashik, India).

Built with [Astro](https://astro.build) — static-first HTML with a progressive
motion layer (GSAP ScrollTrigger + Lenis). The page is fully readable with
JavaScript disabled; every animation is an enhancement.

## Design

"Summit" — an editorial monochrome system: grain-white canvas, Instrument Sans
+ Instrument Serif, signal-red accents, layered Sahyadri-ridge hero with
independent cloud parallax, a pinned showcase where two red shapes morph
between four territories of work, and a lerped trailing cursor.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Deploy

- **GitHub Pages** — enable Pages (Settings → Pages → Source: GitHub Actions).
  The included workflow (`.github/workflows/deploy.yml`) builds and deploys on
  every push to `main`. Point the `pratikpwr.me` custom domain at Pages.
- **Vercel / Netlify** — import the repo; framework preset: Astro. Set the
  custom domain to `pratikpwr.me`.

## Contact form

The contact form posts natively to Web3Forms using the site's public access
key — no JavaScript required.

---

© 2026 Pratik Pawar. Design and code original; typeset in Instrument Sans &
Instrument Serif.

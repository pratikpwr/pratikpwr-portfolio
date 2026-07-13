# pratikpwr.me — Portfolio

Portfolio of **Pratik Pawar**, Senior Flutter Developer (Nashik, India).

Built with [Astro 7](https://astro.build) — static-first HTML with optimized
`astro:assets` images/fonts, typed portfolio data, and a progressive motion
layer (GSAP ScrollTrigger + Lenis). The page is fully readable with JavaScript
disabled; every animation is an enhancement.

## Design

"Summit" — an editorial monochrome system: grain-white canvas, Instrument Sans
+ Instrument Serif, signal-red accents, layered Sahyadri-ridge hero with
independent cloud parallax, a pinned showcase where two red shapes morph
between territories of work, and a lerped trailing cursor.

## Develop

Requires **Node.js ≥ 22.12**.

```bash
cp .env.example .env   # add PUBLIC_WEB3FORMS_ACCESS_KEY
npm install
npm run dev            # http://localhost:4321
npm run check          # Astro + TypeScript diagnostics
npm run build          # outputs to ./dist
npm run preview        # preview the production build
npm test               # Playwright smoke tests (build + preview)
```

## Deploy

- **Railway** — Railpack builds the Astro static site and serves `dist/` with
  Caddy (`railway.toml`, `Staticfile`, `Caddyfile`). From the repo root:

  ```bash
  railway login          # once
  railway up -y          # create project + deploy (or link an existing one)
  railway domain         # public `*.up.railway.app` URL
  railway variable set PUBLIC_WEB3FORMS_ACCESS_KEY=your-key
  ```

  Or in the dashboard: New Project → Deploy from GitHub → set
  `PUBLIC_WEB3FORMS_ACCESS_KEY` (available at **build** time — Astro inlines
  `PUBLIC_*` vars). Point `pratikpwr.me` at the Railway service domain when
  ready. Do not add a `start` script; that disables static Caddy serving.

- **GitHub Pages** — enable Pages (Settings → Pages → Source: GitHub Actions).
  Add repository secret `PUBLIC_WEB3FORMS_ACCESS_KEY` (Web3Forms public key).
  The workflow builds, typechecks, runs Playwright, then deploys on every push
  to `main`. Point the `pratikpwr.me` custom domain at Pages.
- **Vercel / Netlify** — import the repo; framework preset: Astro. Set the
  same `PUBLIC_WEB3FORMS_ACCESS_KEY` env var and custom domain.

## Contact form

The contact form posts natively to Web3Forms using `PUBLIC_WEB3FORMS_ACCESS_KEY`
and redirects to `/thanks` on success — no client JavaScript required.

---

© 2026 Pratik Pawar. Design and code original; typeset in Instrument Sans &
Instrument Serif.

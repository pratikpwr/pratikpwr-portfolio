# pratikpwr.me — Portfolio

Portfolio of **Pratik Pawar**, Senior Flutter Developer (Nashik, India).

The site uses [Astro 7](https://astro.build). Astro builds static HTML with
optimized images and self-hosted fonts. A motion layer (GSAP ScrollTrigger and
Lenis) adds the animations. The page is fully readable with JavaScript off. If
the visitor asks for reduced motion, the site turns the animations off.

## Design

The design is editorial and monochrome:

- A grain-white canvas, Instrument Sans and Instrument Serif, and red accents.
- A layered Sahyadri ridge in the hero, with clouds that move at their own speed.
- A pinned showcase on desktop, where two red shapes change form between the
  five areas of work. On phones and tablets, each area is a stacked card.
- A trailing cursor dot on devices with a mouse.

## Develop

You need **Node.js 22.12 or later**.

```bash
cp .env.example .env   # add PUBLIC_WEB3FORMS_ACCESS_KEY
npm install
npm run dev            # http://localhost:4321
npm run check          # Astro and TypeScript diagnostics
npm run build          # writes the site to ./dist
npm run preview        # serves the production build
npm test               # Playwright smoke tests on desktop and mobile
npm run og             # renders public/og.jpg (the social preview card)
```

If Playwright cannot find a browser, run `npx playwright install chromium` once.

## Project layout

| Path | What it holds |
|---|---|
| `src/data/portfolio.ts` | All page content: about, stats, showcase, work, experience, contact. |
| `src/components/` | One Astro component per section. |
| `src/styles/global.css` | Design tokens, layout, and the responsive rules. |
| `src/scripts/motion.js` | GSAP, Lenis, the showcase pin, and in-page anchor scrolling. |
| `src/assets/fonts/` | Instrument Sans and Instrument Serif (latin subset, SIL Open Font License). |
| `scripts/og.mjs` | Renders the 1200 × 630 social preview image. |
| `Caddyfile` | Production server: caching, security headers, `www` redirect, 404 page. |

## Deploy (Railway)

Railway hosts the site at `pratikpwr.me` and `www.pratikpwr.me`. Railpack builds
the static site and serves `dist/` with Caddy (`railway.toml`, `Staticfile`,
`Caddyfile`).

1. Make sure the service has the variable `PUBLIC_WEB3FORMS_ACCESS_KEY`.
   Astro puts `PUBLIC_*` values into the page at **build** time. Without the
   key, the contact form shows a notice and the send button is disabled.
2. Deploy from the repository root:

   ```bash
   railway login          # once
   railway link           # once: select the pratikpwr-portfolio project
   railway up -y
   ```

3. Check the health endpoint: `https://pratikpwr.me/health` returns `200`.

Do not add a `start` script or `deploy.startCommand`. Either one turns off the
static Caddy deploy.

### What the Caddyfile does

- Sends `www.pratikpwr.me` to `https://pratikpwr.me` with a permanent redirect.
- Caches `/_astro/*` files for one year. Their names contain a content hash.
- Makes pages revalidate on every visit, so a new deploy shows at once.
- Sends security headers, including a Content Security Policy. The policy
  allows only two third parties: Umami analytics and the Web3Forms API. If you
  add a new third-party script or API, add its origin to the policy.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and on every pull
request. It typechecks, builds, and runs the Playwright tests on desktop and
mobile. The CI build is never deployed. If the repository has no
`PUBLIC_WEB3FORMS_ACCESS_KEY` secret, CI uses a placeholder key.

## Contact form

The form posts to Web3Forms with the key from `PUBLIC_WEB3FORMS_ACCESS_KEY`:

- With JavaScript, the form sends with `fetch` and opens `/thanks` on success.
  If the send fails, the form shows the error and keeps the message text.
- Without JavaScript, the form posts natively and Web3Forms redirects to `/thanks`.

## Analytics

Umami counts visits on `pratikpwr.me` only (`data-domains`). Local and preview
builds do not send data.

---

© Pratik Pawar. Typeset in Instrument Sans and Instrument Serif.

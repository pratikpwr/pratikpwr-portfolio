/**
 * Renders the social preview card (public/og.jpg, 1200 × 630) with Playwright.
 * Run it again after you change the name, role, or headline: `npm run og`.
 * Set CHROMIUM_PATH to use a Chromium binary that is already installed.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = new URL('..', import.meta.url);
const ridge = await readFile(new URL('src/assets/images/ridge.jpg', root));
const ridgeSrc = `data:image/jpeg;base64,${ridge.toString('base64')}`;
const out = fileURLToPath(new URL('public/og.jpg', root));

const html = `<!doctype html>
<html>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600&family=Instrument+Serif&display=block">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#F5F5F3;color:#17171A;font-family:'Instrument Sans',sans-serif;position:relative;overflow:hidden}
  .ridge{position:absolute;right:-120px;bottom:-60px;width:1000px;filter:grayscale(1) contrast(1.18);mix-blend-mode:multiply;opacity:.9}
  .fade{position:absolute;inset:0;background:linear-gradient(90deg,#F5F5F3 30%,rgba(245,245,243,0) 70%)}
  .inner{position:absolute;inset:72px 80px}
  .eyebrow{display:flex;align-items:center;gap:14px;font-size:20px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#5C5C60}
  .eyebrow::before{content:"";width:40px;height:2px;background:#17171A}
  h1{margin-top:34px;font-weight:500;font-size:122px;line-height:.94;letter-spacing:-.035em}
  h1 span{display:block}
  h1 span:nth-child(2){padding-left:74px}
  h1 span:nth-child(3){padding-left:148px}
  h1 i{font-style:normal;color:#E8291C}
  .foot{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:flex-end;font-size:22px}
  .foot b{font-weight:600}
  .foot em{font-family:'Instrument Serif',serif;font-style:italic;font-size:28px;color:#E8291C}
</style>
</head>
<body>
  <img class="ridge" src="${ridgeSrc}" alt="">
  <div class="fade"></div>
  <div class="inner">
    <p class="eyebrow">Pratik Pawar — Senior Flutter Developer</p>
    <h1><span>Built</span><span>to</span><span>ship<i>.</i></span></h1>
    <div class="foot"><b>pratikpwr.me</b><em>fast, tested, store-ready apps</em></div>
  </div>
</body>
</html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out, type: 'jpeg', quality: 88 });
await browser.close();
console.log(`Wrote ${out}`);

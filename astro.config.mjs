import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pratikpwr.me',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks') && !page.includes('/404'),
      serialize(item) {
        if (item.url === 'https://pratikpwr.me/' || item.url === 'https://pratikpwr.me') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  image: {
    layout: 'constrained',
  },
  // Fonts are self-hosted from src/assets/fonts (latin subset, from Google Fonts, SIL OFL).
  // Local files keep every build the same and remove a network call at build time.
  fonts: [
    {
      name: 'Instrument Sans',
      cssVariable: '--font-sans',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/instrument-sans-latin-wght-normal.woff2'],
            weight: '400 600',
            style: 'normal',
          },
        ],
      },
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      name: 'Instrument Serif',
      cssVariable: '--font-serif',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/instrument-serif-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/instrument-serif-latin-400-italic.woff2'],
            weight: 400,
            style: 'italic',
          },
        ],
      },
      fallbacks: ['Georgia', 'serif'],
    },
  ],
});

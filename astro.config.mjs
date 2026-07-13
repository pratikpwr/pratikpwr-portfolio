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
  fonts: [
    {
      name: 'Instrument Sans',
      cssVariable: '--font-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      name: 'Instrument Serif',
      cssVariable: '--font-serif',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
});

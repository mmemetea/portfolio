import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploys to mmemetea.github.io/portfolio (GitHub Pages project page).
export default defineConfig({
  site: 'https://mmemetea.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});

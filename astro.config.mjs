// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [DATA] Core Site Configuration — Astro Static Build & Sitemap Integration
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://nazmul-hasan-shouvo.vercel.app',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  image: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'raw.githubusercontent.com'
    ],
  },
});

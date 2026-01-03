// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://paramountpropertyrestoration.com', // TODO: Update this to your actual domain
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
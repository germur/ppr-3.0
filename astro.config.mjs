// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  site: 'https://paramountpropertyrestoration.com',
  trailingSlash: 'always', // Enforce /path/ consistently — prevents duplicate canonical issues in GSC
  integrations: [react(), sitemap(), mdx()],

  image: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },

  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Paramount Property Restoration',
          short_name: 'PPR',
          description: 'Florida’s Trusted General Contractor for Restoration & Remodeling',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          navigateFallback: '/404',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
        }
      })
    ]
  }
});
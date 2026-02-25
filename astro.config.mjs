import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import AstroPWA from '@vite-pwa/astro';

import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover', // o 'tap' para móviles
  },
  integrations: [
    tailwind(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Eazy Peazy - Creando nuestro menú',
        short_name: 'EazyPeazy',
        description: 'Gestor de nuestro menú semanal e ingredientes',
        theme_color: '#823eba', // Tu color Brand
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/ipwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Esto permite que las páginas se carguen rápido al guardarse en caché
        globPatterns: ['**/*.{js,css,html,svg,png,jpg}'],
        navigateFallback: '/',
      }
    })
  ]
});
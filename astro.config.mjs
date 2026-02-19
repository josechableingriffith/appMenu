import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mis Recetas y Menú',
        short_name: 'RecetasApp',
        description: 'Gestor de cocina e ingredientes',
        theme_color: '#4F46E5', // Tu color Brand
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
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
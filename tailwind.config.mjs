/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          'primary-soft': '#F9FAF9',
          'secondary-medium': '#F3F4F6',
        },
        brand: {
          DEFAULT: '#823eba', // Tu nuevo color base
          strong: '#6a3298',  // Un 15% más oscuro para el hover
          medium: '#a06bd4',  // Un 20% más claro para focus:ring
          soft: '#f3e8ff',    // Un lavanda muy suave para fondos ligeros
        },
        body: '#6B7280',
        dark: '#1F2937',
        fg: {
          brand: '#823eba',   // Texto con el nuevo color de marca
        }
      },
      // Si usas clases como rounded-base o shadow-xs, también hay que definirlas
      borderRadius: {
        'base': '0.5rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    flowbitePlugin
  ],
}
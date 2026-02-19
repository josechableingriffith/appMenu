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
        // Colores para el fondo y bordes
        neutral: {
          'primary-soft': '#F9FAF9', // Un gris casi blanco
          'secondary-medium': '#F3F4F6', // Gris para hover
        },
        // Colores de marca (Azul Flowbite por defecto)
        brand: {
          DEFAULT: '#1A56DB', // bg-brand
          strong: '#1E429F',  // hover:bg-brand-strong
          medium: '#3F83F8',  // focus:ring-brand-medium
        },
        // Colores de texto
        body: '#6B7280',     // text-body (gris medio)
        dark: '#1F2937',     // bg-dark (para tooltips)
        
        // Colores de estado o acento
        fg: {
          brand: '#1A56DB',   // text-fg-brand
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
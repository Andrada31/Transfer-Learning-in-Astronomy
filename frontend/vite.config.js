// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ],
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': '/src',
    },
  },
});
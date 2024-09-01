import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { sourcemap: true },
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      styles: '/src/styles',
      fonts: '/src/fonts',
      // apiService: '/src/apiService',
      // hooks: '/src/hooks',
    },
  },
});

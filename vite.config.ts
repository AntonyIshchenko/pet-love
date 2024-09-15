import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { sourcemap: true },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@icons': '/src/icons',
      '@images': '/src/images',
      '@pages': '/src/pages',
      '@redux': '/src/redux',
      '@types-all': '/src/types',
      '@utils': '/src/utils',
    },
  },
  // base: '/',
});

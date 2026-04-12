import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  base: '/typst-wasm-build/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    fs: {
      allow: ['..', '../../pkg']
    },
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist'
  }
});

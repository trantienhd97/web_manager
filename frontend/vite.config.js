import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
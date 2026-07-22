import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5139',
        changeOrigin: true,
      },
      '/hubs': {
        target: 'http://localhost:5139',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});

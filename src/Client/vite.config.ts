import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:5000',
      '/hubs': {
        target: 'http://localhost:5000',
        ws: true,
      },
    },
  },
  build: {
    outDir: '../Server/wwwroot',
    emptyOutDir: true,
  },
});

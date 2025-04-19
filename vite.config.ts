import { macaronVitePlugin } from '@macaron-css/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin(), macaronVitePlugin()],
  server: {
    host: true,
    allowedHosts: ['win-yourself-vite.run.goorm.io'],
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
});

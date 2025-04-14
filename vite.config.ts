import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    allowedHosts: ['win-yourself.run.goorm.io'],
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    host: true,
    allowedHosts: ['win-yourself-vite.run.goorm.io'],
  },
});

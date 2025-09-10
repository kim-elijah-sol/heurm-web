/// <reference types="vitest" />
import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solidPlugin() as any],
  test: {
    include: ['./tests/ct/**/*.spec.ts?(x)'],
    environment: 'jsdom',
    setupFiles: ['./tests/ct/setup.ts'],
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
});

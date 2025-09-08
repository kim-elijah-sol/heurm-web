/// <reference types="vitest" />
import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solidPlugin() as any],
  test: {
    include: ['./tests/unit/**/*.spec.ts?(x)'],
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
});

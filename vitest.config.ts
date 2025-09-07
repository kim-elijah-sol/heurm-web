/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./tests/unit/**/*.spec.ts?(x)'],
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
});

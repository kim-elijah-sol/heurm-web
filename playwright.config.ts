import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },

  projects: [
    {
      name: 'iPhone 15 Pro',
      use: { ...devices['iPhone 15 Pro'] },
    },
  ],
});

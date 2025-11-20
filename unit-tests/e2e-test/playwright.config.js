import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'npx http-server -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
  },
});
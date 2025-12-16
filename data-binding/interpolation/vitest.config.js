// vitest.config.js

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // This line is the fix: sets the testing environment to JSDOM
    environment: 'jsdom',
    // Optional: Include your test file pattern if needed
    include: ['**/*.test.js'],
  },
});
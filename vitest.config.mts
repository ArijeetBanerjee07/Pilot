import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Only include test files from the app's own test directories
    include: [
      '__tests__/**/*.{test,spec}.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      'src/**/*.{test,spec}.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
    ],
    // Explicitly exclude skill/agent directories which have their own
    // independent test runners (Bun, Playwright, etc.) and dependencies
    exclude: [
      '.agents/**',
      'node_modules/**',
    ],
  },
});

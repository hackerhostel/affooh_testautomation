// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for (default: 30s) */
  timeout: 60 * 1000, // 60 seconds for entire test
  
  /* Maximum time expect() should wait for condition (default: 5s) */
  expect: {
    timeout: 10 * 1000, // 10 seconds for assertions
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
     /* Maximum time for actions like click() or fill() (default: 30s) */
    actionTimeout: 30 * 1000, // 30 seconds per action
    
    /* Maximum time for navigation (default: 30s) */
    navigationTimeout: 45 * 1000, // 45 seconds for page loads
    
    trace: 'on-first-retry',
    screenshot:'on',
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Firefox'] },
    }
  ],

  
});


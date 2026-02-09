import { test as base } from '@playwright/test';
import testData from './test-data.json';

// Custom fixture to provide baseURL and launch before each test
export const test = base.extend({
  baseURL: [async ({}, use) => {
    // Use environment variable if set, else fallback to testData
    const url = process.env.BASE_URL || testData.baseURL;
    await use(url);
  }, { scope: 'test' }],

  // Launch the baseURL before each test
  page: async ({ page, baseURL }, use) => {
    await page.goto(baseURL);
    await use(page);
  },
});

export { expect } from '@playwright/test';

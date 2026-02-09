import { defineConfig, devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'Chromium',
      use: { 
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
      retries: 1,
      workers: 2,
      fullyParallel: true,
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
        trace: 'on',
      },
      retries: 2,
      workers: 2,
      fullyParallel: true,
    },
    {
      name: 'Pixel 5',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
        trace: 'on',
      },
      retries: 1,
      workers: 1,
      fullyParallel: false,
    },
    {
      name: 'iPhone 12',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
        trace: 'on',
      },
      retries: 2,
      workers: 1,
      fullyParallel: false,
    },

    // ---------------- BrowserStack Projects ----------------
    {
      name: 'browserstack-chromium',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'chrome',
            browser_version: 'latest',
            os: 'Windows',
            os_version: '11',
            buildName: 'Playwright-Jenkins-Build',
            sessionName: 'BrowserStack-Chrome-Test',
            'browserstack.username': process.env.BROWSERSTACK_USERNAME,
            'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
            video: true,
            networkLogs: true,
            consoleLogs: 'info'
          }))}`,
          timeout: 120000, // 2 min
        },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
    {
      name: 'browserstack-webkit',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'playwright-webkit',
            browser_version: 'latest',
            os: 'OS X',
            os_version: 'Sonoma',
            buildName: 'Playwright-Jenkins-Build',
            sessionName: 'BrowserStack-WebKit-Test',
            'browserstack.username': process.env.BROWSERSTACK_USERNAME,
            'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
            video: true,
            networkLogs: true,
            consoleLogs: 'info'
          }))}`,
          timeout: 120000,
        },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
    {
      name: 'browserstack-edge',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'edge',
            browser_version: 'latest',
            os: 'Windows',
            os_version: '11',
            buildName: 'Playwright-Jenkins-Build',
            sessionName: 'BrowserStack-Edge-Test',
            'browserstack.username': process.env.BROWSERSTACK_USERNAME,
            'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
            video: true,
            networkLogs: true,
            consoleLogs: 'info'
          }))}`,
          timeout: 120000,
        },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },

    // -------------------------------------------------------
    // API Testing Project
    {
      name: 'API-Tests',
      testMatch: ['tests/API_Testing/**/*.spec.js'],   // only API tests
      use: {
        headless: true,
      },
    },
  ],
  reporter: [
    ['html'],
    ['line'], 
    ['allure-playwright'] // Allure reporter
  ],
};

module.exports = config;

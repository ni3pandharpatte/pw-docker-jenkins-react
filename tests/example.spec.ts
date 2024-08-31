import { test, expect } from '@playwright/test'
import { logTestResultToSplunk } from './utils/splunkLogger'

test.beforeAll(async () => {
  console.log('Starting test suite');
});

test.afterAll(async () => {
  console.log('Finished test suite');
});

test.afterEach(async ({ page, browserName }, testInfo) => {
  // Log test result after each test
  const testResult = {
      testName: testInfo.title,
      status: testInfo.status,
      error: testInfo.error ? testInfo.error.message : null,
      duration: testInfo.duration,
      browser: browserName,
      timestamp: new Date().toISOString(),
      pullRequest: `PR-${process.env.pullRequest}`,
      buildNumber: `BN-${process.env.buildNumber}`
  };

  await logTestResultToSplunk(testResult);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

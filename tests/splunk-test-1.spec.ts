import { test, expect } from '@playwright/test'
import { logTestResultToSplunk } from './utils/splunkLogger'

// npx playwright test splunk-test-1.spec.ts --headed --project 'chromium' pullRequest=90 buildNumber=7 

test.use({
    launchOptions:{
        devtools: true,
    }
})

test.describe('Test Suite with Splunk Logging', () => {
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

    test('example test', async ({ page }) => {
        await page.goto('https://example.com');
        expect(await page.title()).toBe('Example Domain');
    });

    test('failing test', async ({ page }) => {
        await page.goto('https://example.com');
        expect(await page.title()).toBe('Example Domain1');
    });
});

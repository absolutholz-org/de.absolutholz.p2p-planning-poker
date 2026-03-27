import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	forbidOnly: !!process.env.CI,
	fullyParallel: true,
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	reporter: [['html', { outputFolder: 'playwright-report' }]],
	retries: process.env.CI ? 2 : 0,
	testDir: './tests/a11y',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'pnpm run dev',
		reuseExistingServer: !process.env.CI,
		stderr: 'pipe',
		stdout: 'pipe',
		url: 'http://localhost:5173',
	},
	workers: process.env.CI ? 1 : undefined,
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	fullyParallel: true,
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	reporter: [['./scripts/a11y-reporter.ts']], // Use custom PO/UX dashboard reporter
	testDir: './src',
	testMatch: /.*\.a11y\.ts/, // Only runs files ending in .a11y.ts
	use: {
		baseURL: 'http://localhost:6006', // Your Storybook URL
		trace: 'on-first-retry',
	},
	// Automatically starts Storybook if it isn't running
	webServer: {
		command: 'pnpm run storybook',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
		url: 'http://localhost:6006',
	},
});

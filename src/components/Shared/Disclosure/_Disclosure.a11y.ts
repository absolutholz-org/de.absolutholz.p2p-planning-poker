import { expect, test } from '@playwright/test';

import { runA11yAudit, testReflowCompliance } from '../../../test/a11y-utils';

test.describe('Disclosure Component Accessibility', () => {
	const storyUrl = '/iframe.html?id=primitives-layout-disclosure--default';

	test.beforeEach(async ({ page }) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });
	});

	test('STATIC & SURGICAL AUDIT: should have correct ARIA and pass Axe scan', async ({
		page,
	}, testInfo) => {
		const summary = page.locator('summary');
		const content = page.locator('summary + div');

		await expect(summary).toBeVisible();
		await expect(summary).toHaveAttribute('aria-expanded', 'false');

		const contentId = await content.getAttribute('id');
		expect(contentId).toBeTruthy();
		await expect(summary).toHaveAttribute('aria-controls', contentId!);

		// Surgical scoping to storybook-root to eliminate ambient noise
		await runA11yAudit(page, testInfo, {
			selector: '#storybook-root',
		});
	});

	test('OPERABLE: keyboard and focus order (WCAG 2.1.1, 2.4.3)', async ({
		page,
	}) => {
		// Manual Flag for custom reporter
		test.info().annotations.push(
			{ description: '2.1.1', type: 'a11y-criterion' },
			{ description: '2.4.3', type: 'a11y-criterion' },
		);

		const summary = page.locator('summary');
		const details = page.locator('details');

		// Focus verification
		await page.keyboard.press('Tab');
		await expect(summary).toBeFocused();

		// Toggle with space
		await page.keyboard.press(' ');
		await expect(details).toHaveAttribute('open', '');
		await expect(summary).toHaveAttribute('aria-expanded', 'true');

		// Verify focus is still on the summary (not lost)
		await expect(summary).toBeFocused();

		// Toggle with Enter
		await page.keyboard.press('Enter');
		await expect(details).not.toHaveAttribute('open', '');
		await expect(summary).toHaveAttribute('aria-expanded', 'false');
	});

	test('BEHAVIORAL: Focus Visibility (WCAG 2.4.7)', async ({ page }) => {
		test.info().annotations.push({
			description: '2.4.7',
			type: 'a11y-criterion',
		});
		const summary = page.locator('summary');
		await summary.focus();

		// Verify the focus ring is visible according to design system
		const styles = await summary.evaluate((el) => {
			const s = window.getComputedStyle(el);
			return {
				outlineStyle: s.outlineStyle,
				outlineWidth: s.outlineWidth,
			};
		});

		expect(styles.outlineStyle).toBe('solid');
		expect(parseInt(styles.outlineWidth)).toBeGreaterThan(0);
	});

	test('TEXT RESILIENCE: WCAG 1.4.12 spacing overrides', async ({
		page,
	}, testInfo) => {
		// WCAG 1.4.12: Text Spacing
		test.info().annotations.push({
			description: '1.4.12',
			type: 'a11y-criterion',
		});

		// Inject stress-test styles
		await page.addStyleTag({
			content: `
				* {
					line-height: 1.5 !important;
					letter-spacing: 0.12em !important;
					word-spacing: 0.16em !important;
					--sys-spacing-para: 2em !important;
				}
			`,
		});

		const summary = page.locator('summary');
		await summary.click(); // Open to test content resilience

		// Audit for clipping/overlap (visual check + Axe)
		await runA11yAudit(page, testInfo, {
			selector: '#storybook-root',
		});
	});

	test('OS-LEVEL: forced-colors mode emulation', async ({
		page,
	}, testInfo) => {
		// Emulate Windows High Contrast mode
		await page.emulateMedia({ forcedColors: 'active' });

		const summary = page.locator('summary');
		await summary.focus();

		// Ensure the component is still usable and focus indicator is present
		// Axe checks for forced-colors compatibility (e.g. not overriding system-colors)
		await runA11yAudit(page, testInfo, {
			selector: '#storybook-root',
		});
	});

	test('THEME INTEGRITY: Light vs Dark tokens (WCAG 1.4.3)', async ({
		page,
	}, testInfo) => {
		// Test Light Theme
		await page.evaluate(() =>
			document.documentElement.setAttribute('data-color-scheme', 'light'),
		);
		await runA11yAudit(page, testInfo, {
			label: 'Light Theme',
			selector: '#storybook-root',
		});

		// Test Dark Theme
		await page.evaluate(() =>
			document.documentElement.setAttribute('data-color-scheme', 'dark'),
		);
		await runA11yAudit(page, testInfo, {
			label: 'Dark Theme',
			selector: '#storybook-root',
		});
	});

	test('REFLOW: 1.4.10 compliance at 320px', async ({ page }, testInfo) => {
		await testReflowCompliance(page, testInfo, storyUrl, {
			selector: '#storybook-root',
		});
	});
});

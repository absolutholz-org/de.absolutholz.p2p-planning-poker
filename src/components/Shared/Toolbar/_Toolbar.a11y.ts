import { expect, test } from '@playwright/test';

import { runA11yAudit, testReflowCompliance } from '../../../test/a11y-utils';

test.describe('Toolbar Component Accessibility', () => {
	const storyUrl = '/iframe.html?id=primitives-display-toolbar--management';

	test('STATIC & SURGICAL AUDIT: should have correct ARIA and pass Axe scan', async ({
		page,
	}, testInfo) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const toolbar = page.getByRole('toolbar');
		await expect(toolbar).toBeVisible();
		// Verify accessibility labeling (WCAG 1.1.1, 4.1.2)
		await expect(toolbar).toHaveAttribute('aria-label', 'Room management');

		// Surgical scoping to toolbar to eliminate ambient noise
		await runA11yAudit(page, testInfo, { selector: '[role="toolbar"]' });
	});

	test('BEHAVIORAL: Keyboard Navigation and Roving Tabindex (WCAG 2.1.1)', async ({
		page,
	}) => {
		test.info().annotations.push({
			description: '2.1.1',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const items = page.locator('[data-toolbar-item="true"]');
		const firstItem = items.nth(0);
		const secondItem = items.nth(1);

		// 1. Initial State: First item is the tab stop (tabIndex="0")
		await expect(firstItem).toHaveAttribute('tabindex', '0');
		await expect(secondItem).toHaveAttribute('tabindex', '-1');

		// 2. Focus first item
		await firstItem.focus();
		await expect(firstItem).toBeFocused();

		// 3. ArrowRight: Move focus to next item
		await page.keyboard.press('ArrowRight');
		await expect(secondItem).toBeFocused();
		// Verify roving tabindex updated
		await expect(secondItem).toHaveAttribute('tabindex', '0');
		await expect(firstItem).toHaveAttribute('tabindex', '-1');

		// 4. ArrowLeft: Move focus back to previous item
		await page.keyboard.press('ArrowLeft');
		await expect(firstItem).toBeFocused();

		// 5. End: Jump to last item
		await page.keyboard.press('End');
		await expect(secondItem).toBeFocused();

		// 6. Home: Jump back to first item
		await page.keyboard.press('Home');
		await expect(firstItem).toBeFocused();

		// 7. Looping: ArrowRight on last item should go back to first
		await secondItem.focus();
		await page.keyboard.press('ArrowRight');
		await expect(firstItem).toBeFocused();
	});

	test('BEHAVIORAL: Focus Visibility (WCAG 2.4.7)', async ({ page }) => {
		test.info().annotations.push({
			description: '2.4.7',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const firstItem = page.locator('[data-toolbar-item="true"]').nth(0);
		await firstItem.focus();

		// Verify the focus ring is visible according to our design system
		const styles = await firstItem.evaluate((el) => {
			const s = window.getComputedStyle(el);
			return {
				outlineStyle: s.outlineStyle,
				outlineWidth: s.outlineWidth,
			};
		});

		expect(styles.outlineStyle).toBe('solid');
		expect(parseInt(styles.outlineWidth)).toBeGreaterThan(0);
	});

	test('BEHAVIORAL: No Keyboard Trap (WCAG 2.1.2)', async ({ page }) => {
		test.info().annotations.push({
			description: '2.1.2',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		// Add a sentinel button after the toolbar to verify focus can escape the component
		await page.evaluate(() => {
			const btn = document.createElement('button');
			btn.id = 'sentinel-after';
			btn.textContent = 'After Toolbar';
			document.querySelector('#storybook-root')?.appendChild(btn);
		});

		const firstItem = page.locator('[data-toolbar-item="true"]').nth(0);
		await firstItem.focus();

		// Tab out of the toolbar (since it's a roving tabindex, one Tab should move to next focusable element outside)
		await page.keyboard.press('Tab');

		const sentinel = page.locator('#sentinel-after');
		await expect(sentinel).toBeFocused();
	});

	test('TEXT RESILIENCE: WCAG 1.4.12 spacing overrides', async ({
		page,
	}, testInfo) => {
		test.info().annotations.push({
			description: '1.4.12',
			type: 'a11y-criterion',
		});

		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		// Inject stress-test styles for line-height, letter-spacing, and word-spacing
		await page.addStyleTag({
			content: `
				* {
					line-height: 1.5 !important;
					letter-spacing: 0.12em !important;
					word-spacing: 0.16em !important;
				}
			`,
		});

		// Audit for clipping or content overlap under stress
		await runA11yAudit(page, testInfo, { selector: '[role="toolbar"]' });
	});

	test('THEME INTEGRITY: Light vs Dark tokens (WCAG 1.4.3)', async ({
		page,
	}, testInfo) => {
		// Test Light Theme
		await page.goto(storyUrl, { waitUntil: 'commit' });
		await page.evaluate(() =>
			document.documentElement.setAttribute('data-color-scheme', 'light'),
		);
		await page.waitForLoadState('networkidle');
		await runA11yAudit(page, testInfo, {
			label: 'Light Theme',
			selector: '[role="toolbar"]',
		});

		// Test Dark Theme
		await page.goto(storyUrl, { waitUntil: 'commit' });
		await page.evaluate(() =>
			document.documentElement.setAttribute('data-color-scheme', 'dark'),
		);
		await page.waitForLoadState('networkidle');
		await runA11yAudit(page, testInfo, {
			label: 'Dark Theme',
			selector: '[role="toolbar"]',
		});
	});

	test('OS-LEVEL: forced-colors mode emulation', async ({
		page,
	}, testInfo) => {
		await page.emulateMedia({ forcedColors: 'active' });
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		// Axe checks for high-contrast compatibility
		await runA11yAudit(page, testInfo, { selector: '[role="toolbar"]' });
	});

	test('REFLOW: 1.4.10 compliance at 320px', async ({ page }, testInfo) => {
		await testReflowCompliance(page, testInfo, storyUrl, {
			selector: '[role="toolbar"]',
		});
	});
});

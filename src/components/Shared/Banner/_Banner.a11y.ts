import { expect, test } from '@playwright/test';

import {
	runA11yAudit,
	STORYBOOK_ROOT,
	testReflowCompliance,
} from '../../../test/a11y-utils';

test.describe('Banner Component Accessibility', () => {
	const variants = [
		{ id: 'success', name: 'Success' },
		{ id: 'info', name: 'Info' },
		{ id: 'warning', name: 'Warning' },
		{ id: 'danger', name: 'Danger' },
	];

	for (const variant of variants) {
		const storyUrl = `/iframe.html?id=primitives-display-banner--${variant.id}`;

		test(`WCAG 2.2 AA Audit: ${variant.name} variant`, async ({
			page,
		}, testInfo) => {
			await page.goto(storyUrl, { waitUntil: 'networkidle' });
			await expect(page.locator(STORYBOOK_ROOT)).toBeVisible();

			// Run full Axe-core audit
			await runA11yAudit(page, testInfo);
		});

		test(`ARIA & Behavioral: ${variant.name} variant`, async ({
			page,
		}, testInfo) => {
			testInfo.annotations.push({
				description: '4.1.3',
				type: 'a11y-criterion',
			});
			await page.goto(storyUrl, { waitUntil: 'networkidle' });
			const banner = page.locator('[role="status"]');

			// [ARIA-LIVE]: Verify behavioral attributes for screen readers
			await expect(banner).toHaveAttribute('aria-live', 'polite');
			await expect(banner).toHaveAttribute('aria-atomic', 'true');

			// [ICON]: Ensure decorative icon is hidden from SR
			const icon = banner.locator('svg');
			if ((await icon.count()) > 0) {
				await expect(icon.first()).toHaveAttribute(
					'aria-hidden',
					'true',
				);
			}
		});

		test(`REFLOW: ${variant.name} variant at 320px`, async ({
			page,
		}, testInfo) => {
			testInfo.annotations.push({
				description: '1.4.10',
				type: 'a11y-criterion',
			});
			await testReflowCompliance(page, testInfo, storyUrl);
		});

		test(`BEHAVIORAL: Use of Color (WCAG 1.4.1) - ${variant.name} variant`, async ({
			page,
		}) => {
			test.info().annotations.push({
				description: '1.4.1',
				type: 'a11y-criterion',
			});
			await page.goto(storyUrl, { waitUntil: 'networkidle' });

			// Verify that the status is not indicated by color alone
			// For Banner, we expect a semantic icon to be present for each variant
			const banner = page.locator('[role="status"]');
			const icon = banner.locator('svg');
			await expect(icon).toBeVisible();

			// Also verify there's a status-aware class or attribute that SRs can use
			// (Though aria-live="polite" on the container is the primary SR signal)
			await expect(banner).toHaveAttribute('data-variant', variant.id);
		});
	}

	test('INTERACTION: Action button should be keyboard accessible', async ({
		page,
	}, testInfo) => {
		testInfo.annotations.push({
			description: '2.5.5',
			type: 'a11y-criterion',
		});
		const storyUrl = '/iframe.html?id=primitives-display-banner--success';
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const actionButton = page.getByRole('button', { name: 'Reveal Now' });
		await expect(actionButton).toBeVisible();

		// [FOCUS]: Verify keyboard reachability
		await page.keyboard.press('Tab');
		await expect(actionButton).toBeFocused();

		// [FOCUS-VISIBILITY]: WCAG 2.4.7
		testInfo.annotations.push({
			description: '2.4.7',
			type: 'a11y-criterion',
		});
		const styles = await actionButton.evaluate((el) => {
			const s = window.getComputedStyle(el);
			return {
				outlineStyle: s.outlineStyle,
				outlineWidth: s.outlineWidth,
			};
		});
		expect(styles.outlineStyle).toBe('solid');
		expect(parseInt(styles.outlineWidth)).toBeGreaterThan(0);

		// [TOUCH-TARGET]: Verify minimum sizing for mobile (48x48px)
		const box = await actionButton.boundingBox();
		if (box) {
			expect(box.width).toBeGreaterThanOrEqual(48);
			expect(box.height).toBeGreaterThanOrEqual(48); // Restored to compliant 48px target
		}
	});
});

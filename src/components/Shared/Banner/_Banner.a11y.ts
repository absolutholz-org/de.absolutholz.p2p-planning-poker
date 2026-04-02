import { expect, test } from '@playwright/test';

import {
	runA11yAudit,
	STORYBOOK_ROOT,
	testReflowCompliance,
} from '../../../test/a11y-utils';

test.describe('Banner Component Accessibility Certification', () => {
	const variants = [
		{ id: 'success', label: 'SUCCESS', name: 'Success' },
		{ id: 'info', label: 'INFO', name: 'Info' },
		{ id: 'warning', label: 'WARNING', name: 'Warning' },
		{ id: 'danger', label: 'DANGER', name: 'Danger' },
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

		test(`BEHAVIORAL: statusLabel rendering - ${variant.name} variant`, async ({
			page,
		}, testInfo) => {
			testInfo.annotations.push({
				description: '4.1.3',
				type: 'a11y-criterion',
			});
			await page.goto(storyUrl, { waitUntil: 'networkidle' });

			const banner = page.locator('[role="status"]');
			const label = banner
				.locator('span')
				.filter({ hasText: variant.label });

			// Verify label is present and uppercase (as per styles)
			await expect(label).toBeVisible();
			const textTransform = await label.evaluate(
				(el) => window.getComputedStyle(el).textTransform,
			);
			expect(textTransform).toBe('uppercase');

			// [ARIA-LIVE]: Verify behavioral attributes for screen readers
			await expect(banner).toHaveAttribute('aria-live', 'polite');
			await expect(banner).toHaveAttribute('aria-atomic', 'true');
		});

		test(`STRESS: WCAG 1.4.12 Text Spacing - ${variant.name} variant`, async ({
			page,
		}, testInfo) => {
			testInfo.annotations.push({
				description: '1.4.12',
				type: 'a11y-criterion',
			});
			await page.goto(storyUrl, { waitUntil: 'networkidle' });

			// Inject WCAG 1.4.12 stress styles
			await page.addStyleTag({
				content: `
				* {
					line-height: 1.5 !important;
					letter-spacing: 0.12em !important;
					word-spacing: 0.16em !important;
				}
				p {
					margin-bottom: 2em !important;
				}
			`,
			});

			const banner = page.locator('[role="status"]');
			await expect(banner).toBeVisible();

			// Verify no clipping: Banner should grow to contain text
			const boundingBox = await banner.boundingBox();
			const scrollHeight = await banner.evaluate((el) => el.scrollHeight);

			if (boundingBox) {
				// Offset for borders/padding: allow 2px deviation
				expect(boundingBox.height).toBeGreaterThanOrEqual(
					scrollHeight - 2,
				);
			}
		});
	}

	test('REFLOW: Vertical Stack at 320px (WCAG 1.4.10)', async ({
		page,
	}, testInfo) => {
		testInfo.annotations.push({
			description: '1.4.10',
			type: 'a11y-criterion',
		});
		const storyUrl =
			'/iframe.html?id=primitives-display-banner--system-announcement';

		await page.setViewportSize({ height: 800, width: 320 });
		await page.goto(storyUrl, { waitUntil: 'networkidle' });
		await expect(page.locator(STORYBOOK_ROOT)).toBeVisible();

		const banner = page.locator('[role="status"]');
		const content = banner.locator('> div').first(); // S.Banner_Content
		const actions = banner.locator('> div').last(); // S.Banner_Actions

		const contentBox = await content.boundingBox();
		const actionsBox = await actions.boundingBox();

		if (contentBox && actionsBox) {
			// In a vertical stack (column), actions should be below content
			expect(actionsBox.y).toBeGreaterThanOrEqual(
				contentBox.y + contentBox.height,
			);
		}

		await testReflowCompliance(page, testInfo, storyUrl);
	});

	test('DESKTOP ALIGNMENT: Horizontal Row at 800px', async ({ page }) => {
		const storyUrl =
			'/iframe.html?id=primitives-display-banner--system-announcement';

		await page.setViewportSize({ height: 800, width: 800 });
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const banner = page.locator('[role="status"]');
		const content = banner.locator('> div').first();
		const actions = banner.locator('> div').last();

		const contentBox = await content.boundingBox();
		const actionsBox = await actions.boundingBox();

		if (contentBox && actionsBox) {
			// In a horizontal row, actions should be to the right of content
			expect(actionsBox.x).toBeGreaterThanOrEqual(
				contentBox.x + contentBox.width,
			);

			// They should be roughly vertically aligned (centered)
			const contentCenter = contentBox.y + contentBox.height / 2;
			const actionsCenter = actionsBox.y + actionsBox.height / 2;
			expect(Math.abs(contentCenter - actionsCenter)).toBeLessThan(10);
		}
	});
});

import { expect, test } from '@playwright/test';

import { runA11yAudit, testReflowCompliance } from '../../../test/a11y-utils';

test.describe('Tooltip Component Accessibility', () => {
	const storyUrl = '/iframe.html?id=primitives-overlays-tooltip--default';

	test('ARIA ASSOCIATION: should link trigger to tooltip and pass Axe scan', async ({
		page,
	}, testInfo) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Hover or focus me' });
		const tooltip = page.locator('[role="tooltip"]');

		// TOOLTIP: Not visible initially
		await expect(tooltip).not.toBeVisible();

		// TRIGGER: Hover to show
		await trigger.hover();
		await expect(tooltip).toBeVisible();

		// ASSOCIATION: aria-describedby on trigger should match tooltip id
		const tooltipId = await tooltip.getAttribute('id');
		expect(tooltipId).toBeTruthy();
		await expect(trigger).toHaveAttribute('aria-describedby', tooltipId!);

		// CONTENT: Tooltip should contain text
		await expect(tooltip).toHaveText('This is a tooltip!');

		// AXE: Run audit in open state
		await runA11yAudit(page, testInfo, {
			selector: '[role="tooltip"]',
		});
	});

	test('TRIGGERING: should show on focus and hide on blur', async ({
		page,
	}) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Hover or focus me' });
		const tooltip = page.locator('[role="tooltip"]');

		// FOCUS: Tab until trigger is focused
		// Since there might be other buttons (Set string), we tab until the target button is focused
		let attempts = 0;
		let isFocused = false;
		while (!isFocused && attempts < 10) {
			await page.keyboard.press('Tab');
			isFocused = await trigger.evaluate(
				(node) => document.activeElement === node,
			);
			attempts++;
		}

		await expect(trigger).toBeFocused();
		await expect(tooltip).toBeVisible();

		// BLUR: Tab away
		await page.keyboard.press('Tab');
		await expect(trigger).not.toBeFocused();
		// There might be a slight delay in hidePopover (100ms)
		await expect(tooltip).not.toBeVisible();
	});

	test('WCAG 1.4.13: DISMISSIBLE - Escape key should close the tooltip', async ({
		page,
	}) => {
		test.info().annotations.push({
			description: '1.4.13',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Hover or focus me' });
		const tooltip = page.locator('[role="tooltip"]');

		await trigger.hover();
		await expect(tooltip).toBeVisible();

		await page.keyboard.press('Escape');
		await expect(tooltip).not.toBeVisible();
	});

	test('WCAG 1.4.13: HOVERABLE - tooltip should remain open when hovered', async ({
		page,
	}) => {
		test.info().annotations.push({
			description: '1.4.13',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Hover or focus me' });
		const tooltip = page.locator('[role="tooltip"]');

		await trigger.hover();
		await expect(tooltip).toBeVisible();

		// Move mouse from trigger to tooltip
		const tooltipBox = await tooltip.boundingBox();
		if (tooltipBox) {
			await page.mouse.move(
				tooltipBox.x + tooltipBox.width / 2,
				tooltipBox.y + tooltipBox.height / 2,
			);
			// Wait for the 100ms hide delay to pass to be sure it stays open
			await page.waitForTimeout(200);
			await expect(tooltip).toBeVisible();
		}
	});

	test('REFLOW: should not have horizontal scroll at 320px', async ({
		page,
	}, testInfo) => {
		await testReflowCompliance(page, testInfo, storyUrl, {
			selector: '[role="tooltip"]',
		});
	});
});

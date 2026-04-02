import { expect, test } from '@playwright/test';

import { runA11yAudit, testReflowCompliance } from '../../../test/a11y-utils';

test.describe('Popover Component Accessibility', () => {
	const storyUrl = '/iframe.html?id=primitives-overlays-popover--default';

	test('NATIVE ATTRIBUTES: should have correct popover attributes', async ({
		page,
	}) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Open Menu' });
		const popover = page.locator('[popover="auto"]');

		const popoverId = await popover.getAttribute('id');
		expect(popoverId).toBeTruthy();

		// TRIGGER: popovertarget should match popover id
		await expect(trigger).toHaveAttribute('popovertarget', popoverId!);
	});

	test('OPEN/CLOSE: should toggle on click and pass Axe scan', async ({
		page,
	}, testInfo) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Open Menu' });
		const popover = page.locator('[popover="auto"]');

		await expect(popover).not.toBeVisible();

		// OPEN: Click trigger
		await trigger.click();
		await expect(popover).toBeVisible();

		// AXE: Run audit in open state
		await runA11yAudit(page, testInfo, {
			selector: '[popover="auto"]',
		});

		// CLOSE: Click trigger again (native popover behaviour)
		// Wait, native popovertarget toggles.
		await trigger.click();
		await expect(popover).not.toBeVisible();
	});

	test('LIGHT DISMISS: clicking outside should close the popover', async ({
		page,
	}) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Open Menu' });
		const popover = page.locator('[popover="auto"]');

		await trigger.click();
		await expect(popover).toBeVisible();

		// Wait for transition to complete
		await page.waitForTimeout(200);

		// Click outside (top left corner of the viewport)
		await page.mouse.click(5, 5);
		await expect(popover).not.toBeVisible();
	});

	test('ESCAPE KEY: should close the popover', async ({ page }) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Open Menu' });
		const popover = page.locator('[popover="auto"]');

		await trigger.click();
		await expect(popover).toBeVisible();

		await page.keyboard.press('Escape');
		await expect(popover).not.toBeVisible();
	});

	test('REFLOW: should not have horizontal scroll at 320px', async ({
		page,
	}, testInfo) => {
		await testReflowCompliance(page, testInfo, storyUrl, {
			selector: '[popover="auto"]',
		});
	});

	test('ACTION DISMISS: clicking a button inside should close the popover', async ({
		page,
	}) => {
		const actionsStoryUrl =
			'/iframe.html?id=primitives-overlays-popover--with-actions';
		await page.goto(actionsStoryUrl, { waitUntil: 'networkidle' });

		const trigger = page.getByRole('button', { name: 'Action Menu' });
		const popover = page.locator('[popover="auto"]');

		await trigger.click();
		await expect(popover).toBeVisible();

		// Click the first action button inside
		const actionButton = page.getByRole('button', { name: 'First Action' });
		await actionButton.click();

		await expect(popover).not.toBeVisible();
	});
});

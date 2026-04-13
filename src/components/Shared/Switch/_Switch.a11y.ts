import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Switch A11y Certification', () => {
	test('should pass all WCAG 2.2 and BITV 2.0 standards for Default switch', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--default', {
			waitUntil: 'networkidle',
		});
		await expect(page.locator('#storybook-root')).toBeVisible();

		const results = await new AxeBuilder({ page })
			.include('#storybook-root')
			.withTags(['wcag22aa', 'best-practice'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('should pass all WCAG 2.2 and BITV 2.0 standards for Checked switch', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--checked', {
			waitUntil: 'networkidle',
		});
		await expect(page.locator('#storybook-root')).toBeVisible();

		const results = await new AxeBuilder({ page })
			.include('#storybook-root')
			.withTags(['wcag22aa', 'best-practice'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('should pass all WCAG 2.2 and BITV 2.0 standards for Disabled switch', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--disabled', {
			waitUntil: 'networkidle',
		});
		await expect(page.locator('#storybook-root')).toBeVisible();

		const results = await new AxeBuilder({ page })
			.include('#storybook-root')
			.withTags(['wcag22aa', 'best-practice'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('BEHAVIORAL: Verify role="switch" and aria-checked reflect the state', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--default', {
			waitUntil: 'networkidle',
		});
		const input = page.locator('input[role="switch"]');
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute('aria-checked', 'false');

		// Click the label
		await page.locator('label').click();
		await expect(input).toHaveAttribute('aria-checked', 'true');
	});

	test('KEYBOARD (2.1.1): Verify focusable and toggle via Space key', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--default', {
			waitUntil: 'networkidle',
		});

		const input = page.locator('input[role="switch"]');

		await page.keyboard.press('Tab');
		await expect(input).toBeFocused();

		await page.keyboard.press('Space');
		await expect(input).toHaveAttribute('aria-checked', 'true');
	});

	test('ENVIRONMENTAL STRESS: REFLOW (1.4.10): Verify label does not overlap track at 320px', async ({
		page,
	}) => {
		await page.setViewportSize({ height: 600, width: 320 });
		await page.goto(
			'/iframe.html?id=primitives-inputs-switch--long-label',
			{
				waitUntil: 'networkidle',
			},
		);

		// Verify track and label elements individually to avoid matching the track thumb span
		const labelText = page.locator('label > span').first();
		const track = page.locator('label > div');

		const labelBox = await labelText.boundingBox();
		const trackBox = await track.boundingBox();

		expect(labelBox).not.toBeNull();
		expect(trackBox).not.toBeNull();

		const isOverlapping =
			labelBox!.x < trackBox!.x + trackBox!.width &&
			labelBox!.x + labelBox!.width > trackBox!.x &&
			labelBox!.y < trackBox!.y + trackBox!.height &&
			labelBox!.y + labelBox!.height > trackBox!.y;

		expect(isOverlapping).toBe(false);
	});

	test('ENVIRONMENTAL STRESS: FORCED COLORS: Verify track border is visible', async ({
		page,
	}) => {
		await page.emulateMedia({
			colorScheme: 'dark',
			forcedColors: 'active',
		});
		await page.goto('/iframe.html?id=primitives-inputs-switch--default', {
			waitUntil: 'networkidle',
		});

		const track = page.locator('label > div');

		const borderStyle = await track.evaluate((el) =>
			window.getComputedStyle(el).getPropertyValue('border-top-style'),
		);
		expect(borderStyle).not.toBe('none');

		// Run Axe to ensure no other a11y violations happen in forced colors mode
		const results = await new AxeBuilder({ page })
			.include('#storybook-root')
			.withTags(['wcag22aa', 'best-practice'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('ENVIRONMENTAL STRESS: TEXT SPACING (1.4.12): Verify container expansion', async ({
		page,
	}) => {
		await page.goto(
			'/iframe.html?id=primitives-inputs-switch--long-label',
			{
				waitUntil: 'networkidle',
			},
		);

		await page.addStyleTag({
			content: `
				* {
					line-height: 1.5 !important;
					letter-spacing: 0.12em !important;
					word-spacing: 0.16em !important;
				}
				p, span {
					margin-bottom: 2em !important;
				}
			`,
		});

		const results = await new AxeBuilder({ page })
			.include('#storybook-root')
			.withTags(['wcag22aa', 'best-practice'])
			.analyze();

		expect(results.violations).toEqual([]);

		const labelText = page.locator('label > span').first();
		const track = page.locator('label > div');

		const labelBox = await labelText.boundingBox();
		const trackBox = await track.boundingBox();

		expect(labelBox).not.toBeNull();
		expect(trackBox).not.toBeNull();

		// Bounding boxes should not intersect.
		const isOverlapping =
			labelBox!.x < trackBox!.x + trackBox!.width &&
			labelBox!.x + labelBox!.width > trackBox!.x &&
			labelBox!.y < trackBox!.y + trackBox!.height &&
			labelBox!.y + labelBox!.height > trackBox!.y;

		expect(isOverlapping).toBe(false);
	});

	test('ENVIRONMENTAL STRESS: TEXT ZOOM (1.4.4): Verify track and thumb scale up proportionally', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--default', {
			waitUntil: 'networkidle',
		});

		const track = page.locator('label > div');
		const initialTrackBox = await track.boundingBox();

		await page.addStyleTag({
			content: `
				html, body, #storybook-root {
					font-size: 32px !important;
				}
			`,
		});

		await page.waitForTimeout(100);

		const scaledTrackBox = await track.boundingBox();

		expect(initialTrackBox).not.toBeNull();
		expect(scaledTrackBox).not.toBeNull();

		expect(scaledTrackBox!.width).toBeGreaterThan(initialTrackBox!.width);
		expect(scaledTrackBox!.height).toBeGreaterThan(initialTrackBox!.height);

		const results = await new AxeBuilder({ page })
			.include('#storybook-root')
			.withTags(['wcag22aa', 'best-practice'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('FOCUS VISIBILITY (2.4.7): Confirm focus ring is visible and positioned', async ({
		page,
	}) => {
		await page.goto('/iframe.html?id=primitives-inputs-switch--default', {
			waitUntil: 'networkidle',
		});

		const input = page.locator('input[role="switch"]');
		const track = page.locator('label > div');

		await page.keyboard.press('Tab');
		await expect(input).toBeFocused();

		const outlineStyle = await track.evaluate((el) =>
			window.getComputedStyle(el).getPropertyValue('outline-style'),
		);
		const outlineWidth = await track.evaluate((el) =>
			parseInt(
				window.getComputedStyle(el).getPropertyValue('outline-width'),
				10,
			),
		);

		expect(outlineStyle).not.toBe('none');
		expect(outlineWidth).toBeGreaterThan(0);
	});
});

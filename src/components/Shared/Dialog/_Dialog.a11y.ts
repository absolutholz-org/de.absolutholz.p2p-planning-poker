import { expect, test } from '@playwright/test';

import { runA11yAudit, testReflowCompliance } from '../../../test/a11y-utils';

test.describe('Dialog Component Accessibility', () => {
	const storyUrl = '/iframe.html?id=primitives-overlays-dialog--default';
	const triggerStory =
		'/iframe.html?id=primitives-overlays-dialog--with-trigger';

	test('STATIC & SURGICAL AUDIT: should have correct ARIA and pass Axe scan', async ({
		page,
	}, testInfo) => {
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const dialog = page.locator('dialog');
		await expect(dialog).toBeVisible();

		// Native dialog with showModal() automatically sets aria-modal="true" and role="dialog"
		await expect(dialog).toHaveAttribute('open', '');

		// Verify accessibility labeling
		await expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
		await expect(dialog).toHaveAttribute(
			'aria-describedby',
			'dialog-message',
		);

		// Surgical scoping to dialog to eliminate ambient noise
		await runA11yAudit(page, testInfo, { selector: 'dialog' });
	});

	test('BEHAVIORAL: Focus Trap and Keyboard Dismissal (WCAG 2.1.1, 2.4.3, 2.1.2)', async ({
		page,
	}) => {
		test.info().annotations.push(
			{ description: '2.1.1', type: 'a11y-criterion' },
			{ description: '2.4.3', type: 'a11y-criterion' },
			{ description: '2.1.2', type: 'a11y-criterion' },
		);
		await page.goto(storyUrl, { waitUntil: 'networkidle' });
		const dialog = page.locator('dialog');
		await expect(dialog).toBeVisible();
		// Minor wait for native modal settling
		await page.waitForSelector('dialog[open]');

		const cancelButton = page.getByRole('button', { name: 'Cancel' });
		const confirmButton = page.getByRole('button', { name: 'Reset Votes' });

		// Focus Trap Check: Tab should cycle only between Dialog elements
		await page.keyboard.press('Tab');
		await expect(cancelButton).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(confirmButton).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(cancelButton).toBeFocused(); // Wrapped back

		// Keyboard Dismissal: Escape should close the dialog
		await page.keyboard.press('Escape');
		await expect(dialog).not.toHaveAttribute('open', '');
	});

	test('BEHAVIORAL: Focus Return (WCAG 2.4.3)', async ({ page }) => {
		test.info().annotations.push({
			description: '2.4.3',
			type: 'a11y-criterion',
		});

		await page.goto(triggerStory, { waitUntil: 'networkidle' });
		const trigger = page.getByRole('button', { name: 'Open Dialog' });

		await trigger.focus();
		await trigger.click();

		const dialog = page.locator('dialog');
		await expect(dialog).toBeVisible();

		// Close via ESC
		await page.keyboard.press('Escape');
		await expect(dialog).not.toBeVisible();

		// Verify focus returns to trigger
		await expect(trigger).toBeFocused();
	});

	test('BEHAVIORAL: Focus Visibility (WCAG 2.4.7)', async ({ page }) => {
		test.info().annotations.push({
			description: '2.4.7',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		const cancelButton = page.getByRole('button', { name: 'Cancel' });
		await cancelButton.focus();

		// Verify the focus ring is visible according to design system
		const styles = await cancelButton.evaluate((el) => {
			const s = window.getComputedStyle(el);
			return {
				outlineStyle: s.outlineStyle,
				outlineWidth: s.outlineWidth,
			};
		});

		expect(styles.outlineStyle).toBe('solid');
		expect(parseInt(styles.outlineWidth)).toBeGreaterThan(0);
	});

	test('BEHAVIORAL: Meaningful Sequence (WCAG 1.3.2)', async ({ page }) => {
		test.info().annotations.push({
			description: '1.3.2',
			type: 'a11y-criterion',
		});
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		// Verify the logical order of content in the DOM matches the visual/expected sequence
		// Headline -> Message -> Actions
		const title = page.locator('#dialog-title');
		const message = page.locator('#dialog-message');
		const actions = page.locator('footer');

		const titleIndex = await title.evaluate((el) =>
			Array.from(document.querySelectorAll('*')).indexOf(el),
		);
		const messageIndex = await message.evaluate((el) =>
			Array.from(document.querySelectorAll('*')).indexOf(el),
		);
		const actionsIndex = await actions.evaluate((el) =>
			Array.from(document.querySelectorAll('*')).indexOf(el),
		);

		expect(titleIndex).toBeLessThan(messageIndex);
		expect(messageIndex).toBeLessThan(actionsIndex);
	});

	test('TEXT RESILIENCE: WCAG 1.4.12 spacing overrides', async ({
		page,
	}, testInfo) => {
		test.info().annotations.push({
			description: '1.4.12',
			type: 'a11y-criterion',
		});

		await page.goto(storyUrl, { waitUntil: 'networkidle' });

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

		// Audit for clipping/overlap
		await runA11yAudit(page, testInfo, { selector: 'dialog' });
	});

	test('OS-LEVEL: forced-colors mode emulation', async ({
		page,
	}, testInfo) => {
		await page.emulateMedia({ forcedColors: 'active' });
		await page.goto(storyUrl, { waitUntil: 'networkidle' });

		// Axe checks for high-contrast compatibility
		await runA11yAudit(page, testInfo, { selector: 'dialog' });
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
			selector: 'dialog',
		});

		// Test Dark Theme
		// Navigate anew to ensure clean state
		await page.goto(storyUrl, { waitUntil: 'commit' });
		await page.evaluate(() =>
			document.documentElement.setAttribute('data-color-scheme', 'dark'),
		);
		await page.waitForLoadState('networkidle');
		await runA11yAudit(page, testInfo, {
			label: 'Dark Theme',
			selector: 'dialog',
		});
	});

	test('REFLOW: 1.4.10 compliance at 320px', async ({ page }, testInfo) => {
		await testReflowCompliance(page, testInfo, storyUrl, {
			selector: 'dialog',
		});
	});
});

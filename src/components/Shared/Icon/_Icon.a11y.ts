import { expect, test } from '@playwright/test';

import { runA11yAudit } from '../../../test/a11y-utils';

test.describe('Icon Component Accessibility', () => {
	test('DECORATIVE STATE: should have role="presentation" or aria-hidden="true" when no label is provided', async ({
		page,
	}, testInfo) => {
		await page.goto('/iframe.html?id=primitives-display-icon--default', {
			waitUntil: 'networkidle',
		});

		const icon = page.locator('span[role]');
		await expect(icon).toBeVisible({ timeout: 10000 });

		const role = await icon.getAttribute('role');
		const ariaHidden = await icon.getAttribute('aria-hidden');
		expect(role === 'presentation' || ariaHidden === 'true').toBeTruthy();

		await runA11yAudit(page, testInfo);
	});

	test('INFORMATIVE STATE: should have role="img" and an aria-label matching the label prop', async ({
		page,
	}, testInfo) => {
		await page.goto('/iframe.html?id=primitives-display-icon--emoji', {
			waitUntil: 'networkidle',
		});

		const icon = page.locator('span[role]');
		await expect(icon).toBeVisible({ timeout: 10000 });

		await expect(icon).toHaveAttribute('role', 'img');
		await expect(icon).toHaveAttribute('aria-label', 'Rocket Emoji');

		await runA11yAudit(page, testInfo);
	});
});

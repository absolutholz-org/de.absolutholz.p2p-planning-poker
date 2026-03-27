import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('AppFooter Visual Audit', () => {
	test('should pass automated accessibility checks', async ({ page }) => {
		await page.goto('/');

		const results = await new AxeBuilder({ page })
			.withTags(['wcag22aa'])
			.analyze();

		console.log('AXE_RESULTS_START');
		console.log(JSON.stringify(results));
		console.log('AXE_RESULTS_END');

		expect(results.violations).toEqual([]);
	});
});

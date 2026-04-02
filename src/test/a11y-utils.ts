import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, type TestInfo } from '@playwright/test';

/**
 * Standard WCAG and Best Practice tags for our accessibility certification.
 * Includes WCAG 2.0 through 2.2 AA.
 */
export const A11Y_TAGS = [
	'wcag2a',
	'wcag2aa',
	'wcag21a',
	'wcag21aa',
	'wcag22a',
	'wcag22aa',
	'best-practice',
];

/**
 * Standard selector for Storybook component isolation.
 */
export const STORYBOOK_ROOT = '#storybook-root';

/**
 * Options for the accessibility audit.
 */
export interface IA11yAuditOptions {
	label?: string;
	selector?: string;
	tags?: string[];
}

/**
 * Performs a standard Axe-core accessibility scan and attaches results to the test report.
 */
export async function runA11yAudit(
	page: Page,
	testInfo: TestInfo,
	options: IA11yAuditOptions = {},
) {
	const { selector = STORYBOOK_ROOT, tags = A11Y_TAGS } = options;

	const results = await new AxeBuilder({ page })
		.include(selector)
		.withTags(tags)
		.analyze();

	await testInfo.attach('a11y-scan-results', {
		body: JSON.stringify(results),
		contentType: 'application/json',
	});

	expect(results.violations).toEqual([]);
	return results;
}

/**
 * Navigates to a Storybook story, ensures the component is visible, and runs an audit.
 */
export async function testComponentA11y(
	page: Page,
	testInfo: TestInfo,
	url: string,
	options: IA11yAuditOptions = {},
) {
	await page.goto(url, { waitUntil: 'networkidle' });
	await expect(page.locator(STORYBOOK_ROOT)).toBeVisible({ timeout: 10000 });
	return runA11yAudit(page, testInfo, options);
}

/**
 * Sets the viewport to 320px width, navigates to a story, and verifies no horizontal overflow plus a full audit.
 */
export async function testReflowCompliance(
	page: Page,
	testInfo: TestInfo,
	url: string,
	options: IA11yAuditOptions = {},
) {
	await page.setViewportSize({ height: 800, width: 320 });
	await page.goto(url, { waitUntil: 'networkidle' });
	await expect(page.locator(STORYBOOK_ROOT)).toBeVisible({ timeout: 10000 });

	// Manual check for horizontal scroll on the root container
	const hasScroll = await page.evaluate((selector) => {
		const root = document.querySelector(selector);
		if (!root) return false;
		return root.scrollWidth > root.clientWidth;
	}, STORYBOOK_ROOT);

	expect(hasScroll).toBe(false);

	return runA11yAudit(page, testInfo, options);
}

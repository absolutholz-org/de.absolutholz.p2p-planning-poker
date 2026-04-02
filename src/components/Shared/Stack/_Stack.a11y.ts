import { test } from '@playwright/test';

import {
	testComponentA11y,
	testReflowCompliance,
} from '../../../test/a11y-utils';

test.describe('Stack Component Accessibility', () => {
	test('should pass WCAG 2.2 and BITV 2.0 standards', async ({
		page,
	}, testInfo) => {
		await testComponentA11y(
			page,
			testInfo,
			'/iframe.html?id=primitives-layout-stack--column',
		);
	});

	test('should maintain reflow integrity at 320px width', async ({
		page,
	}, testInfo) => {
		await testReflowCompliance(
			page,
			testInfo,
			'/iframe.html?id=primitives-layout-stack--wrapped-with-mixed-spacing',
		);
	});
});

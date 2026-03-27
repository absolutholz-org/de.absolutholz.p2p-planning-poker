import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AppFooter } from './_AppFooter';

describe('AppFooter Accessibility Audit', () => {
	it('captures exhaustive compliance data points', async () => {
		const { container } = render(
			<MemoryRouter>
				<AppFooter />
			</MemoryRouter>,
		);

		const results = await axe(container, {
			resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable'],
			runOnly: {
				type: 'tag',
				values: [
					'wcag2a',
					'wcag2aa',
					'wcag21a',
					'wcag21aa',
					'wcag22aa',
					'best-practice',
				],
			},
		});

		console.log('AXE_RESULTS_START');
		console.log(JSON.stringify(results));
		console.log('AXE_RESULTS_END');
	});
});

import { Global } from '@emotion/react';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { globalStyles } from '../src/theme/GlobalStyles';

const preview: Preview = {
	decorators: [
		(Story) => (
			<>
				<Global styles={globalStyles} />
				<Story />
			</>
		),
	],
	parameters: {
		a11y: {
			test: 'todo',
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;

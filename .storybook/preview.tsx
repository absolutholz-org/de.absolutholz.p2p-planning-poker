import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { DocsContainer } from '@storybook/blocks';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { globalStyles } from '../src/theme/GlobalStyles';

const emotionCache = createCache({
	key: 'css',
	stylisPlugins: [],
});

const preview: Preview = {
	decorators: [
		(Story) => (
			<CacheProvider value={emotionCache}>
				<Global styles={globalStyles} />
				<Story />
			</CacheProvider>
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
		docs: {
			container: ({ children, context }: any) => (
				<CacheProvider value={emotionCache}>
					<Global styles={globalStyles} />
					<DocsContainer context={context}>{children}</DocsContainer>
				</CacheProvider>
			),
		},
	},
};

export default preview;


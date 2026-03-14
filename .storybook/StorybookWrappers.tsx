import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { DocsContainer, type DocsContainerProps } from '@storybook/blocks';
import type { StoryContext } from '@storybook/react-vite';
import React, { type ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../src/i18n/config';
import { globalStyles } from '../src/theme/GlobalStyles';

const emotionCache = createCache({
	key: 'css',
	stylisPlugins: [],
});

export const GlobalDecorator = (Story: React.ElementType, context: StoryContext) => {
	const { locale, scheme } = context.globals;

	useEffect(() => {
		i18n.changeLanguage(locale);
	}, [locale]);

	useEffect(() => {
		const root = document.documentElement;
		if (scheme === 'dark') {
			root.setAttribute('data-color-scheme', 'dark');
		} else if (scheme === 'light') {
			root.setAttribute('data-color-scheme', 'light');
		} else if (scheme === 'system') {
			root.removeAttribute('data-color-scheme');
		}
	}, [scheme]);

	return (
		<I18nextProvider i18n={i18n}>
			<CacheProvider value={emotionCache}>
				<Global styles={globalStyles} />
				<Story />
			</CacheProvider>
		</I18nextProvider>
	);
};

export const CustomDocsContainer = ({
	children,
	context,
}: DocsContainerProps & { children: ReactNode }) => {
	const { locale, scheme } = (context as any).globals || {};

	useEffect(() => {
		if (locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale]);

	useEffect(() => {
		const root = document.documentElement;
		if (scheme === 'dark') {
			root.setAttribute('data-color-scheme', 'dark');
		} else if (scheme === 'light') {
			root.setAttribute('data-color-scheme', 'light');
		} else if (scheme === 'system') {
			root.removeAttribute('data-color-scheme');
		}
	}, [scheme]);

	return (
		<I18nextProvider i18n={i18n}>
			<CacheProvider value={emotionCache}>
				<Global styles={globalStyles} />
				<DocsContainer context={context}>{children}</DocsContainer>
			</CacheProvider>
		</I18nextProvider>
	);
};

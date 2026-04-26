import { css } from '@emotion/react';

import { darkTheme, lightTheme } from './colors';
import { fontSizes, iconSizes, radius, shadows, spacing } from './tokens';

const mapEntriesToVariables = (
	entries: Record<string, string>,
	prefix: string,
) => {
	return Object.entries(entries)
		.map(([key, value]) => `--sys-${prefix}-${key}: ${value};`)
		.join('\n');
};

const mapThemeToVariables = (
	lightEntries: Record<string, string>,
	darkEntries: Record<string, string>,
	prefix: string,
) => {
	return Object.entries(lightEntries)
		.map(([key, lightValue]) => {
			const darkValue = darkEntries[key] || lightValue;
			return `--sys-${prefix}-${key}: light-dark(${lightValue}, ${darkValue});`;
		})
		.join('\n');
};

export const globalStyles = css`
	:root {
		${mapEntriesToVariables(spacing, 'spacing')}
		${mapEntriesToVariables(radius, 'radius')}
		${mapEntriesToVariables(iconSizes, 'icon-size')}
		${mapEntriesToVariables(fontSizes, 'font-size')}
		${mapEntriesToVariables(shadows, 'shadow')}

		--page-content-padding: var(--sys-spacing-md);
		--page-content-max-width: 52rem;

		--sys-font-family:
			Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
		--sys-font-mono:
			ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas,
			'Liberation Mono', 'Courier New', monospace;
		--sys-font-weight-normal: 400;
		--sys-font-weight-medium: 500;
		--sys-font-weight-bold: 700;

		font-family: var(--sys-font-family);
		line-height: 1.5;
		font-weight: var(--sys-font-weight-normal);

		background-color: var(--sys-color-bg);
		color: var(--sys-color-text-primary);
		color-scheme: light dark;
		container-name: page;
		container-type: scroll-state;

		font-synthesize: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		@media screen and (min-width: 768px) {
			--page-content-padding: var(--sys-spacing-lg);
		}

		${mapThemeToVariables(lightTheme, darkTheme, 'color')}
		${mapEntriesToVariables(shadows, 'shadow')}
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	body {
		min-height: 100vh;
	}

	button {
		appearance: none;
		background: none;
		border: none;
		border-radius: 0;
		color: inherit;
		cursor: pointer;
		font: inherit;
		margin: 0;
		overflow: visible;
		padding: 0;
		width: auto;
		-webkit-font-smoothing: inherit;
	}

	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	[role='list'] {
		list-style: none;
	}

	a {
		color: var(--sys-color-text-secondary);
		text-decoration: none;
		transition: all 0.2s ease-in-out;

		&:hover,
		&:focus-visible {
			color: var(--sys-color-primary);
		}

		&:hover {
			text-decoration: underline;
		}

		&:focus-visible {
			border-radius: var(--sys-radius-sm);
			outline: 2px solid var(--sys-color-primary);
			outline-offset: -2px;
		}
	}
`;

import { css } from '@emotion/react';

const lightTheme = {
	bg: 'oklch(0.984 0.003 247.858)',
	border: 'oklch(0.92 0 0)',
	danger: 'oklch(0.637 0.237 25.33)',
	focus: 'oklch(0.205 0 0 / 0.3)',
	primary: 'oklch(0.205 0 0)',
	'primary-hover': 'oklch(0.269 0 0)',
	'primary-text': 'oklch(1 0 0)',
	success: 'oklch(0.696 0.17 162.48)',
	surface: 'oklch(1 0 0)',
	'text-primary': 'oklch(0.205 0 0)',
	'text-secondary': 'oklch(0.551 0 0)',
	warning: 'oklch(0.76 0.177 75.32)',
};

const darkTheme = {
	bg: 'oklch(0.145 0 0)',
	border: 'oklch(0.269 0 0)',
	danger: 'oklch(0.637 0.237 25.33)',
	focus: 'oklch(0.985 0 0 / 0.3)',
	primary: 'oklch(0.985 0 0)',
	'primary-hover': 'oklch(0.92 0 0)',
	'primary-text': 'oklch(0.205 0 0)',
	success: 'oklch(0.696 0.17 162.48)',
	surface: 'oklch(0.205 0 0)',
	'text-primary': 'oklch(0.985 0 0)',
	'text-secondary': 'oklch(0.705 0 0)',
	warning: 'oklch(0.76 0.177 75.32)',
};

const shadows = {
	lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const mapEntriesToVariables = (
	entries: Record<string, string>,
	prefix: string,
) => {
	return Object.entries(entries)
		.map(([key, value]) => `--sys-${prefix}-${key}: ${value};`)
		.join('\n');
};

export const globalStyles = css`
	:root {
		/* System Spacing */
		--sys-spacing-xs: 0.25rem; /* 4px */
		--sys-spacing-sm: 0.5rem; /* 8px */
		--sys-spacing-sm-md: 0.75rem; /* 12px */
		--sys-spacing-md: 1rem; /* 16px */
		--sys-spacing-lg: 1.5rem; /* 24px */
		--sys-spacing-xl: 2rem; /* 32px */
		--sys-spacing-xxl: 3rem; /* 48px */

		/* System Radius */
		--sys-radius-sm: 4px;
		--sys-radius-md: 8px;
		--sys-radius-lg: 12px;
		--sys-radius-xl: 16px;
		--sys-radius-xxl: 24px;
		--sys-radius-pill: 9999px;

		/* System Font Sizes */
		--sys-font-size-xs: 0.75rem; /* 12px */
		--sys-font-size-sm: 0.875rem; /* 14px */
		--sys-font-size-md: 1rem; /* 16px */
		--sys-font-size-lg: 1.125rem; /* 18px */
		--sys-font-size-xl: 1.25rem; /* 20px */
		--sys-font-size-2xl: 1.5rem; /* 24px */
		--sys-font-size-3xl: 2.25rem; /* 36px */

		--page-content-padding: var(--sys-spacing-md);
		--page-content-max-width: 52rem;

		font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
		line-height: 1.5;
		font-weight: 400;

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

		${mapEntriesToVariables(lightTheme, 'color')}
		${mapEntriesToVariables(shadows, 'shadow')}
	}

	@media (prefers-color-scheme: dark) {
		:root {
			${mapEntriesToVariables(darkTheme, 'color')}
		}
	}

	:root[data-color-scheme='light'] {
		${mapEntriesToVariables(lightTheme, 'color')}
		color-scheme: light;
	}

	:root[data-color-scheme='dark'] {
		${mapEntriesToVariables(darkTheme, 'color')}
		color-scheme: dark;
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
`;

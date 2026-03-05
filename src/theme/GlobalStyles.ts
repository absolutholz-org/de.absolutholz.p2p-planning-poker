import { css } from '@emotion/react';

const lightTheme = {
	bg: 'oklch(0.985 0 0)',
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

const mapThemeToVariables = (theme: Record<string, string>) => {
	return Object.entries(theme)
		.map(([key, value]) => `--sys-color-${key}: ${value};`)
		.join('\n');
};

export const globalStyles = css`
	:root {
		/* System Spacing */
		--sys-spacing-xs: 4px;
		--sys-spacing-sm: 8px;
		--sys-spacing-md: 16px;
		--sys-spacing-lg: 24px;
		--sys-spacing-xl: 32px;
		--sys-spacing-xxl: 48px;

		/* System Radius */
		--sys-radius-sm: 4px;
		--sys-radius-md: 8px;
		--sys-radius-lg: 12px;
		--sys-radius-xl: 16px;
		--sys-radius-xxl: 24px;
		--sys-radius-pill: calc(infinity * 1px);

		/* System Font Sizes */
		--sys-font-size-xs: 0.75rem; /* 12px */
		--sys-font-size-sm: 0.875rem; /* 14px */
		--sys-font-size-md: 1rem; /* 16px */
		--sys-font-size-lg: 1.125rem; /* 18px */
		--sys-font-size-xl: 1.25rem; /* 20px */
		--sys-font-size-2xl: 1.5rem; /* 24px */
		--sys-font-size-3xl: 2.25rem; /* 36px */

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

		${mapThemeToVariables(lightTheme)}
	}

	@media (prefers-color-scheme: dark) {
		:root {
			${mapThemeToVariables(darkTheme)}
		}
	}

	:root[data-color-scheme='light'] {
		${mapThemeToVariables(lightTheme)}
		color-scheme: light;
	}

	:root[data-color-scheme='dark'] {
		${mapThemeToVariables(darkTheme)}
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
		margin: 0px;
		overflow: visible;
		padding: 0px;
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

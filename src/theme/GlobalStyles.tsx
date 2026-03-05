import { css, Global } from '@emotion/react';

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

export const GlobalThemeStyles = () => {
	return (
		<Global
			styles={css`
				:root {
					${mapThemeToVariables(lightTheme)}
				}
				@media (prefers-color-scheme: dark) {
					:root {
						${mapThemeToVariables(darkTheme)}
					}
				}
				:root[data-color-scheme='light'] {
					${mapThemeToVariables(lightTheme)}
				}
				:root[data-color-scheme='dark'] {
					${mapThemeToVariables(darkTheme)}
				}
			`}
		/>
	);
};

export const lightTheme = {
	bg: 'oklch(0.984 0.003 247.858)',
	border: 'oklch(0.92 0 0)',
	danger: 'oklch(0.52 0.20 25.33)',
	'danger-hover': 'oklch(0.47 0.20 25.33)',
	focus: 'oklch(0.205 0 0 / 0.3)',
	info: 'oklch(0.54 0.145 250.93)',
	'info-hover': 'oklch(0.49 0.145 250.93)',
	primary: 'oklch(0.205 0 0)',
	'primary-hover': 'oklch(0.269 0 0)',
	'primary-text': 'oklch(1 0 0)',
	success: 'oklch(0.52 0.15 162.48)',
	'success-hover': 'oklch(0.47 0.15 162.48)',
	surface: 'oklch(1 0 0)',
	'surface-subtle': 'oklch(0.97 0 0)',
	'text-primary': 'oklch(0.205 0 0)',
	'text-secondary': 'oklch(0.40 0 0)',
	warning: 'oklch(0.50 0.15 75.32)',
	'warning-hover': 'oklch(0.45 0.15 75.32)',
};

export type ThemeColor = keyof typeof lightTheme;

export const color = (c: ThemeColor) => `var(--sys-color-${c})`;

export const darkTheme = {
	bg: 'oklch(0.145 0 0)',
	border: 'oklch(0.269 0 0)',
	danger: 'oklch(0.637 0.237 25.33)',
	'danger-hover': 'oklch(0.58 0.237 25.33)',
	focus: 'oklch(0.985 0 0 / 0.3)',
	info: 'oklch(0.72 0.12 250.93)',
	'info-hover': 'oklch(0.67 0.12 250.93)',
	primary: 'oklch(0.985 0 0)',
	'primary-hover': 'oklch(0.92 0 0)',
	'primary-text': 'oklch(0.205 0 0)',
	success: 'oklch(0.696 0.17 162.48)',
	'success-hover': 'oklch(0.65 0.17 162.48)',
	surface: 'oklch(0.205 0 0)',
	'surface-subtle': 'oklch(0.25 0 0)',
	'text-primary': 'oklch(0.99 0 0)',
	'text-secondary': 'oklch(0.90 0 0)',
	warning: 'oklch(0.76 0.177 75.32)',
	'warning-hover': 'oklch(0.72 0.177 75.32)',
};

import { create } from 'storybook/theming/create';

export const lightTheme = create({
	appBg: 'oklch(0.984 0.003 247.858)',
	appBorderColor: 'oklch(0.92 0 0)',
	appContentBg: 'oklch(1 0 0)',
	base: 'light',
	brandTitle: 'P2P Planning Poker',
	brandUrl: '/',
	colorPrimary: 'oklch(0.205 0 0)',
	colorSecondary: 'oklch(0.205 0 0)',
	textColor: 'oklch(0.205 0 0)',
	textInverseColor: 'oklch(1 0 0)',
});

export const darkTheme = create({
	appBg: 'oklch(0.145 0 0)',
	appBorderColor: 'oklch(0.269 0 0)',
	appContentBg: 'oklch(0.205 0 0)',
	base: 'dark',
	brandTitle: 'P2P Planning Poker',
	brandUrl: '/',
	colorPrimary: 'oklch(0.985 0 0)',
	colorSecondary: 'oklch(0.985 0 0)',
	textColor: 'oklch(0.985 0 0)',
	textInverseColor: 'oklch(0.205 0 0)',
});

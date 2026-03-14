import { create } from 'storybook/theming/create';

export const lightTheme = create({
	appBg: '#f8f9fa',
	appBorderColor: '#e9ecef',
	appContentBg: '#ffffff',
	base: 'light',
	brandTitle: 'P2P Planning Poker',
	brandUrl: '/',
	colorPrimary: '#212529',
	colorSecondary: '#495057',
	textColor: '#212529',
	textInverseColor: '#ffffff',
});

export const darkTheme = create({
	appBg: '#1a1a1a',
	appBorderColor: '#2e2e2e',
	appContentBg: '#242424',
	base: 'dark',
	brandTitle: 'P2P Planning Poker',
	brandUrl: '/',
	colorPrimary: '#f8f9fa',
	colorSecondary: '#dee2e6',
	textColor: '#f8f9fa',
	textInverseColor: '#212529',
});

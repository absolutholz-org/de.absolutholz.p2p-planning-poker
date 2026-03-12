import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
	],
	framework: '@storybook/react-vite',
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	async viteFinal(config, { configType }) {
		if (configType === 'PRODUCTION') {
			config.base = '/storybook/';
		}
		return config;
	},
};
export default config;

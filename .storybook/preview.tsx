import type { Preview } from '@storybook/react-vite';

import { CustomDocsContainer, GlobalDecorator } from './StorybookWrappers';

const preview: Preview = {
	decorators: [GlobalDecorator],
	globalTypes: {
		locale: {
			defaultValue: 'en',
			description: 'Internationalization locale',
			toolbar: {
				icon: 'globe',
				items: [
					{ right: '🇺🇸', title: 'English', value: 'en' },
					{ right: '🇩🇪', title: 'Deutsch', value: 'de' },
					{ right: '🇫🇷', title: 'Français', value: 'fr' },
					{ right: '🇵🇹', title: 'Português', value: 'pt' },
				],
			},
		},
		scheme: {
			defaultValue: 'system',
			description: 'Color scheme',
			toolbar: {
				icon: 'circlehollow',
				items: [
					{ icon: 'sun', title: 'Light', value: 'light' },
					{ icon: 'moon', title: 'Dark', value: 'dark' },
					{ icon: 'browser', title: 'System', value: 'system' },
				],
			},
		},
	},
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
			container: CustomDocsContainer,
		},
	},
};

export default preview;

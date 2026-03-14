import type { Preview } from '@storybook/react-vite';

import { SUPPORTED_LANGUAGES } from '../src/constants/languages';
import { CustomDocsContainer, GlobalDecorator } from './StorybookWrappers';

const preview: Preview = {
	decorators: [GlobalDecorator],
	globalTypes: {
		locale: {
			defaultValue: 'en',
			description: 'Internationalization locale',
			toolbar: {
				icon: 'globe',
				items: SUPPORTED_LANGUAGES.map((lang) => ({
					right: lang.flag,
					title: lang.label,
					value: lang.code,
				})),
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

import '../../../i18n/config'; // Requires global i18n bindings

import type { Meta, StoryObj } from '@storybook/react-vite';

import { LanguageSwitcher } from './_LanguageSwitcher';

const meta = {
	component: LanguageSwitcher,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Contextual/LanguageSwitcher',
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base Story rendering the localized language map
export const Default: Story = {};

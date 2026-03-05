import type { Meta, StoryObj } from '@storybook/react-vite';

import { LanguageSwitcher } from './_LanguageSwitcher';

const meta = {
	component: LanguageSwitcher,
	tags: ['autodocs'],
	title: 'Shared/LanguageSwitcher',
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

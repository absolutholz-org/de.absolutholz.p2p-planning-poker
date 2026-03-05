import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeSwitcher } from './_ThemeSwitcher';

const meta = {
	component: ThemeSwitcher,
	parameters: {
		backgrounds: {
			default: 'light',
		},
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/ThemeSwitcher',
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base Story showing the standalone wrapper
export const Default: Story = {};

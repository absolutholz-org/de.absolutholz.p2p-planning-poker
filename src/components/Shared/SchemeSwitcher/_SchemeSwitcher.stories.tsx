import type { Meta, StoryObj } from '@storybook/react-vite';

import { SchemeSwitcher } from './_SchemeSwitcher';

const meta = {
	component: SchemeSwitcher,
	parameters: {
		backgrounds: {
			default: 'light',
		},
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/SchemeSwitcher',
} satisfies Meta<typeof SchemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base Story showing the standalone wrapper
export const Default: Story = {};

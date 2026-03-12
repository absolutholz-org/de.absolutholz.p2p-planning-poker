import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from './_IconButton';

const meta = {
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		'aria-label': 'Rocket',
		icon: '🚀',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		'aria-label': 'Settings',
		icon: '⚙️',
		variant: 'secondary',
	},
};

export const Danger: Story = {
	args: {
		'aria-label': 'Delete',
		icon: '🗑️',
		variant: 'danger',
	},
};

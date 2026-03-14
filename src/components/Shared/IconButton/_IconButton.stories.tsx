import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from './_IconButton';

const meta = {
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Actions/IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		'aria-label': 'Launch app',
		icon: 'play_arrow',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		'aria-label': 'Open settings',
		icon: 'settings',
		variant: 'secondary',
	},
};

export const Danger: Story = {
	args: {
		'aria-label': 'Delete item',
		icon: 'delete',
		variant: 'danger',
	},
};

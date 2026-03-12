import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './_Button';

const meta = {
	args: {
		children: 'Button Label',
		variant: 'primary',
	},
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
	args: {
		...Default.args,
		variant: 'secondary',
	},
};

export const Danger: Story = {
	args: {
		...Default.args,
		variant: 'danger',
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const WithIcon: Story = {
	args: {
		...Default.args,
		icon: <span aria-hidden="true">🚀</span>,
	},
};

export const IconOnly: Story = {
	args: {
		children: undefined,
		icon: <span aria-hidden="true">⚙️</span>,
		variant: 'secondary',
	},
};

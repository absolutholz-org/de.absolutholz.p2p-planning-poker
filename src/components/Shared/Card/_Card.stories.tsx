import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './_Card';

const meta = {
	args: {
		isHidden: false,
		isSelected: false,
		value: '5',
	},
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/Card',
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
	args: {
		...Default.args,
		isSelected: true,
	},
};

export const Hidden: Story = {
	args: {
		...Default.args,
		isHidden: true,
	},
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { VisuallyHidden } from './_VisuallyHidden';

const meta = {
	args: {
		children: 'I am hidden but readable by screen readers',
	},
	component: VisuallyHidden,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/VisuallyHidden',
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

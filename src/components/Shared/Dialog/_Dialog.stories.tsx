import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dialog } from './_Dialog';

const meta = {
	args: {
		cancelText: 'Cancel',
		confirmText: 'Reset Votes',
		isOpen: true,
		message: 'Are you sure you want to clear all current votes?',
		title: 'Reset Board',
	},
	argTypes: {
		onCancel: { action: 'cancelled' },
		onConfirm: { action: 'confirmed' },
	},
	component: Dialog,
	parameters: {
		layout: 'fullscreen', // Dialog uses fixed positioning
	},
	tags: ['autodocs'],
	title: 'Shared/Dialog',
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
	args: {
		...Default.args,
		confirmText: 'Leave',
		message: 'If you leave, your active connection will be severed.',
		title: 'Leave Room',
	},
};

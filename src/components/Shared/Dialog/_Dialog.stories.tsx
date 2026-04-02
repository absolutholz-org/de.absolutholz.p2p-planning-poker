import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button';
import { Dialog } from './_Dialog';

const meta = {
	args: {
		cancelText: 'Cancel',
		confirmText: 'Reset Votes',
		isOpen: true,
		message: 'Are you sure you want to clear all current votes?',
		onCancel: () => {},
		onConfirm: () => {},
		title: 'Reset Board',
	},
	component: Dialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Overlays/Dialog',
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

export const WithTrigger: Story = {
	args: {
		...Default.args,
		isOpen: false,
	},
	render: (args) => {
		const [isOpen, setIsOpen] = useState(args.isOpen);
		return (
			<>
				<Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
				<Dialog
					{...args}
					isOpen={isOpen}
					onCancel={() => setIsOpen(false)}
					onConfirm={() => setIsOpen(false)}
				/>
			</>
		);
	},
};

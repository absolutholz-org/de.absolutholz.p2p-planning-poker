import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './_Input';

const meta = {
	argTypes: {
		error: { control: 'text' },
		label: { control: 'text' },
		placeholder: { control: 'text' },
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'email', 'number', 'tel', 'url'],
		},
	},
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Inputs/Input',
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 'input-default',
		label: 'User Name',
		placeholder: 'Enter your name...',
	},
};

export const WithError: Story = {
	args: {
		error: 'This field is required',
		id: 'input-with-error',
		label: 'Email Address',
		placeholder: 'email@example.com',
		value: 'invalid-email',
	},
};

export const Password: Story = {
	args: {
		id: 'input-password',
		label: 'Secret Code',
		placeholder: '••••••••',
		type: 'password',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		id: 'input-disabled',
		label: 'Locked Field',
		value: 'Cannot edit this',
	},
};

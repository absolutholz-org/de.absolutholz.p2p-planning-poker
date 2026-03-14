import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Input } from '../Input';
import { Form } from './_Form';

const meta = {
	component: Form,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/Form',
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<Input
					id="name"
					label="Name"
					placeholder="Enter your name"
					required
				/>
				<Input
					id="email"
					label="Email"
					type="email"
					placeholder="Enter your email"
					required
				/>
				<Button type="submit">Submit</Button>
			</>
		),
	},
};

export const WithError: Story = {
	args: {
		children: (
			<>
				<Input
					id="name"
					label="Name"
					placeholder="Enter your name"
					required
				/>
				<Button type="submit">Submit</Button>
			</>
		),
		error: 'Please fix the errors below before submitting.',
	},
};

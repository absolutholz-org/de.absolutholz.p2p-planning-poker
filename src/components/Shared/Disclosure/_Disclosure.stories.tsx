import type { Meta, StoryObj } from '@storybook/react-vite';

import { Disclosure } from './_Disclosure';

const meta = {
	args: {
		children: (
			<div>
				<h4>Serverless & Private</h4>
				<p>Your data never touches a server.</p>
			</div>
		),
		icon: 'info',
		title: 'How it works',
	},
	component: Disclosure,
	tags: ['autodocs'],
	title: 'Primitives/Layout/Disclosure',
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
	args: {
		icon: undefined,
	},
};

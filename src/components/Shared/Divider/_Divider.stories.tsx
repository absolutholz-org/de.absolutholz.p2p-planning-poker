import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './_Divider';

const meta: Meta<typeof Divider> = {
	component: Divider,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/Divider',
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
	args: {},
};

export const WithText: Story = {
	args: {
		children: 'Or',
	},
};

export const HideOnDesktop: Story = {
	args: {
		hideOnDesktop: true,
	},
};

export const HideOnDesktopWithText: Story = {
	args: {
		children: 'Section Divider',
		hideOnDesktop: true,
	},
};

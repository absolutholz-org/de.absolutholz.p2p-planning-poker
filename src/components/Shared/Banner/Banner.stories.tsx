import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
	component: Banner,
	tags: ['autodocs'],
	title: 'PRIMITIVES/Display/Banner',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		action: <Button variant="primary">Reveal Now</Button>,
		message: 'Everyone is ready!',
		variant: 'success',
	},
};

export const Info: Story = {
	args: {
		message: 'Waiting for others to vote...',
		variant: 'info',
	},
};

export const Warning: Story = {
	args: {
		message: 'Connection lost. Trying to reconnect...',
		variant: 'warning',
	},
};

export const Danger: Story = {
	args: {
		message: 'Connection failed. Please try again later.',
		variant: 'danger',
	},
};

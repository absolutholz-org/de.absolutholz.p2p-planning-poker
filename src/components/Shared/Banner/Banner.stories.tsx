import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
	args: {
		message: 'Everyone is ready!',
		variant: 'success',
	},
	component: Banner,
	tags: ['autodocs'],
	title: 'Shared/Banner',
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Success: Story = {
	args: {
		action: (
			<Button size="sm" variant="primary">
				Reveal Now
			</Button>
		),
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

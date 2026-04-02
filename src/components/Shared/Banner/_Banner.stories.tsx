import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Banner } from './_Banner';

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
		statusLabel: 'SUCCESS',
		variant: 'success',
	},
};

export const Info: Story = {
	args: {
		message: 'Waiting for others to vote...',
		statusLabel: 'INFO',
		variant: 'info',
	},
};

export const Warning: Story = {
	args: {
		message: 'Connection lost. Trying to reconnect...',
		statusLabel: 'WARNING',
		variant: 'warning',
	},
};

export const Danger: Story = {
	args: {
		message: 'Connection failed. Please try again later.',
		statusLabel: 'DANGER',
		variant: 'danger',
	},
};

export const SystemAnnouncement: Story = {
	args: {
		message:
			'A synchronized reset has been triggered by the session host. Please prepare for a fresh round of voting. All current selections will be cleared across all peers to maintain state integrity.',
		statusLabel: 'SYSTEM ANNOUNCEMENT',
		variant: 'info',
	},
};

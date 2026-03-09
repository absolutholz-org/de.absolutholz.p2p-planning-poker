import type { Meta, StoryObj } from '@storybook/react-vite';

import { ParticipantConnected } from './_ParticipantConnected';

const meta = {
	component: ParticipantConnected,
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Room/Roster/Participant/ParticipantConnected',
} satisfies Meta<typeof ParticipantConnected>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isHost: false,
		isMe: false,
		isRevealed: false,
		name: 'Alice',
		status: 'thinking',
		vote: null,
	},
};

export const Ready: Story = {
	args: {
		isHost: false,
		isMe: false,
		isRevealed: false,
		name: 'Alice',
		status: 'ready',
		vote: '5',
	},
};

export const Revealed: Story = {
	args: {
		isHost: false,
		isMe: false,
		isRevealed: true,
		name: 'Alice',
		status: 'ready',
		vote: '5',
	},
};

export const IsHost: Story = {
	args: {
		isHost: true,
		isMe: false,
		isRevealed: false,
		name: 'Bob',
		status: 'thinking',
		vote: null,
	},
};

export const IsMe: Story = {
	args: {
		isHost: false,
		isMe: true,
		isRevealed: false,
		name: 'Charlie',
		status: 'thinking',
		vote: null,
	},
};

export const Disconnected: Story = {
	args: {
		isHost: false,
		isMe: false,
		isRevealed: false,
		name: 'Dave',
		status: 'disconnected',
		vote: null,
	},
};

export const DisconnectedWithVote: Story = {
	args: {
		isHost: false,
		isMe: false,
		isRevealed: true,
		name: 'Dave',
		status: 'disconnected',
		vote: '13',
	},
};

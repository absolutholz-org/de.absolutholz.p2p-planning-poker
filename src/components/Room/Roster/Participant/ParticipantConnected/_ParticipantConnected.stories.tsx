import type { Meta, StoryObj } from '@storybook/react-vite';

import { ParticipantConnected } from '.';

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
		disconnectedText: 'test',
		isConnected: true,
		isHost: false,
		isMe: false,
		isRevealed: false,
		name: 'Alice',
		readyText: 'test',
		thinkingText: 'test',
		vote: null,
		youText: 'test',
	},
};

export const Ready: Story = {
	args: {
		...Default.args,
		vote: '5',
	},
};

export const Revealed: Story = {
	args: {
		...Default.args,
		isHost: false,
		isMe: false,
		isRevealed: true,
		name: 'Alice',
		vote: '5',
	},
};

export const IsHost: Story = {
	args: {
		...Default.args,
		isHost: true,
		isMe: false,
		isRevealed: false,
		name: 'Bob',
		vote: null,
	},
};

export const IsMe: Story = {
	args: {
		...Default.args,
		isHost: false,
		isMe: true,
		isRevealed: false,
		name: 'Charlie',
		vote: null,
	},
};

export const Disconnected: Story = {
	args: {
		...Default.args,
		isHost: false,
		isMe: false,
		isRevealed: false,
		name: 'Dave',
		vote: null,
	},
};

export const DisconnectedWithVote: Story = {
	args: {
		...Default.args,
		isHost: false,
		isMe: false,
		isRevealed: true,
		name: 'Dave',
		vote: '13',
	},
};

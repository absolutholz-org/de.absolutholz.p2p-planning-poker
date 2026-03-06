import type { Meta, StoryObj } from '@storybook/react-vite';

import type { User } from '../../../../types/domain';
import { Participant } from './_Participant';

const meta = {
	component: Participant,
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
	title: 'Room/Roster/Participant',
} satisfies Meta<typeof Participant>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUser: User = {
	id: 'user-1',
	isConnected: true,
	isHost: false,
	name: 'Alice',
	vote: null,
};

export const Default: Story = {
	args: {
		isRevealed: false,
		user: baseUser,
	},
};

export const HasVoted: Story = {
	args: {
		isRevealed: false,
		user: {
			...baseUser,
			vote: '5',
		},
	},
};

export const VotedAndRevealed: Story = {
	args: {
		isRevealed: true,
		user: {
			...baseUser,
			vote: '8',
		},
	},
};

export const IsHost: Story = {
	args: {
		isRevealed: false,
		user: {
			...baseUser,
			isHost: true,
		},
	},
};

export const Disconnected: Story = {
	args: {
		isRevealed: false,
		user: {
			...baseUser,
			isConnected: false,
		},
	},
};

export const DisconnectedWithVote: Story = {
	args: {
		isRevealed: true,
		user: {
			...baseUser,
			isConnected: false,
			vote: '13',
		},
	},
};

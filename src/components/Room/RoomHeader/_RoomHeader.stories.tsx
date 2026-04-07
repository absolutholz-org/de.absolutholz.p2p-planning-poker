import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { RoomContext } from '../../../context/RoomContext';
import { RoomHeader } from './_RoomHeader';

const MOCK_ROOM_STATE = {
	allowRevoteAfterReveal: false,
	isRevealed: false,
	roomId: '1234-abcd-5678',
	users: [
		{ id: '1', isConnected: true, isHost: true, name: 'Alice', vote: null },
		{
			id: '2',
			isConnected: true,
			isHost: false,
			name: 'Bob',
			vote: '5' as const,
		},
	],
};

const meta = {
	args: {
		// Custom prop for dynamic context injection in Storybook
		mockNoVotes: false,
		mockRevealed: false,
	},
	component: RoomHeader,
	decorators: [
		(Story, context) => {
			return (
				<RoomContext.Provider
					value={{
						castVote: () => {},
						connectionStatus: 'connected',
						error: null,
						isHost: true,
						leaveRoom: () => {},
						myPeerId: '1',
						roomState: {
							allowRevoteAfterReveal: false,
							isRevealed: !!context.args.mockRevealed,
							roomId: 'room-123',
							timer: null,
							users: context.args.mockNoVotes
								? MOCK_ROOM_STATE.users.map((u) => ({
										...u,
										vote: null,
									}))
								: context.args.mockAllVoted
									? MOCK_ROOM_STATE.users.map((u) => ({
											...u,
											vote: '1' as const,
										}))
									: MOCK_ROOM_STATE.users,
						},
						sendAction: () => {},
						updateName: () => {},
						userName: 'Alice',
					}}
				>
					<Story />
				</RoomContext.Provider>
			);
		},
	],
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	title: 'Room/RoomHeader',
} satisfies Meta<
	ComponentProps<typeof RoomHeader> & {
		mockNoVotes?: boolean;
		mockRevealed?: boolean;
		mockAllVoted?: boolean;
	}
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Revealed: Story = {
	args: {
		// Custom prop for dynamic context injection
		mockRevealed: true,
	},
};

export const NoVotes: Story = {
	args: {
		mockNoVotes: true,
	},
};

export const AllVoted: Story = {
	args: {
		mockAllVoted: true,
	},
};

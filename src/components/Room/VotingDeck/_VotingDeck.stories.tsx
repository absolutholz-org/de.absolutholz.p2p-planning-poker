import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { RoomContext } from '../../../context/RoomContext';
import { VotingDeck } from './_VotingDeck';

const MOCK_ROOM_STATE = {
	isRevealed: false,
	roomId: '1234-abcd',
	users: [
		{ id: '1', isConnected: true, isHost: true, name: 'Alice', vote: null },
	],
};

const meta = {
	args: {
		// Mock contextual state
		mockRevealed: false,
	},
	component: VotingDeck,
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
						roomState: {
							isRevealed: !!context.args.mockRevealed,
							roomId: '1234-abcd',
							timer: null,
							users: MOCK_ROOM_STATE.users,
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
		layout: 'padded',
	},
	tags: ['autodocs'],
	title: 'Room/VotingDeck',
} satisfies Meta<
	ComponentProps<typeof VotingDeck> & { mockRevealed?: boolean }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DisabledWhenRevealed: Story = {
	args: {
		// Mock contextual state
		mockRevealed: true,
	},
};

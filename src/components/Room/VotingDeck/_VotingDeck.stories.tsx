import type { Meta, StoryObj } from '@storybook/react-vite';

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
						initGuest: () => {},
						initHost: () => {},
						leaveRoom: () => {},
						localUserId: '1',
						resetBoard: () => {},
						revealVotes: () => {},
						roomState: context.args.mockRevealed
							? { ...MOCK_ROOM_STATE, isRevealed: true }
							: MOCK_ROOM_STATE,
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
	React.ComponentProps<typeof VotingDeck> & { mockRevealed?: boolean }
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

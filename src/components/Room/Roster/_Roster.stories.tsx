import type { Meta, StoryObj } from '@storybook/react-vite';

import { RoomContext } from '../../../context/RoomContext';
import { Roster } from './_Roster';

const MOCK_USERS = [
	{
		id: '1',
		isConnected: true,
		isHost: true,
		name: 'Alice (Host)',
		vote: '5' as const,
	},
	{ id: '2', isConnected: true, isHost: false, name: 'Bob', vote: null },
	{
		id: '3',
		isConnected: true,
		isHost: false,
		name: 'Charlie',
		vote: '?' as const,
	},
	{
		id: '4',
		isConnected: false,
		isHost: false,
		name: 'Dave',
		vote: '13' as const,
	},
	{ id: '5', isConnected: true, isHost: false, name: 'Eve', vote: null },
];

const MOCK_ROOM_STATE = {
	isRevealed: false,
	roomId: '1234-abcd',
	users: MOCK_USERS,
};

const meta = {
	args: {
		// Mock contextual state injected to room
		mockRevealed: false,
	},
	component: Roster,
	decorators: [
		(Story, context) => {
			return (
				<RoomContext.Provider
					value={{
						castVote: () => {},
						error: null,
						initGuest: () => {},
						initHost: () => {},
						leaveRoom: () => {},
						localUserId: '2', // Let's pretend we are Bob
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
	title: 'Room/Roster',
} satisfies Meta<
	React.ComponentProps<typeof Roster> & { mockRevealed?: boolean }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HiddenVotes: Story = {};

export const RevealedVotes: Story = {
	args: {
		// @ts-expect-error Mock contextual state
		mockRevealed: true,
	},
};

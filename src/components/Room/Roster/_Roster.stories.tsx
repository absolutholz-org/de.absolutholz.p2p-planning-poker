import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

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
						connectionStatus: 'connected',
						error: null,
						isHost: false,
						leaveRoom: () => {},
						myPeerId: '1',
						roomState: {
							isRevealed: !!context.args.mockRevealed,
							roomId: '1234-abcd',
							timer: null,
							users: MOCK_USERS,
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
	title: 'Room/Roster',
} satisfies Meta<ComponentProps<typeof Roster> & { mockRevealed?: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HiddenVotes: Story = {};

export const RevealedVotes: Story = {
	args: {
		// Mock contextual state
		mockRevealed: true,
	},
};

export const FullRoom: Story = {
	decorators: [
		(Story) => {
			const fullUsers = Array.from({ length: 12 }).map((_, i) => ({
				id: String(i + 1),
				isConnected: true,
				isHost: i === 0,
				name: `Player ${i + 1}`,
				vote: '5' as const,
			}));

			return (
				<RoomContext.Provider
					value={{
						castVote: () => {},
						connectionStatus: 'connected',
						error: null,
						isHost: false,
						leaveRoom: () => {},
						myPeerId: '1',
						roomState: {
							...MOCK_ROOM_STATE,
							timer: null,
							users: fullUsers,
						},
						sendAction: () => {},
						updateName: () => {},
						userName: 'Player 1',
					}}
				>
					<Story />
				</RoomContext.Provider>
			);
		},
	],
};

export const JustHost: Story = {
	decorators: [
		(Story) => {
			const hostUser = [
				{
					id: '1',
					isConnected: true,
					isHost: true,
					name: 'Alice (Host)',
					vote: null,
				},
			];

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
							...MOCK_ROOM_STATE,
							timer: null,
							users: hostUser,
						},
						sendAction: () => {},
						updateName: () => {},
						userName: 'Alice (Host)',
					}}
				>
					<Story />
				</RoomContext.Provider>
			);
		},
	],
};

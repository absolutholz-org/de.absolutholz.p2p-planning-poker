import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { RoomContext } from '../../../context/RoomContext';
import { RoomHeader } from './_RoomHeader';

const MOCK_ROOM_STATE = {
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
						roomState: {
							isRevealed: !!context.args.mockRevealed,
							roomId: 'room-123',
							timer: null,
							users: MOCK_ROOM_STATE.users,
						},
						sendAction: () => {},
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
	ComponentProps<typeof RoomHeader> & { mockRevealed?: boolean }
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

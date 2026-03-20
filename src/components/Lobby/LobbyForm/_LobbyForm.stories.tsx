import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { RoomContext } from '../../../context/RoomContext';
import { LobbyForm } from './_LobbyForm';

const meta = {
	args: {},
	component: LobbyForm,
	decorators: [
		(Story, context) => {
			// Provide a mock context for the LobbyForm which uses useRoom()
			return (
				<RoomContext.Provider
					value={{
						castVote: () => {},
						connectionStatus: 'idle',
						error: context.args.error || null,
						isHost: false,
						leaveRoom: () => {},
						myPeerId: 'guest-1',
						roomState: null,
						sendAction: () => {},
						updateName: () => {},
						userName: '',
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
	title: 'Lobby/LobbyForm',
} satisfies Meta<ComponentProps<typeof LobbyForm> & { error?: string }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
	args: {
		// Mocking the context error via args for the decorator
		error: 'Failed to connect to the host. Please check the room code.',
	},
};

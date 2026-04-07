import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RoomContext } from '../../../context/RoomContext';
import type { RoomContextValue } from '../../../context/RoomContext.types';
import type { PeerMessage } from '../../../types/domain';
import { SettingsDialog } from './_SettingsDialog';

const meta = {
	args: {
		isOpen: true,
		onClose: () => {
			/* No-op for storybook defaults */
		},
	},
	component: SettingsDialog,
	parameters: {
		layout: 'centered',
	},
	title: 'Room/SettingsDialog',
} satisfies Meta<typeof SettingsDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function MockRoomProvider({
	children,
	initialRevote,
}: {
	children: React.ReactNode;
	initialRevote: boolean;
}) {
	const [revote, setRevote] = useState(initialRevote);

	const mockValue = {
		roomState: {
			allowRevoteAfterReveal: revote,
			isRevealed: false,
			roomId: 'mock',
			timer: null,
			users: [],
		},
		sendAction: (action: PeerMessage) => {
			if (action.type === 'TOGGLE_ALLOW_REVOTE') {
				setRevote(!revote);
			}
		},
	} as unknown as RoomContextValue;

	return (
		<RoomContext.Provider value={mockValue}>
			{children}
		</RoomContext.Provider>
	);
}

export const Default: Story = {
	render: (args) => {
		const [isOpen, setIsOpen] = useState(true);
		return (
			<MockRoomProvider initialRevote={false}>
				<button onClick={() => setIsOpen(true)}>Open Settings</button>
				<SettingsDialog
					{...args}
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
				/>
			</MockRoomProvider>
		);
	},
};

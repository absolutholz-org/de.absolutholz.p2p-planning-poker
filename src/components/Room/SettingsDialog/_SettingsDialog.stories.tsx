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
	initialSettings,
}: {
	children: React.ReactNode;
	initialSettings: {
		allowRevoteAfterReveal: boolean;
		anyoneCanReveal: boolean;
		revealOnlyWhenAllVoted: boolean;
	};
}) {
	const [settings, setSettings] = useState(initialSettings);

	const mockValue = {
		roomState: {
			isRevealed: false,
			roomId: 'mock',
			settings,
			timer: null,
			users: [],
		},
		sendAction: (action: PeerMessage) => {
			if (action.type === 'TOGGLE_ALLOW_REVOTE') {
				setSettings((s) => ({
					...s,
					allowRevoteAfterReveal: !s.allowRevoteAfterReveal,
				}));
			} else if (action.type === 'TOGGLE_ANYONE_CAN_REVEAL') {
				setSettings((s) => ({
					...s,
					anyoneCanReveal: !s.anyoneCanReveal,
				}));
			} else if (action.type === 'TOGGLE_REVEAL_ONLY_WHEN_ALL_VOTED') {
				setSettings((s) => ({
					...s,
					revealOnlyWhenAllVoted: !s.revealOnlyWhenAllVoted,
				}));
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
			<MockRoomProvider
				initialSettings={{
					allowRevoteAfterReveal: false,
					anyoneCanReveal: false,
					revealOnlyWhenAllVoted: false,
				}}
			>
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

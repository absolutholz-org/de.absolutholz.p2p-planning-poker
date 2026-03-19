import type { ReactNode } from 'react';

import type { PeerMessage, RoomState, VoteValue } from '../types/domain';

export interface RoomContextValue {
	connectionStatus: 'idle' | 'connecting' | 'connected' | 'error';
	error: string | null;
	roomState: RoomState | null;
	leaveRoom: () => void;
	isHost: boolean;
	castVote: (vote: VoteValue) => void;
	sendAction: (message: PeerMessage) => void;
	updateName: (name: string) => void;
	userName: string;
}

export interface RoomProviderProps {
	children: ReactNode;
	roomId: string;
	name: string;
	role: 'host' | 'guest';
}

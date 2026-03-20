import type { ReactNode } from 'react';

import type { PeerMessage, RoomState, VoteValue } from '../types/domain';

export interface RoomContextValue {
	castVote: (vote: VoteValue) => void;
	connectionStatus: 'idle' | 'connecting' | 'connected' | 'error';
	error: string | null;
	isHost: boolean;
	leaveRoom: () => void;
	myPeerId: string | null;
	roomState: RoomState | null;
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

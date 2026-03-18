import { createContext, type ReactNode, useContext } from 'react';

import { type ConnectionStatus, usePeerSession } from '../hooks/usePeerSession';
import type { RoomState, VoteValue } from '../types/domain';

export interface RoomContextValue {
	castVote: (vote: VoteValue) => void;
	connectionStatus: ConnectionStatus;
	error: null | string;
	iceState: string | null;
	initGuest: (roomId: string, name: string, requestedPeerId?: string) => void;
	initHost: (
		name: string,
		requestedPeerId?: string,
		restoredState?: RoomState,
	) => void;
	leaveRoom: (clearStorage?: boolean) => void;
	localUserId: null | string;
	pauseTimer: () => void;
	resetBoard: () => void;
	resetTimer: () => void;
	revealVotes: () => void;
	roomState: RoomState | null;
	setTimer: (duration: number) => void;
	startTimer: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const RoomContext = createContext<RoomContextValue | undefined>(
	undefined,
);

export function RoomProvider({ children }: { children: ReactNode }) {
	const {
		castVote,
		connectionStatus,
		error,
		iceState,
		initGuest,
		initHost,
		leaveRoom,
		localUserId,
		pauseTimer,
		resetBoard,
		resetTimer,
		revealVotes,
		roomState,
		setTimer,
		startTimer,
	} = usePeerSession();

	return (
		<RoomContext.Provider
			value={{
				castVote,
				connectionStatus,
				error,
				iceState,
				initGuest,
				initHost,
				leaveRoom,
				localUserId,
				pauseTimer,
				resetBoard,
				resetTimer,
				revealVotes,
				roomState,
				setTimer,
				startTimer,
			}}
		>
			{children}
		</RoomContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
	const context = useContext(RoomContext);
	if (context === undefined) {
		throw new Error('useRoom must be used within a RoomProvider');
	}
	return context;
}

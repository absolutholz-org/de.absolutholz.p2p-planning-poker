import { createContext, type ReactNode, useContext } from 'react';

import { usePeerSession } from '../hooks/usePeerSession';
import type { RoomState, VoteValue } from '../types/domain';

interface RoomContextValue {
	castVote: (vote: VoteValue) => void;
	error: null | string;
	initGuest: (roomId: string, name: string) => void;
	initHost: (
		name: string,
		requestedPeerId?: string,
		restoredState?: RoomState,
	) => void;
	leaveRoom: () => void;
	localUserId: null | string;
	resetBoard: () => void;
	revealVotes: () => void;
	roomState: RoomState | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const RoomContext = createContext<RoomContextValue | undefined>(
	undefined,
);

export function RoomProvider({ children }: { children: ReactNode }) {
	const {
		castVote,
		error,
		initGuest,
		initHost,
		leaveRoom,
		localUserId,
		resetBoard,
		revealVotes,
		roomState,
	} = usePeerSession();

	return (
		<RoomContext.Provider
			value={{
				castVote,
				error,
				initGuest,
				initHost,
				leaveRoom,
				localUserId,
				resetBoard,
				revealVotes,
				roomState,
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

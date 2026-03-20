import { useContext } from 'react';

import { RoomContext } from '../context/RoomContext';
import type { RoomContextValue } from '../context/RoomContext.types';

export function useRoom() {
	const context = useContext(RoomContext);
	if (context === undefined) {
		return {
			castVote: () => {},
			connectionStatus: 'idle',
			error: null,
			isHost: false,
			leaveRoom: () => {},
			myPeerId: null,
			roomState: null,
			sendAction: () => {},
			updateName: () => {},
			userName: '',
		} as RoomContextValue;
	}
	return context;
}

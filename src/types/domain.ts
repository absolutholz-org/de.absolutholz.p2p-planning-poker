export type VoteValue =
	| '1'
	| '2'
	| '3'
	| '5'
	| '8'
	| '13'
	| '21'
	| '☕️'
	| '?'
	| null;

export interface User {
	id: string; // The PeerJS ID (and Room Code for the Host)
	isConnected: boolean; // Tracks if a Guest's data channel dropped
	isHost: boolean;
	name: string; // Display name inputted at lobby
	vote: VoteValue; // Their current selected card (null if pending)
}

export interface RoomState {
	isRevealed: boolean; // Controls whether Guests can see other people's votes
	roomId: string;
	users: User[];
}

// ----------------------------------------
// PeerJS Data Channel Message Payloads
// ----------------------------------------

export type PeerMessage =
	| { payload: { name: string; peerId: string }; type: 'JOIN_ROOM' }
	| { payload: { vote: VoteValue }; type: 'SUBMIT_VOTE' }
	| { payload: undefined; type: 'TOGGLE_REVEAL' }
	| { payload: undefined; type: 'RESET_SESSION' }
	| { payload: { state: RoomState }; type: 'SYNC_STATE' };

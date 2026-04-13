import { type FIBONACCI_SCALE } from '../constants/domain';

type BaseVoteValue = (typeof FIBONACCI_SCALE)[number];
export type VoteValue = BaseVoteValue | null;

export interface User {
	id: string; // The PeerJS ID (and Room Code for the Host)
	isConnected: boolean; // Tracks if a Guest's data channel dropped
	isHost: boolean;
	name: string; // Display name inputted at lobby
	vote: VoteValue; // Their current selected card (null if pending)
}

export interface TimerState {
	duration: number; // Duration in seconds
	isRunning: boolean;
	remainingTime: number; // Remaining time in seconds
	startedAt: null | number; // timestamp when timer started/resumed
}

export interface RoomSettings {
	allowRevoteAfterReveal: boolean; // Controls whether guests can change votes after reveal
	anyoneCanReveal: boolean; // Allows guests to reveal votes
	revealOnlyWhenAllVoted: boolean; // Disables reveal until everyone has voted
}

export interface RoomState {
	isRevealed: boolean; // Controls whether Guests can see other people's votes
	roomId: string;
	settings: RoomSettings;
	timer: null | TimerState;
	users: User[];
}

// ----------------------------------------
// PeerJS Data Channel Message Payloads
// ----------------------------------------

export type PeerMessage =
	| { payload: { name: string; peerId: string }; type: 'JOIN_ROOM' }
	| { payload: { vote: VoteValue }; type: 'SUBMIT_VOTE' }
	| { payload: undefined; type: 'TOGGLE_REVEAL' }
	| { payload: undefined; type: 'TOGGLE_ALLOW_REVOTE' }
	| { payload: undefined; type: 'TOGGLE_ANYONE_CAN_REVEAL' }
	| { payload: undefined; type: 'TOGGLE_REVEAL_ONLY_WHEN_ALL_VOTED' }
	| { payload: undefined; type: 'RESET_SESSION' }
	| { payload: { state: RoomState }; type: 'SYNC_STATE' }
	| { payload: { duration: number }; type: 'TIMER_SET' }
	| { payload: undefined; type: 'TIMER_START' }
	| { payload: undefined; type: 'TIMER_PAUSE' }
	| { payload: undefined; type: 'TIMER_RESET' }
	| { payload: { name: string }; type: 'CHANGE_NAME' };

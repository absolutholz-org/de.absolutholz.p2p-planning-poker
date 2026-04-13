import type { VoteValue } from '../../../../types/domain';

export interface IParticipant {
	isHost?: boolean;
	isMe?: boolean;
	isRevealed: boolean;
	isConnected: boolean;
	name: string;
	vote?: VoteValue;
	readyText: string;
	thinkingText: string;
	disconnectedText: string;
}

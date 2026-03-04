import { useRoom } from '../../../context/RoomContext';
import type { VoteValue } from '../../../types/domain';
import { Card } from '../../Shared/Card';
import * as S from './_VotingDeck.styles';

const FIBONACCI_SCALE: VoteValue[] = [
	'1',
	'2',
	'3',
	'5',
	'8',
	'13',
	'21',
	'Coffee',
	'?',
];

export function VotingDeck() {
	const { castVote, localUserId, roomState } = useRoom();

	if (!roomState) return null;

	// Find the current user's vote
	const myUser = roomState.users.find((u) => u.id === localUserId);
	const myVote = myUser?.vote;

	return (
		<S.DeckContainer aria-label="Voting deck">
			<S.SectionTitle>Cast Your Vote</S.SectionTitle>
			<S.Grid>
				{FIBONACCI_SCALE.map((value) => (
					<Card
						key={String(value)}
						value={value}
						isSelected={myVote === value}
						onClick={() => castVote(value)}
						disabled={roomState.isRevealed}
					/>
				))}
			</S.Grid>
		</S.DeckContainer>
	);
}

import styled from '@emotion/styled';

import { useRoom } from '../../context/RoomContext';
import type { VoteValue } from '../../types/domain';
import { Card } from '../Shared/Card';

const DeckContainer = styled.section`
	padding: var(--sys-spacing-xl) 0;
	border-top: 1px solid var(--sys-color-border);
	margin-top: var(--sys-spacing-xl);
`;

const SectionTitle = styled.h2`
	font-size: 1.125rem;
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-md);
	text-align: center;
	font-weight: 600;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
	gap: var(--sys-spacing-md);
	justify-items: center;
	max-width: 600px;
	margin: 0 auto;
`;

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
		<DeckContainer aria-label="Voting deck">
			<SectionTitle>Cast Your Vote</SectionTitle>
			<Grid>
				{FIBONACCI_SCALE.map((value) => (
					<Card
						key={String(value)}
						value={value}
						isSelected={myVote === value}
						onClick={() => castVote(value)}
						disabled={roomState.isRevealed}
					/>
				))}
			</Grid>
		</DeckContainer>
	);
}

import { useTranslation } from 'react-i18next';

import { FIBONACCI_SCALE } from '../../../constants/domain';
import { STORAGE_KEYS } from '../../../constants/storage';
import { useRoom } from '../../../hooks/useRoom';
import { Card } from '../../Shared/Card';
import * as S from './_VotingDeck.styles';

export function VotingDeck() {
	const { t } = useTranslation();
	const { castVote, roomState } = useRoom();

	if (!roomState) return null;

	// Find the current user's vote
	const userName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
	const myUser = roomState.users.find((u) => u.name === userName);
	const myVote = myUser?.vote;

	return (
		<S.DeckContainer aria-labelledby="voting-deck-title">
			<S.SectionTitle id="voting-deck-title">
				{t('room.deck.title')}
			</S.SectionTitle>
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

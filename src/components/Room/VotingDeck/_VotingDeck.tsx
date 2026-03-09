import { useTranslation } from 'react-i18next';

import { FIBONACCI_SCALE } from '../../../constants/domain';
import { useRoom } from '../../../context/RoomContext';
import { Card } from '../../Shared/Card';
import * as S from './_VotingDeck.styles';

export function VotingDeck() {
	const { t } = useTranslation();
	const { castVote, localUserId, roomState } = useRoom();

	if (!roomState) return null;

	// Find the current user's vote
	const myUser = roomState.users.find((u) => u.id === localUserId);
	const myVote = myUser?.vote;

	return (
		<S.DeckContainer aria-label={t('room.deck.aria_label')}>
			<S.SectionTitle>{t('room.deck.title')}</S.SectionTitle>
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

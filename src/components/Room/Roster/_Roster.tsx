import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../context/RoomContext';
import * as S from './_Roster.styles';
import { Participant } from './Participant';

export function Roster() {
	const { t } = useTranslation();
	const { roomState } = useRoom();

	if (!roomState) return null;

	return (
		<S.RosterContainer
			aria-label={t('room.roster.aria.label')}
			aria-live="polite"
		>
			<S.SectionTitle>
				<span>{t('room.roster.title_label', 'TEAM ROSTER')}</span>
				<S.VoteCountBadge>
					{roomState.users.filter((u) => u.vote).length} /{' '}
					{roomState.users.length}{' '}
					{t('room.roster.voted_label', 'Voted')}
				</S.VoteCountBadge>
			</S.SectionTitle>

			<S.ParticipantGrid>
				{roomState.users.map((user) => (
					<Participant
						key={user.id}
						user={user}
						isRevealed={roomState.isRevealed}
					/>
				))}
			</S.ParticipantGrid>
		</S.RosterContainer>
	);
}

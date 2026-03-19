import { useTranslation } from 'react-i18next';

import { STORAGE_KEYS } from '../../../constants/storage';
import { useRoom } from '../../../hooks/useRoom';
import * as S from './_Roster.styles';
import { Participant } from './Participant';

export function Roster() {
	const { t } = useTranslation();
	const { roomState } = useRoom();

	if (!roomState) return null;

	const userName = localStorage.getItem(STORAGE_KEYS.USER_NAME);

	return (
		<S.RosterContainer
			aria-label={t('room.roster.aria.label')}
			aria-live="polite"
		>
			<S.SectionTitle>
				<span>{t('room.roster.title')}</span>
				<S.VoteCountBadge>
					{roomState.users.filter((u) => u.vote !== null).length} /{' '}
					{roomState.users.length} {t('room.roster.voted_label')}
				</S.VoteCountBadge>
			</S.SectionTitle>

			<S.ParticipantGrid>
				{roomState.users.map((user) => (
					<Participant
						key={user.id}
						isHost={user.isHost}
						isMe={user.name === userName}
						isRevealed={roomState.isRevealed}
						isConnected={user.isConnected}
						vote={user.vote}
						name={user.name}
						readyText={t('room.roster.ready')}
						thinkingText={t('room.roster.thinking')}
						disconnectedText={t('room.roster.disconnected')}
						youText={t('room.roster.you')}
					/>
				))}
			</S.ParticipantGrid>
		</S.RosterContainer>
	);
}

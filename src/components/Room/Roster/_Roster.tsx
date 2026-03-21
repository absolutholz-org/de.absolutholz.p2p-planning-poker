import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../hooks/useRoom';
import * as S from './_Roster.styles';
import { Participant } from './Participant';

export function Roster() {
	const { t } = useTranslation();
	const { myPeerId, roomState } = useRoom();

	if (!roomState) return null;

	return (
		<S.RosterContainer aria-labelledby="roster-title" aria-live="polite">
			<S.SectionTitle id="roster-title">
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
						isMe={user.id === myPeerId}
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

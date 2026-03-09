import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../context/RoomContext';
import * as S from './_Roster.styles';
import { ParticipantConnected } from './Participant/ParticipantConnected';

export function Roster() {
	const { t } = useTranslation();
	const { localUserId, roomState } = useRoom();

	if (!roomState) return null;

	return (
		<S.RosterContainer
			aria-label={t('room.roster.aria.label')}
			aria-live="polite"
		>
			<S.SectionTitle>
				<span>{t('room.roster.title_label', 'TEAM ROSTER')}</span>
				<S.VoteCountBadge>
					{roomState.users.filter((u) => u.vote !== null).length} /{' '}
					{roomState.users.length}{' '}
					{t('room.roster.voted_label', 'Voted')}
				</S.VoteCountBadge>
			</S.SectionTitle>

			<S.ParticipantGrid>
				{roomState.users.map((user) => (
					<ParticipantConnected
						key={user.id}
						isHost={user.isHost}
						isMe={user.id === localUserId}
						isRevealed={roomState.isRevealed}
						isConnected={user.isConnected}
						vote={user.vote}
						name={user.name}
						readyText={t('room.roster.status.ready')}
						thinkingText={t('room.roster.status.thinking')}
						disconnectedText={t('room.roster.disconnected')}
						youText={t('room.roster.you')}
					/>
				))}
			</S.ParticipantGrid>
		</S.RosterContainer>
	);
}

import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../context/RoomContext';
import { Card } from '../../Shared/Card';
import * as S from './_Roster.styles';

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
					<S.ParticipantSlot
						key={user.id}
						data-connected={user.isConnected}
						data-empty={!user.vote}
					>
						<S.ParticipantInfo>
							<S.Name title={user.name}>
								{user.name} {user.isHost && '👑'}
							</S.Name>
							<S.StatusText>
								{user.vote
									? t('room.roster.status.ready', 'Ready')
									: t(
											'room.roster.status.thinking',
											'Thinking...',
										)}
							</S.StatusText>
							{!user.isConnected && (
								<S.DisconnectedBadge>
									{t('room.roster.disconnected')}
								</S.DisconnectedBadge>
							)}
						</S.ParticipantInfo>

						<S.ParticipantAction>
							{user.vote ? (
								<Card
									value={user.vote}
									isHidden={!roomState.isRevealed}
									tabIndex={-1} // Not interactive
								/>
							) : (
								<S.EmptyStatusCircle />
							)}
						</S.ParticipantAction>
					</S.ParticipantSlot>
				))}
			</S.ParticipantGrid>
		</S.RosterContainer>
	);
}

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
				<span>
					{t('room.roster.title', {
						count: roomState.users.length,
						max: 12,
					})}
				</span>
				{roomState.isRevealed && (
					<span style={{ color: 'var(--sys-color-primary)' }}>
						{t('room.roster.revealed_badge')}
					</span>
				)}
			</S.SectionTitle>

			<S.ParticipantGrid>
				{roomState.users.map((user) => (
					<S.ParticipantSlot
						key={user.id}
						data-connected={user.isConnected}
					>
						{user.vote ? (
							<Card
								value={user.vote}
								isHidden={!roomState.isRevealed}
								tabIndex={-1} // Not interactive
							/>
						) : (
							<S.EmptyCardSlot
								aria-label={t('room.roster.aria.not_voted', {
									name: user.name,
								})}
							/>
						)}

						<S.Name title={user.name}>
							{user.name}{' '}
							{user.isHost && t('room.roster.host_badge')}
						</S.Name>

						{!user.isConnected && (
							<S.DisconnectedBadge>
								{t('room.roster.disconnected')}
							</S.DisconnectedBadge>
						)}
					</S.ParticipantSlot>
				))}
			</S.ParticipantGrid>
		</S.RosterContainer>
	);
}

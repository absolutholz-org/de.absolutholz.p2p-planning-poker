import { useTranslation } from 'react-i18next';

import { Card } from '../../../Shared/Card';
import * as S from './_Participant.styles';
import type { ParticipantProps } from './_Participant.types';

export function Participant({ isRevealed, user }: ParticipantProps) {
	const { t } = useTranslation();

	return (
		<S.ParticipantSlot
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
						: t('room.roster.status.thinking', 'Thinking...')}
				</S.StatusText>
				{!user.isConnected && (
					<S.DisconnectedBadge>
						{t('room.roster.disconnected', 'Disconnected')}
					</S.DisconnectedBadge>
				)}
			</S.ParticipantInfo>

			<S.ParticipantAction>
				{user.vote ? (
					<Card
						value={user.vote}
						isHidden={!isRevealed}
						tabIndex={-1} // Not interactive
					/>
				) : (
					<S.EmptyStatusCircle />
				)}
			</S.ParticipantAction>
		</S.ParticipantSlot>
	);
}

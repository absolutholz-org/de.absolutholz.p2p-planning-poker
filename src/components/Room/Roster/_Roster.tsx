import { useRoom } from '../../../context/RoomContext';
import { Card } from '../../Shared/Card';
import * as S from './_Roster.styles';

export function Roster() {
	const { roomState } = useRoom();

	if (!roomState) return null;

	return (
		<S.RosterContainer aria-label="Team roster" aria-live="polite">
			<S.SectionTitle>
				<span>Team Roster ({roomState.users.length}/12)</span>
				{roomState.isRevealed && (
					<span style={{ color: 'var(--sys-color-primary)' }}>
						Votes Revealed!
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
								aria-label={`${user.name} has not voted yet`}
							/>
						)}

						<S.Name title={user.name}>
							{user.name} {user.isHost && '👑'}
						</S.Name>

						{!user.isConnected && (
							<S.DisconnectedBadge>
								Disconnected
							</S.DisconnectedBadge>
						)}
					</S.ParticipantSlot>
				))}
			</S.ParticipantGrid>
		</S.RosterContainer>
	);
}

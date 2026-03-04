import styled from '@emotion/styled';

import { useRoom } from '../../context/RoomContext';
import { Card } from '../Shared/Card';

const RosterContainer = styled.section`
	max-width: 800px;
	margin: 0 auto;
	padding: var(--sys-spacing-xl) var(--sys-spacing-md);
`;

const SectionTitle = styled.h2`
	font-size: 1.125rem;
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-lg);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ParticipantGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	gap: var(--sys-spacing-lg);
`;

const ParticipantSlot = styled.div<{ 'data-connected': boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sys-spacing-sm);
	opacity: ${(props) => (props['data-connected'] ? 1 : 0.5)};
	transition: opacity 0.2s ease;
`;

const Name = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	color: var(--sys-color-text-primary);
	text-align: center;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const EmptyCardSlot = styled.div`
	min-height: 80px;
	min-width: 60px;
	border: 2px dashed var(--sys-color-border);
	border-radius: var(--sys-radius-lg);
	background-color: transparent;
`;

const DisconnectedBadge = styled.span`
	font-size: 0.75rem;
	color: var(--sys-color-danger);
	background: rgba(239, 68, 68, 0.1);
	padding: 2px 6px;
	border-radius: var(--sys-radius-sm);
`;

export function Roster() {
	const { roomState } = useRoom();

	if (!roomState) return null;

	return (
		<RosterContainer aria-label="Team roster" aria-live="polite">
			<SectionTitle>
				<span>Team Roster ({roomState.users.length}/12)</span>
				{roomState.isRevealed && (
					<span style={{ color: 'var(--sys-color-primary)' }}>
						Votes Revealed!
					</span>
				)}
			</SectionTitle>

			<ParticipantGrid>
				{roomState.users.map((user) => (
					<ParticipantSlot
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
							<EmptyCardSlot
								aria-label={`${user.name} has not voted yet`}
							/>
						)}

						<Name title={user.name}>
							{user.name} {user.isHost && '👑'}
						</Name>

						{!user.isConnected && (
							<DisconnectedBadge>Disconnected</DisconnectedBadge>
						)}
					</ParticipantSlot>
				))}
			</ParticipantGrid>
		</RosterContainer>
	);
}

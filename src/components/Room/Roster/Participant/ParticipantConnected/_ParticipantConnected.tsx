import * as S from './_ParticipantConnected.styles';
import type { IParticipantConnected } from './_ParticipantConnected.types';

export function ParticipantConnected({
	disconnectedText,
	isConnected,
	isHost,
	isMe,
	isRevealed,
	name,
	readyText,
	thinkingText,
	vote,
	youText,
}: IParticipantConnected) {
	return (
		<S.Participant_Connected>
			<div>
				<>
					{isHost && (
						<S.Participant_HostBadge>👑</S.Participant_HostBadge>
					)}
					{name}{' '}
					{isMe && (
						<S.Participant_MeBadge>(youText)</S.Participant_MeBadge>
					)}
				</>
				{!isConnected ? (
					<S.Participant_Status_Text_Disconnected>
						{disconnectedText}
					</S.Participant_Status_Text_Disconnected>
				) : (
					!isRevealed && (
						<S.Participant_Status_Text>
							{vote ? readyText : thinkingText}
						</S.Participant_Status_Text>
					)
				)}
			</div>
			{/* <S.ParticipantInfo>
				<S.Name title={name}>
					{name} {isHost && '👑'} {isMe && '(You)'}
				</S.Name>
				<S.StatusText>
					{vote
						? t('room.roster.status.ready', 'Ready')
						: t('room.roster.status.thinking', 'Thinking...')}
				</S.StatusText>
				{status === 'disconnected' && (
					<S.DisconnectedBadge>
						{t('room.roster.disconnected', 'Disconnected')}
					</S.DisconnectedBadge>
				)}
			</S.ParticipantInfo> */}
			<div>
				<S.Participant_Status>
					{vote ? (
						isRevealed ? (
							<>{vote}</>
						) : (
							<S.Participant_Status_Voted>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									stroke="currentColor"
									fill="none"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="m9 12 2 2 4-4"></path>
								</svg>
							</S.Participant_Status_Voted>
						)
					) : (
						<S.Participant_Status_Thinking />
					)}
					{/* {vote ? (
					<Card
					value={vote}
					isHidden={!isRevealed}
					tabIndex={-1} // Not interactive
					/>
					) : (
						<S.EmptyStatusCircle />
						)} */}
				</S.Participant_Status>
			</div>
		</S.Participant_Connected>
	);
}

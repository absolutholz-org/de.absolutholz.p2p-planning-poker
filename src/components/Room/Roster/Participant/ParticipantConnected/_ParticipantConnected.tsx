import { Icon } from '../../../../Shared/Icon';
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
						<S.Participant_HostBadge name="crown" size="sm" />
					)}
					{name}{' '}
					{isMe && (
						<S.Participant_MeBadge>
							({youText})
						</S.Participant_MeBadge>
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
			{/* ... legacy comments ... */}
			<div>
				<S.Participant_Status>
					{vote ? (
						isRevealed ? (
							<>
								{vote === 'coffee' ? (
									<Icon name="coffee" />
								) : vote === '?' ? (
									<Icon name="question_mark" />
								) : (
									<>{vote}</>
								)}
							</>
						) : (
							<S.Participant_Status_Voted>
								<Icon name="check" size="xs" />
							</S.Participant_Status_Voted>
						)
					) : (
						<S.Participant_Status_Thinking />
					)}
					{/* ... legacy comments ... */}
				</S.Participant_Status>
			</div>
		</S.Participant_Connected>
	);
}

import { Icon } from '../../../Shared/Icon';
import * as S from './_Participant.styles';
import type { IParticipant } from './_Participant.types';

export function Participant({
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
}: IParticipant) {
	return (
		<S.Participant>
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
				</S.Participant_Status>
			</div>
		</S.Participant>
	);
}

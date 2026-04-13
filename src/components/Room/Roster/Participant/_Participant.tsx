import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../../hooks/useRoom';
import { Dialog } from '../../../Shared/Dialog';
import { Icon } from '../../../Shared/Icon';
import { Input } from '../../../Shared/Input';
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
}: IParticipant) {
	const { t } = useTranslation();
	const { updateName } = useRoom();
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
	const [newName, setNewName] = useState(name);

	const handleRename = () => {
		if (newName.trim() && newName !== name) {
			updateName(newName.trim());
		}
		setIsRenameDialogOpen(false);
	};

	const openRenameDialog = () => {
		setNewName(name);
		setIsRenameDialogOpen(true);
	};

	return (
		<S.Participant style={{ opacity: isConnected ? 1 : 0.5 }}>
			<div>
				<S.Participant_Identification>
					{isHost && (
						<S.Participant_HostBadge name="crown" size="sm" />
					)}
					{name}{' '}
					{isMe && (
						<S.EditButton
							onClick={openRenameDialog}
							className="rename-trigger"
							aria-label={t(
								'room.header.rename_dialog.aria.rename_yourself',
							)}
							title={t('room.header.rename_dialog.button')}
						>
							<Icon name="edit" size="xs" />
						</S.EditButton>
					)}
				</S.Participant_Identification>
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

			{isMe && (
				<Dialog
					id="rename-dialog-participant"
					isOpen={isRenameDialogOpen}
					title={t('room.header.rename_dialog.title')}
					confirmText={t('room.header.rename_dialog.confirm')}
					onConfirm={handleRename}
					cancelText={t('common.actions.cancel')}
					onCancel={() => setIsRenameDialogOpen(false)}
				>
					<div style={{ paddingTop: 'var(--sys-spacing-sm)' }}>
						<Input
							value={newName}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) => setNewName(e.target.value)}
							placeholder={t('lobby.name.placeholder')}
							label={t('room.header.rename_dialog.label')}
							autoFocus
							onKeyDown={(e: React.KeyboardEvent) => {
								if (e.key === 'Enter') handleRename();
							}}
						/>
					</div>
				</Dialog>
			)}
		</S.Participant>
	);
}

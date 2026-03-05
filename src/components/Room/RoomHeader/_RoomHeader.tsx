import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import { Dialog } from '../../Shared/Dialog';
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { t } = useTranslation();
	const { resetBoard, revealVotes, roomState } = useRoom();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	if (!roomState) return null;

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(roomState.roomId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const handleReset = () => {
		resetBoard();
		setIsResetDialogOpen(false);
	};

	return (
		<>
			<S.HeaderContainer>
				<S.Brand>
					<span aria-hidden="true">🃏</span> {t('common.poker')}
				</S.Brand>

				<S.RoomInfo>
					<S.RoomCodeBadge
						onClick={handleCopyCode}
						aria-label={t('room.header.aria.copy', {
							code: roomState.roomId,
						})}
					>
						{copied
							? t('room.header.code_badge.copied')
							: t('room.header.code_badge.default', {
									code: roomState.roomId,
								})}
					</S.RoomCodeBadge>
				</S.RoomInfo>

				<S.Actions>
					<Button
						variant="secondary"
						onClick={() => setIsResetDialogOpen(true)}
						aria-label={t('room.header.aria.reset')}
						disabled={roomState.users.every((u) => u.vote === null)}
					>
						{t('common.actions.reset')}
					</Button>

					<Button
						variant="primary"
						onClick={revealVotes}
						aria-label={t('room.header.aria.reveal')}
						disabled={roomState.isRevealed}
					>
						{t('common.actions.reveal')}
					</Button>
				</S.Actions>
			</S.HeaderContainer>

			<Dialog
				isOpen={isResetDialogOpen}
				title={t('room.header.reset_dialog.title')}
				message={t('room.header.reset_dialog.message')}
				confirmText={t('room.header.reset_dialog.confirm')}
				onConfirm={handleReset}
				onCancel={() => setIsResetDialogOpen(false)}
			/>
		</>
	);
}

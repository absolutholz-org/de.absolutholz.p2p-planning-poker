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
	const [isShareOpen, setIsShareOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	if (!roomState) return null;

	const showToast = (message: string) => {
		setToastMessage(message);
		setTimeout(() => setToastMessage(null), 3000);
	};

	const getShareUrl = () => {
		if (typeof window === 'undefined') return '';
		return `${window.location.origin}/room/${roomState.roomId}`;
	};

	const handleNativeShare = async () => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: t('common.poker'),
					url: getShareUrl(),
				});
			} else {
				showToast(t('room.header.share.fallback_error'));
			}
		} catch (err) {
			console.error('Error sharing', err);
		}
		setIsShareOpen(false);
	};

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(getShareUrl());
			showToast(t('room.header.share.link_copied'));
		} catch (err) {
			console.error('Failed to copy link', err);
		}
		setIsShareOpen(false);
	};

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(roomState.roomId);
			showToast(t('room.header.share.code_copied'));
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
		setIsShareOpen(false);
	};

	const handleReset = () => {
		resetBoard();
		setIsResetDialogOpen(false);
	};

	return (
		<>
			{toastMessage && (
				<S.Toast role="status" aria-live="polite">
					{toastMessage}
				</S.Toast>
			)}
			<S.SubHeaderContainer>
				<S.RoomInfo>
					<S.RoomCodeLabel>ROOM CODE</S.RoomCodeLabel>
					<S.RoomCodeValue>
						{roomState.roomId.split('-')[0].toUpperCase()}
					</S.RoomCodeValue>
				</S.RoomInfo>

				<S.ShareWrapper>
					<Button
						variant="secondary"
						onClick={() => setIsShareOpen(!isShareOpen)}
						aria-expanded={isShareOpen}
						aria-label={
							isShareOpen
								? t('room.header.share.aria_close')
								: t('room.header.share.aria_open')
						}
					>
						{t('room.header.share.button')}
					</Button>

					{isShareOpen && (
						<S.ShareMenu>
							{typeof navigator !== 'undefined' &&
								!!navigator.share && (
									<S.ShareMenuItem
										onClick={handleNativeShare}
									>
										{t('room.header.share.native')}
									</S.ShareMenuItem>
								)}
							<S.ShareMenuItem onClick={handleCopyLink}>
								{t('room.header.share.copy_link')}
							</S.ShareMenuItem>
							<S.ShareMenuItem onClick={handleCopyCode}>
								{t('room.header.share.copy_code')}
							</S.ShareMenuItem>
						</S.ShareMenu>
					)}
				</S.ShareWrapper>

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
						style={{ color: 'var(--sys-color-primary-text)' }}
					>
						👁️ {t('common.actions.reveal')}
					</Button>
				</S.Actions>
			</S.SubHeaderContainer>

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

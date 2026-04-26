import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { color } from '../../../theme/colors';
import * as HeaderStyles from '../../Room/RoomHeader/_RoomHeader.styles'; // Re-use toast style
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import * as S from './_ShareDialog.styles';
import type { IShareDialog } from './_ShareDialog.types';

export function ShareContent({
	onShareSelect,
	roomId,
}: {
	roomId: string;
	onShareSelect?: () => void;
}) {
	const { t } = useTranslation();
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const showToast = (message: string) => {
		setToastMessage(message);
		setTimeout(() => setToastMessage(null), 3000);
	};

	const getShareUrl = () => {
		if (typeof window === 'undefined') return '';
		return `${window.location.origin}/room/${roomId}`;
	};

	const handleNativeShare = async () => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: t('common.poker'),
					url: getShareUrl(),
				});
				onShareSelect?.();
			} else {
				showToast(t('room.header.share.fallback_error'));
			}
		} catch (err) {
			console.error('Error sharing', err);
		}
	};

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(getShareUrl());
			showToast(t('room.header.share.link_copied'));
		} catch (err) {
			console.error('Failed to copy link', err);
		}
	};

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(roomId);
			showToast(t('room.header.share.code_copied'));
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<>
			{toastMessage && (
				<HeaderStyles.Toast
					role="status"
					aria-live="polite"
					style={{ zIndex: 100 }}
				>
					{toastMessage}
				</HeaderStyles.Toast>
			)}
			<S.ContentContainer>
				<S.QrCodeWrapper>
					<QRCodeSVG
						value={getShareUrl()}
						size={180}
						bgColor="transparent"
						fgColor="currentColor"
						style={{ color: color('text-primary') }}
					/>
				</S.QrCodeWrapper>
				<S.ActionsContainer>
					<S.RoomCodeDisplay>
						{roomId.split('-')[0].toUpperCase()}
						<Button variant="secondary" onClick={handleCopyCode}>
							{t('room.header.share.copy_code')}
						</Button>
					</S.RoomCodeDisplay>

					{typeof navigator !== 'undefined' && !!navigator.share && (
						<Button variant="primary" onClick={handleNativeShare}>
							{t('room.header.share.native')}
						</Button>
					)}
					<Button variant="secondary" onClick={handleCopyLink}>
						{t('room.header.share.copy_link')}
					</Button>
				</S.ActionsContainer>
			</S.ContentContainer>
		</>
	);
}

export function ShareDialog({ id, isOpen, onClose, roomId }: IShareDialog) {
	const { t } = useTranslation();

	return (
		<Dialog
			id={id}
			isOpen={isOpen}
			onCancel={onClose}
			title={t('room.header.share.dialog_title')}
			cancelText={t('common.actions.close')}
		>
			<ShareContent roomId={roomId} onShareSelect={onClose} />
		</Dialog>
	);
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import { Dialog } from '../../Shared/Dialog';
import { PageContainer } from '../../Shared/PageContainer';
import { ShareDialog } from '../../Shared/ShareDialog';
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { t } = useTranslation();
	const { resetBoard, revealVotes, roomState } = useRoom();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [isShareOpen, setIsShareOpen] = useState(false);

	if (!roomState) return null;

	const handleReset = () => {
		resetBoard();
		setIsResetDialogOpen(false);
	};

	return (
		<>
			<PageContainer>
				<S.SubHeaderContainer>
					<Button
						variant="secondary"
						onClick={() => setIsShareOpen(true)}
						aria-expanded={isShareOpen}
						aria-label={t('room.header.share.aria_open')}
					>
						{t('room.header.share.button')}
					</Button>

					<S.Actions>
						<Button
							variant="secondary"
							onClick={() => setIsResetDialogOpen(true)}
							aria-label={t('room.header.aria.reset')}
							disabled={roomState.users.every(
								(u) => u.vote === null,
							)}
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
			</PageContainer>

			<ShareDialog
				isOpen={isShareOpen}
				onClose={() => setIsShareOpen(false)}
				roomId={roomState.roomId}
			/>

			<Dialog
				isOpen={isResetDialogOpen}
				title={t('room.header.reset_dialog.title')}
				message={t('room.header.reset_dialog.message')}
				confirmText={t('room.header.reset_dialog.confirm')}
				onConfirm={handleReset}
				cancelText={t('common.actions.cancel')}
				onCancel={() => setIsResetDialogOpen(false)}
			/>
		</>
	);
}

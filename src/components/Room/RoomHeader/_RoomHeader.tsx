import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useRoom } from '../../../hooks/useRoom';
import { Button } from '../../Shared/Button';
import { Dialog } from '../../Shared/Dialog';
import { PageContainer } from '../../Shared/PageContainer';
import { ShareDialog } from '../../Shared/ShareDialog';
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { t } = useTranslation();
	const { isHost, roomState, sendAction } = useRoom();
	const { roomId } = useParams<{ roomId?: string }>();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [isShareOpen, setIsShareOpen] = useState(false);

	if (!roomState) return null;

	const handleReset = () => {
		sendAction({ payload: undefined, type: 'RESET_SESSION' });
		setIsResetDialogOpen(false);
	};

	const handleReveal = () => {
		sendAction({ payload: undefined, type: 'TOGGLE_REVEAL' });
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
						icon="share"
					>
						{t('room.header.share.button')}
					</Button>

					<S.Actions direction="row" justify="end">
						{isHost && (
							<>
								<Button
									variant="secondary"
									onClick={() => setIsResetDialogOpen(true)}
									aria-label={t('room.header.aria.reset')}
									icon="refresh"
									disabled={roomState.users.every(
										(u) => u.vote === null,
									)}
								>
									{t('common.actions.reset')}
								</Button>

								<Button
									variant="primary"
									onClick={handleReveal}
									aria-label={t('room.header.aria.reveal')}
									disabled={roomState.isRevealed}
									icon="visibility"
									style={{
										color: 'var(--sys-color-primary-text)',
									}}
								>
									{t('common.actions.reveal')}
								</Button>
							</>
						)}
					</S.Actions>
				</S.SubHeaderContainer>
			</PageContainer>

			<ShareDialog
				isOpen={isShareOpen}
				onClose={() => setIsShareOpen(false)}
				roomId={roomId || roomState.roomId}
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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useRoom } from '../../../hooks/useRoom';
import { Banner } from '../../Shared/Banner';
import { Button } from '../../Shared/Button';
import { Dialog } from '../../Shared/Dialog';
import { PageContainer } from '../../Shared/PageContainer';
import { ShareDialog } from '../../Shared/ShareDialog';
import { Toolbar, ToolbarGroup, ToolbarItem } from '../../Shared/Toolbar';
import { SettingsDialog } from '../SettingsDialog';
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { t } = useTranslation();
	const { isHost, roomState, sendAction } = useRoom();
	const { roomId } = useParams<{ roomId?: string }>();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [isShareOpen, setIsShareOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	if (!roomState) return null;

	const allVoted =
		roomState.users.length > 0 &&
		roomState.users.every((u) => u.vote !== null);

	const isRevealVisible = isHost || roomState.settings.anyoneCanReveal;
	const isRevealDisabled =
		(roomState.settings.revealOnlyWhenAllVoted && !allVoted) ||
		roomState.isRevealed ||
		roomState.users.every((u) => u.vote === null);

	const revealAriaLabel =
		roomState.settings.revealOnlyWhenAllVoted && !allVoted
			? t('room.header.aria.reveal_waiting')
			: t('common.actions.reveal');

	const handleReset = () => {
		sendAction({ payload: undefined, type: 'RESET_SESSION' });
		setIsResetDialogOpen(false);
	};

	const handleReveal = () => {
		sendAction({ payload: undefined, type: 'TOGGLE_REVEAL' });

		if (window.innerWidth < 768) {
			const element = document.getElementById('participant-list-section');
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
				const title = document.getElementById('roster-title');
				title?.focus();
			}
		}
	};

	return (
		<>
			<PageContainer>
				<S.SubHeaderContainer>
					{/* Management Toolbar */}
					<Toolbar aria-label={t('room.header.aria.management')}>
						<ToolbarGroup>
							<ToolbarItem
								ariaControls="share-dialog"
								ariaExpanded={isShareOpen}
								ariaHasPopup="dialog"
								icon="share"
								label={t('room.header.share.button')}
								onClick={() => setIsShareOpen(true)}
								variant="secondary"
							/>
							{isHost && (
								<ToolbarItem
									ariaControls="settings-dialog"
									ariaExpanded={isSettingsOpen}
									ariaHasPopup="dialog"
									icon="room_preferences"
									label={t('components.settings.title')}
									onClick={() => setIsSettingsOpen(true)}
									variant="secondary"
								/>
							)}
						</ToolbarGroup>
					</Toolbar>

					{/* Voting Controls Toolbar */}
					{isRevealVisible && (
						<Toolbar aria-label={t('room.header.aria.voting')}>
							<ToolbarGroup>
								{isHost && (
									<ToolbarItem
										ariaControls="reset-dialog"
										ariaExpanded={isResetDialogOpen}
										ariaHasPopup="dialog"
										icon="refresh"
										label={t('common.actions.reset')}
										onClick={() =>
											setIsResetDialogOpen(true)
										}
										disabled={roomState.users.every(
											(u) => u.vote === null,
										)}
										variant="secondary"
									/>
								)}
								{!roomState.isRevealed && (
									<ToolbarItem
										icon="visibility"
										label={revealAriaLabel}
										onClick={handleReveal}
										disabled={isRevealDisabled}
										variant="primary"
									/>
								)}
							</ToolbarGroup>
						</Toolbar>
					)}
				</S.SubHeaderContainer>
				{isRevealVisible && allVoted && !roomState.isRevealed && (
					<div
						style={{
							marginTop: 'var(--sys-spacing-md)',
						}}
					>
						<Banner
							statusLabel="Success"
							message={t('room.header.banner.everyone_ready')}
							variant="success"
							action={
								<Button
									variant="success"
									onClick={handleReveal}
									aria-label={t('room.header.aria.reveal')}
									icon="visibility"
									size="sm"
									disabled={isRevealDisabled}
									title={revealAriaLabel}
									style={{
										color: 'var(--sys-color-primary-text)',
									}}
								>
									{t('common.actions.reveal')}
								</Button>
							}
						/>
					</div>
				)}
			</PageContainer>

			<ShareDialog
				id="share-dialog"
				isOpen={isShareOpen}
				onClose={() => setIsShareOpen(false)}
				roomId={roomId || roomState.roomId}
			/>

			<Dialog
				id="reset-dialog"
				isOpen={isResetDialogOpen}
				title={t('room.header.reset_dialog.title')}
				message={t('room.header.reset_dialog.message')}
				confirmText={t('room.header.reset_dialog.confirm')}
				onConfirm={handleReset}
				cancelText={t('common.actions.cancel')}
				onCancel={() => setIsResetDialogOpen(false)}
			/>
			<SettingsDialog
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>
		</>
	);
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useRoom } from '../../../hooks/useRoom';
import { Banner } from '../../Shared/Banner';
import { Button } from '../../Shared/Button';
import { Dialog } from '../../Shared/Dialog';
import { Input } from '../../Shared/Input';
import { PageContainer } from '../../Shared/PageContainer';
import { ShareDialog } from '../../Shared/ShareDialog';
import { Toolbar, ToolbarGroup, ToolbarItem } from '../../Shared/Toolbar';
import { SettingsDialog } from '../SettingsDialog';
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { t } = useTranslation();
	const { isHost, roomState, sendAction, updateName, userName } = useRoom();
	const { roomId } = useParams<{ roomId?: string }>();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
	const [newName, setNewName] = useState(userName);
	const [isShareOpen, setIsShareOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	if (!roomState) return null;

	const allVoted =
		roomState.users.length > 0 &&
		roomState.users.every((u) => u.vote !== null);

	const handleReset = () => {
		sendAction({ payload: undefined, type: 'RESET_SESSION' });
		setIsResetDialogOpen(false);
	};

	const handleReveal = () => {
		sendAction({ payload: undefined, type: 'TOGGLE_REVEAL' });
	};

	const handleRename = () => {
		if (newName.trim() && newName !== userName) {
			updateName(newName.trim());
		}
		setIsRenameDialogOpen(false);
	};

	const openRenameDialog = () => {
		setNewName(userName);
		setIsRenameDialogOpen(true);
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
							<ToolbarItem
								ariaControls="rename-dialog"
								ariaExpanded={isRenameDialogOpen}
								ariaHasPopup="dialog"
								icon="edit"
								label={t('room.header.rename_dialog.button')}
								onClick={openRenameDialog}
								variant="secondary"
							/>
							{isHost && (
								<ToolbarItem
									ariaControls="settings-dialog"
									ariaExpanded={isSettingsOpen}
									ariaHasPopup="dialog"
									icon="room_preferences"
									label={
										t('components.settings.title') ||
										'Settings'
									}
									onClick={() => setIsSettingsOpen(true)}
									variant="secondary"
								/>
							)}
						</ToolbarGroup>
					</Toolbar>

					{/* Voting Controls Toolbar */}
					{isHost && (
						<Toolbar aria-label={t('room.header.aria.voting')}>
							<ToolbarGroup>
								<ToolbarItem
									ariaControls="reset-dialog"
									ariaExpanded={isResetDialogOpen}
									ariaHasPopup="dialog"
									icon="refresh"
									label={t('common.actions.reset')}
									onClick={() => setIsResetDialogOpen(true)}
									disabled={roomState.users.every(
										(u) => u.vote === null,
									)}
									variant="secondary"
								/>
								{(!allVoted || roomState.isRevealed) && (
									<ToolbarItem
										icon="visibility"
										label={t('common.actions.reveal')}
										onClick={handleReveal}
										disabled={
											roomState.isRevealed ||
											roomState.users.every(
												(u) => u.vote === null,
											)
										}
										variant="primary"
									/>
								)}
							</ToolbarGroup>
						</Toolbar>
					)}
				</S.SubHeaderContainer>
				{isHost && allVoted && !roomState.isRevealed && (
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

			<Dialog
				id="rename-dialog"
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
						onChange={(e) => setNewName(e.target.value)}
						placeholder={t('lobby.name.placeholder')}
						label={t('room.header.rename_dialog.label')}
						autoFocus
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleRename();
						}}
					/>
				</div>
			</Dialog>
			<SettingsDialog
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>
		</>
	);
}

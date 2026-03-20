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
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { t } = useTranslation();
	const { isHost, roomState, sendAction, updateName, userName } = useRoom();
	const { roomId } = useParams<{ roomId?: string }>();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
	const [newName, setNewName] = useState(userName);
	const [isShareOpen, setIsShareOpen] = useState(false);

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
					<Button
						variant="secondary"
						onClick={() => setIsShareOpen(true)}
						aria-expanded={isShareOpen}
						aria-label={t('room.header.share.aria_open')}
						icon="share"
					>
						{t('room.header.share.button')}
					</Button>

					<Button
						variant="secondary"
						onClick={openRenameDialog}
						aria-label={t('room.header.rename_dialog.aria.open')}
						icon="edit"
					>
						{t('room.header.rename_dialog.button')}
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

								{(!allVoted || roomState.isRevealed) && (
									<Button
										variant="primary"
										onClick={handleReveal}
										aria-label={t(
											'room.header.aria.reveal',
										)}
										disabled={
											roomState.isRevealed ||
											roomState.users.every(
												(u) => u.vote === null,
											)
										}
										icon="visibility"
										style={{
											color: 'var(--sys-color-primary-text)',
										}}
									>
										{t('common.actions.reveal')}
									</Button>
								)}
							</>
						)}
					</S.Actions>
				</S.SubHeaderContainer>
				{isHost && allVoted && !roomState.isRevealed && (
					<div
						style={{
							marginTop: 'var(--sys-spacing-md)',
						}}
					>
						<Banner
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

			<Dialog
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
		</>
	);
}

import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import * as S from './_LobbyForm.styles';

export function LobbyForm() {
	const { t } = useTranslation();
	const { error, initGuest, initHost } = useRoom();
	const { roomId } = useParams<{ roomId?: string }>();
	const [name, setName] = useState('');
	const [roomCode, setRoomCode] = useState(roomId || '');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		setIsSubmitting(true);

		// If no room code is provided, they are creating a new room as Host.
		if (!roomCode.trim()) {
			initHost(name.trim());
		} else {
			initGuest(roomCode.trim(), name.trim());
		}
	};

	useEffect(() => {
		if (error) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsSubmitting(false);
		}
	}, [error]);

	return (
		<S.Container>
			<S.FormCard onSubmit={handleSubmit}>
				<div>
					<S.Title>{t('common.poker')}</S.Title>
					<p
						style={{
							color: 'var(--sys-color-text-secondary)',
							textAlign: 'center',
						}}
					>
						{t('lobby.title')}
					</p>
				</div>

				{error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}

				<S.FieldLine>
					<S.Label htmlFor="playerName">
						{t('lobby.name.label')}
					</S.Label>
					<S.Input
						id="playerName"
						type="text"
						required
						autoFocus
						maxLength={25}
						placeholder={t('lobby.name.placeholder')}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</S.FieldLine>

				{!roomId && (
					<S.FieldLine>
						<S.Label htmlFor="roomCode">
							{t('lobby.roomCode.label')}
						</S.Label>
						<S.Input
							id="roomCode"
							type="text"
							placeholder={t('lobby.roomCode.placeholder')}
							value={roomCode}
							onChange={(e) => setRoomCode(e.target.value)}
						/>
						<S.HelperText>
							{t('lobby.roomCode.placeholder')}
						</S.HelperText>
					</S.FieldLine>
				)}

				<Button type="submit" disabled={!name.trim() || isSubmitting}>
					{isSubmitting
						? 'Connecting...'
						: roomCode.trim()
							? t('lobby.submit.join')
							: t('lobby.submit.create')}
				</Button>
			</S.FormCard>
		</S.Container>
	);
}

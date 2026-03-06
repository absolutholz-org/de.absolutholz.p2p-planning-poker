import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import { PageContainer } from '../../Shared/PageContainer';
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

		// Fail-safe unlock after 8 seconds if connection stalls silently
		setTimeout(() => setIsSubmitting(false), 8000);
	};

	useEffect(() => {
		if (error) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsSubmitting(false);
		}
	}, [error]);

	return (
		<PageContainer>
			<S.ContentWrapper>
				<S.FormCard onSubmit={handleSubmit}>
					<S.Title>{t('common.poker')}</S.Title>
					<S.SubTitle>{t('lobby.title')}</S.SubTitle>

					{error && (
						<S.ErrorMessage role="alert">{error}</S.ErrorMessage>
					)}

					<S.FieldLine>
						<S.LabelRow>
							<S.Label htmlFor="playerName">
								<span aria-hidden="true">👤</span>{' '}
								{t('lobby.name.label')}
							</S.Label>
						</S.LabelRow>
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
							<S.LabelRow>
								<S.Label htmlFor="roomCode">
									<span aria-hidden="true">🔑</span>{' '}
									{t('lobby.roomCode.label')}
								</S.Label>
								<S.OptionalLabel>Optional</S.OptionalLabel>
							</S.LabelRow>
							<S.Input
								id="roomCode"
								type="text"
								placeholder={t('lobby.roomCode.placeholder')}
								value={roomCode}
								onChange={(e) => setRoomCode(e.target.value)}
							/>
						</S.FieldLine>
					)}

					<S.Footer>
						<Button
							type="submit"
							disabled={!name.trim() || isSubmitting}
						>
							{isSubmitting
								? 'Connecting...'
								: roomCode.trim()
									? `${t('lobby.submit.join')} ➔`
									: `${t('lobby.submit.create')} ➔`}
						</Button>
					</S.Footer>
				</S.FormCard>
				<S.ExtraText>
					<p>{t('lobby.extra_text')}</p>
				</S.ExtraText>
			</S.ContentWrapper>
		</PageContainer>
	);
}

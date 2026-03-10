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

	// Load previously saved name on initial mount
	useEffect(() => {
		const savedName = localStorage.getItem('user-name');
		if (savedName) setName(savedName);
	}, []);

	// Check for ungraceful page reloads and try to restore session
	useEffect(() => {
		const role = sessionStorage.getItem('p2p_role');
		const savedRoomId = sessionStorage.getItem('p2p_room_id');
		const savedName = sessionStorage.getItem('p2p_name');
		const savedStateStr = sessionStorage.getItem('p2p_room_state');

		if (role && savedRoomId && savedName) {
			console.log(
				`Attempting to recover ${role} session for room ${savedRoomId}`,
			);
			setIsSubmitting(true);

			if (role === 'host' && savedStateStr) {
				try {
					const restoredState = JSON.parse(savedStateStr);
					initHost(savedName, savedRoomId, restoredState);
				} catch (e) {
					console.error('Failed to parse restored state', e);
					sessionStorage.clear();
					setIsSubmitting(false);
				}
			} else if (role === 'guest') {
				initGuest(savedRoomId, savedName);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName) return;

		localStorage.setItem('user-name', trimmedName);
		setIsSubmitting(true);

		// If no room code is provided, they are creating a new room as Host.
		if (!roomCode.trim()) {
			initHost(trimmedName);
		} else {
			initGuest(roomCode.trim(), trimmedName);
		}

		// Fail-safe unlock after 8 seconds if connection stalls silently
		setTimeout(() => {
			setIsSubmitting((current) => {
				if (current) {
					// We couldn't connect within 8 seconds. This typically happens
					// across restrictive NATs or if the host completely closed their browser.
					sessionStorage.clear(); // Clear any pending retry state
				}
				return false;
			});
		}, 8000);
	};

	useEffect(() => {
		if (error) {
			// Clear storage so we don't get stuck in a reload loop
			sessionStorage.clear();

			setIsSubmitting(false);
		}
	}, [error]);

	return (
		<PageContainer>
			<S.ContentWrapper>
				<S.FormCard onSubmit={handleSubmit}>
					<S.Title>{t('lobby.title')}</S.Title>
					<S.SubTitle>{t('lobby.subtitle')}</S.SubTitle>

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
							maxLength={16}
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

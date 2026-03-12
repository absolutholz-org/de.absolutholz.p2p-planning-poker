import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { SESSION_KEYS, STORAGE_KEYS } from '../../../constants/storage';
import { usePeer } from '../../../context/PeerContext';
import { useRoom } from '../../../context/RoomContext';
import { AppFooter } from '../../Shared/AppFooter';
import { Button } from '../../Shared/Button';
import { PageContainer } from '../../Shared/PageContainer';
import * as S from './_LobbyForm.styles';

export function LobbyForm() {
	const { t } = useTranslation();
	const { connectionStatus, error, initGuest, initHost } = useRoom();
	const { logs } = usePeer();
	const { roomId } = useParams<{ roomId?: string }>();
	const [name, setName] = useState('');
	const [roomCode, setRoomCode] = useState(roomId || '');
	const [showLogs, setShowLogs] = useState(false);

	// Load previously saved name on initial mount
	useEffect(() => {
		const savedName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
		if (savedName) setName(savedName);
	}, []);

	// Check for ungraceful page reloads and try to restore session
	useEffect(() => {
		const role = sessionStorage.getItem(SESSION_KEYS.ROLE);
		const savedRoomId = sessionStorage.getItem(SESSION_KEYS.ROOM_ID);
		const savedName = sessionStorage.getItem(SESSION_KEYS.NAME);
		const savedPeerId = sessionStorage.getItem(SESSION_KEYS.PEER_ID);
		const savedStateStr = sessionStorage.getItem(SESSION_KEYS.ROOM_STATE);

		if (role && savedRoomId && savedName) {
			console.log(
				`Attempting to recover ${role} session for room ${savedRoomId}`,
			);

			if (role === 'host' && savedStateStr) {
				try {
					const restoredState = JSON.parse(savedStateStr);
					initHost(
						savedName,
						savedPeerId || undefined,
						restoredState,
					);
				} catch (e) {
					console.error('Failed to parse restored state', e);
					sessionStorage.clear();
				}
			} else if (role === 'guest') {
				initGuest(savedRoomId, savedName, savedPeerId || undefined);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName || connectionStatus === 'connecting') return;

		localStorage.setItem(STORAGE_KEYS.USER_NAME, trimmedName);

		// If no room code is provided, they are creating a new room as Host.
		if (!roomCode.trim()) {
			initHost(trimmedName);
		} else {
			initGuest(roomCode.trim(), trimmedName);
		}
	};

	useEffect(() => {
		if (error) {
			// Clear storage so we don't get stuck in a reload loop
			sessionStorage.clear();
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
							disabled={
								!name.trim() ||
								connectionStatus === 'connecting'
							}
						>
							{connectionStatus === 'connecting'
								? 'Connecting...'
								: roomCode.trim()
									? `${t('lobby.submit.join')} ➔`
									: `${t('lobby.submit.create')} ➔`}
						</Button>
						<S.DisclaimerText>
							{t('lobby.privacy_disclaimer')}
						</S.DisclaimerText>
					</S.Footer>
				</S.FormCard>
				<S.ExtraText>
					<p>{t('lobby.extra_text')}</p>
				</S.ExtraText>
			</S.ContentWrapper>
			{logs.length > 0 && showLogs && (
				<S.DebugSection>
					<S.DebugHeader>
						<h3>Connectivity Diagnostics</h3>
						<S.DebugCloseButton
							onClick={() => setShowLogs(false)}
							title="Hide diagnostics"
						>
							✕
						</S.DebugCloseButton>
					</S.DebugHeader>
					<S.DebugList>
						{logs.map((log: string, i: number) => (
							<li key={i}>{log}</li>
						))}
					</S.DebugList>
				</S.DebugSection>
			)}
			{logs.length > 0 && !showLogs && (
				<S.DebugToggle
					onClick={() => setShowLogs(true)}
					title="Show connectivity diagnostics"
				>
					⚡
				</S.DebugToggle>
			)}
			<AppFooter />
		</PageContainer>
	);
}

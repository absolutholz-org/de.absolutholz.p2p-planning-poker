import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { SESSION_KEYS, STORAGE_KEYS } from '../../../constants/storage';
import { usePeer } from '../../../context/PeerContext';
import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import { Form } from '../../Shared/Form';
import { Icon } from '../../Shared/Icon';
import { Input } from '../../Shared/Input';
import { Stack } from '../../Shared/Stack';
import * as S from './_LobbyForm.styles';

export function LobbyForm() {
	const { t } = useTranslation();
	const { connectionStatus, error, iceState, initGuest, initHost } =
		useRoom();
	const { logs } = usePeer();
	const navigate = useNavigate();
	const { roomId } = useParams<{ roomId?: string }>();
	const [name, setName] = useState('');
	const [roomCode, setRoomCode] = useState(roomId || '');
	const [showRoomCode, setShowRoomCode] = useState(false);
	const [showLogs, setShowLogs] = useState(false);

	// Load previously saved name on initial mount
	useEffect(() => {
		const savedName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
		if (savedName) setName(savedName);
	}, []);

	const { peerId } = usePeer();
	const [hasAttemptedRestore, setHasAttemptedRestore] = useState(false);

	// Check for ungraceful page reloads and try to restore session
	useEffect(() => {
		// Wait for PeerJS to be ready before attempting restoration
		if (!peerId || hasAttemptedRestore) return;

		const role = sessionStorage.getItem(SESSION_KEYS.ROLE);
		const savedRoomId = sessionStorage.getItem(SESSION_KEYS.ROOM_ID);
		const savedName = sessionStorage.getItem(SESSION_KEYS.NAME);
		const savedPeerId = sessionStorage.getItem(SESSION_KEYS.PEER_ID);
		const savedStateStr = sessionStorage.getItem(SESSION_KEYS.ROOM_STATE);

		// Only auto-restore if we are on the specific room URL that matches the saved session
		// This prevents hijacking the home page or a different room's URL
		const isAtCorrectRoom = roomId && roomId === savedRoomId;

		if (role && savedRoomId && savedName && isAtCorrectRoom) {
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

		setHasAttemptedRestore(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [peerId, roomId]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName || connectionStatus === 'connecting') return;

		localStorage.setItem(STORAGE_KEYS.USER_NAME, trimmedName);

		// If no room code is provided, they are creating a new room as Host.
		if (!roomCode.trim()) {
			initHost(trimmedName);
			if (peerId) {
				navigate(`/room/${peerId}`);
			}
		} else {
			const targetRoom = roomCode.trim();
			initGuest(targetRoom, trimmedName);
			navigate(`/room/${targetRoom}`);
		}
	};

	useEffect(() => {
		if (error) {
			// Clear storage so we don't get stuck in a reload loop
			sessionStorage.clear();
		}
	}, [error]);

	return (
		<div>
			<Stack spacing="xl">
				<S.CardContainer>
					<Form
						onSubmit={handleSubmit}
						error={error || undefined}
						spacing="xl"
					>
						<Stack spacing="xs">
							<S.Title>{t('lobby.title')}</S.Title>
							<S.SubTitle>{t('lobby.subtitle')}</S.SubTitle>
						</Stack>

						<Stack spacing="md">
							<Input
								id="playerName"
								label={t('lobby.name.label')}
								type="text"
								required
								autoFocus
								maxLength={16}
								placeholder={t('lobby.name.placeholder')}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							{!roomId && (
								<>
									{showRoomCode ? (
										<Input
											id="roomCode"
											label={t('lobby.roomCode.label')}
											type="text"
											placeholder={t(
												'lobby.roomCode.placeholder',
											)}
											value={roomCode}
											onChange={(e) =>
												setRoomCode(e.target.value)
											}
											autoFocus
										/>
									) : (
										<Stack align="center">
											<S.JoinCodeToggle
												type="button"
												onClick={() =>
													setShowRoomCode(true)
												}
											>
												{t('lobby.roomCode.toggle')}
											</S.JoinCodeToggle>
										</Stack>
									)}
								</>
							)}
						</Stack>

						<Stack spacing="sm">
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
										? `${t('lobby.submit.join')}`
										: `${t('lobby.submit.create')}`}
								<Icon name="arrow_right" size="sm" />
							</Button>
							{connectionStatus === 'connecting' ? (
								<S.DisclaimerText>
									{iceState === 'checking'
										? 'Testing network paths (this may take up to 40s)...'
										: 'Establishing secure peer connection...'}
								</S.DisclaimerText>
							) : (
								<S.DisclaimerText>
									{t('lobby.privacy_disclaimer')}
								</S.DisclaimerText>
							)}
						</Stack>
					</Form>
				</S.CardContainer>

				<S.ExtraText>
					<p>{t('lobby.extra_text')}</p>
				</S.ExtraText>
			</Stack>
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
		</div>
	);
}

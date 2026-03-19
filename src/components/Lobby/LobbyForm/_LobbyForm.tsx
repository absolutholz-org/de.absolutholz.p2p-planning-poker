import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useRoom } from '../../../hooks/useRoom';
import { Button } from '../../Shared/Button';
import { Form } from '../../Shared/Form';
import { Icon } from '../../Shared/Icon';
import { Input } from '../../Shared/Input';
import { Stack } from '../../Shared/Stack';
import * as S from './_LobbyForm.styles';

export function LobbyForm() {
	const { t } = useTranslation();
	const { connectionStatus, error } = useRoom(); // Replaced usePeer with useRoom per instructions
	const logs: string[] = []; // Logs feature is removed in the new hook architecture
	const navigate = useNavigate();
	const { roomId } = useParams<{ roomId?: string }>();
	const [name, setName] = useState(
		() => localStorage.getItem('userName') || '',
	);
	const [roomCode, setRoomCode] = useState(roomId || '');
	const [showRoomCode, setShowRoomCode] = useState(false);
	const [showLogs, setShowLogs] = useState(false);

	// Auto-restore effect removed because the new RoomGuard architecture
	// handles initializing connections automatically based on the URL and localStorage.

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName || connectionStatus === 'connecting') return;

		// Cleanup old session data to prevent accidental state leak
		localStorage.removeItem('userName');
		localStorage.removeItem('role');

		if (!roomCode.trim()) {
			// For CREATE
			const newId = Math.random()
				.toString(36)
				.substring(2, 8)
				.toLowerCase();
			localStorage.setItem('userName', trimmedName);
			localStorage.setItem('role', 'host');
			navigate(`/room/${newId}`);
		} else {
			// For JOIN
			const targetRoom = roomCode.trim();
			localStorage.setItem('userName', trimmedName);
			localStorage.setItem('role', 'guest');
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
								variant="primary"
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
									Establishing secure peer connection...
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

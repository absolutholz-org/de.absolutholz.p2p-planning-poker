import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useRoom } from '../../../hooks/useRoom';
import { Button } from '../../Shared/Button';
import { Disclosure } from '../../Shared/Disclosure';
import { Form } from '../../Shared/Form';
import { Icon } from '../../Shared/Icon';
import { Input } from '../../Shared/Input';
import { Stack } from '../../Shared/Stack';
import * as S from './_LobbyForm.styles';

/**
 * Intelligently extracts a room code from a potentially full URL or path.
 * If the input doesn't look like a URL, it's returned as-is (trimmed).
 */
function extractRoomCode(input: string): string {
	const trimmed = input.trim();
	if (!trimmed) return '';

	// Remove potential trailing slash for consistent parsing
	const cleanInput = trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;

	// Pattern 1: Look for /room/ID (handles both full URLs and absolute/relative paths)
	const roomMatch = cleanInput.match(/\/room\/([^/?#]+)/i);
	if (roomMatch && roomMatch[1]) {
		return roomMatch[1];
	}

	// Pattern 2: If it looks like a URL (has protocol or domain-like structure)
	// but didn't match /room/, take the last path segment
	if (
		cleanInput.includes('://') ||
		(cleanInput.includes('.') && cleanInput.includes('/'))
	) {
		try {
			const url = new URL(
				cleanInput.includes('://')
					? cleanInput
					: `https://${cleanInput}`,
			);
			const pathParts = url.pathname.split('/').filter(Boolean);
			if (pathParts.length > 0) {
				return pathParts[pathParts.length - 1];
			}
		} catch {
			// Manual fallback if URL constructor fails
			const simpleParts = cleanInput.split('/').filter(Boolean);
			return simpleParts[simpleParts.length - 1] || cleanInput;
		}
	}

	return cleanInput;
}

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
		sessionStorage.removeItem('role');

		if (!roomCode.trim()) {
			// For CREATE
			const newId = Math.random()
				.toString(36)
				.substring(2, 8)
				.toLowerCase();
			localStorage.setItem('userName', trimmedName);
			sessionStorage.setItem('role', 'host');
			navigate(`/room/${newId}`);
		} else {
			// For JOIN
			const targetRoom = extractRoomCode(roomCode);
			localStorage.setItem('userName', trimmedName);
			sessionStorage.setItem('role', 'guest');
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
		<section aria-labelledby="lobby-title">
			<Stack spacing="xl">
				<S.CardContainer>
					<Form
						onSubmit={handleSubmit}
						error={error || undefined}
						spacing="xl"
					>
						<Stack spacing="xs">
							<S.Title id="lobby-title">
								{t('lobby.title')}
							</S.Title>
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
											onChange={(e) => {
												const val = e.target.value;
												// If they paste a URL, clean it up immediately for better UX
												if (val.includes('://')) {
													setRoomCode(
														extractRoomCode(val),
													);
												} else {
													setRoomCode(val);
												}
											}}
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
								aria-describedby={
									!roomCode.trim() ? 'host-hint' : undefined
								}
								disabled={
									!name.trim() ||
									connectionStatus === 'connecting'
								}
							>
								{connectionStatus === 'connecting'
									? t('lobby.submit.connecting')
									: roomCode.trim()
										? t('lobby.submit.join')
										: t('lobby.submit.create')}
								<Icon name="arrow_right" size="sm" />
							</Button>

							{!roomCode.trim() && (
								<S.DisclaimerText id="host-hint" role="status">
									{t('lobby.submit.create_hint')}
								</S.DisclaimerText>
							)}

							{connectionStatus === 'connecting' ? (
								<S.DisclaimerText>
									{t('lobby.status.establishing')}
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

				<Disclosure title={t('lobby.faq.title')} icon="info">
					<Stack spacing="md">
						<Stack spacing="xs">
							<h4>{t('lobby.faq.p2p_title')}</h4>
							<p>{t('lobby.faq.p2p_body')}</p>
						</Stack>
						<Stack spacing="xs">
							<h4>{t('lobby.faq.persistence_title')}</h4>
							<p>{t('lobby.faq.persistence_body')}</p>
						</Stack>
					</Stack>
				</Disclosure>
			</Stack>
			{logs.length > 0 && showLogs && (
				<S.DebugSection>
					<S.DebugHeader>
						<h3>{t('lobby.debug.title')}</h3>
						<S.DebugCloseButton
							onClick={() => setShowLogs(false)}
							title={t('lobby.debug.hide')}
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
					title={t('lobby.debug.show')}
				>
					⚡
				</S.DebugToggle>
			)}
		</section>
	);
}

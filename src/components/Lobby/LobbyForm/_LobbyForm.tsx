import { type FormEvent, useState } from 'react';

import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import * as S from './_LobbyForm.styles';

export function LobbyForm() {
	const { error, initGuest, initHost } = useRoom();
	const [name, setName] = useState('');
	const [roomCode, setRoomCode] = useState('');
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

	return (
		<S.Container>
			<S.FormCard onSubmit={handleSubmit}>
				<div>
					<S.Title>P2P Planning Poker</S.Title>
					<p
						style={{
							color: 'var(--sys-color-text-secondary)',
							textAlign: 'center',
						}}
					>
						Serverless agile estimation
					</p>
				</div>

				{error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}

				<S.FieldLine>
					<S.Label htmlFor="playerName">Your Name</S.Label>
					<S.Input
						id="playerName"
						type="text"
						required
						autoFocus
						maxLength={25}
						placeholder="E.g., Jane Doe"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</S.FieldLine>

				<S.FieldLine>
					<S.Label htmlFor="roomCode">Room Code (Optional)</S.Label>
					<S.Input
						id="roomCode"
						type="text"
						placeholder="Paste code to join existing room"
						value={roomCode}
						onChange={(e) => setRoomCode(e.target.value)}
					/>
					<S.HelperText>
						Leave blank to create a new session.
					</S.HelperText>
				</S.FieldLine>

				<Button type="submit" disabled={!name.trim() || isSubmitting}>
					{isSubmitting
						? 'Connecting...'
						: roomCode.trim()
							? 'Join Room'
							: 'Create Room'}
				</Button>
			</S.FormCard>
		</S.Container>
	);
}

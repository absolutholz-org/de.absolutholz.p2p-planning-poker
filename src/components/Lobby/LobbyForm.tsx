import styled from '@emotion/styled';
import { type FormEvent, useState } from 'react';

import { useRoom } from '../../context/RoomContext';
import { Button } from '../Shared/Button';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: var(--sys-spacing-md);
`;

const FormCard = styled.form`
	background-color: var(--sys-color-surface);
	border-radius: var(--sys-radius-lg);
	padding: var(--sys-spacing-xl);
	max-width: 480px;
	width: 100%;
	box-shadow:
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-lg);
`;

const Title = styled.h1`
	text-align: center;
	color: var(--sys-color-primary);
	margin-bottom: var(--sys-spacing-sm);
`;

const FieldLine = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-xs);
`;

const Label = styled.label`
	font-weight: 500;
	color: var(--sys-color-text-primary);
`;

const Input = styled.input`
	/* A11Y requirement: 48px touch targets for inputs too */
	min-height: 48px;
	padding: 0 var(--sys-spacing-md);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-md);
	font-size: 1rem;
	font-family: inherit;
	width: 100%;
	background-color: var(--sys-color-bg);
	color: var(--sys-color-text-primary);

	&:focus {
		outline: none;
		border-color: var(--sys-color-primary);
		box-shadow: 0 0 0 3px var(--sys-color-focus);
	}
`;

const HelperText = styled.p`
	font-size: 0.875rem;
	color: var(--sys-color-text-secondary);
	margin-top: 2px;
`;

const ErrorMessage = styled.div`
	background-color: rgba(239, 68, 68, 0.1);
	color: var(--sys-color-danger);
	padding: var(--sys-spacing-sm);
	border-radius: var(--sys-radius-md);
	font-weight: 500;
	text-align: center;
`;

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
		<Container>
			<FormCard onSubmit={handleSubmit}>
				<div>
					<Title>P2P Planning Poker</Title>
					<p
						style={{
							color: 'var(--sys-color-text-secondary)',
							textAlign: 'center',
						}}
					>
						Serverless agile estimation
					</p>
				</div>

				{error && <ErrorMessage role="alert">{error}</ErrorMessage>}

				<FieldLine>
					<Label htmlFor="playerName">Your Name</Label>
					<Input
						id="playerName"
						type="text"
						required
						autoFocus
						maxLength={25}
						placeholder="E.g., Jane Doe"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</FieldLine>

				<FieldLine>
					<Label htmlFor="roomCode">Room Code (Optional)</Label>
					<Input
						id="roomCode"
						type="text"
						placeholder="Paste code to join existing room"
						value={roomCode}
						onChange={(e) => setRoomCode(e.target.value)}
					/>
					<HelperText>
						Leave blank to create a new session.
					</HelperText>
				</FieldLine>

				<Button type="submit" disabled={!name.trim() || isSubmitting}>
					{isSubmitting
						? 'Connecting...'
						: roomCode.trim()
							? 'Join Room'
							: 'Create Room'}
				</Button>
			</FormCard>
		</Container>
	);
}

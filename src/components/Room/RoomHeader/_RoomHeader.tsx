import { useState } from 'react';

import { useRoom } from '../../../context/RoomContext';
import { Button } from '../../Shared/Button';
import { Dialog } from '../../Shared/Dialog';
import * as S from './_RoomHeader.styles';

export function RoomHeader() {
	const { resetBoard, revealVotes, roomState } = useRoom();
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	if (!roomState) return null;

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(roomState.roomId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const handleReset = () => {
		resetBoard();
		setIsResetDialogOpen(false);
	};

	return (
		<>
			<S.HeaderContainer>
				<S.Brand>
					<span aria-hidden="true">🃏</span> P2P Poker
				</S.Brand>

				<S.RoomInfo>
					<S.RoomCodeBadge
						onClick={handleCopyCode}
						aria-label={`Room Code is ${roomState.roomId}. Click to copy.`}
					>
						{copied ? 'Copied!' : `Code: ${roomState.roomId}`}
					</S.RoomCodeBadge>
				</S.RoomInfo>

				<S.Actions>
					<Button
						variant="secondary"
						onClick={() => setIsResetDialogOpen(true)}
						aria-label="Reset the voting board for all peers"
						disabled={roomState.users.every((u) => u.vote === null)}
					>
						Reset
					</Button>

					<Button
						variant="primary"
						onClick={revealVotes}
						aria-label="Reveal votes to all peers"
						disabled={roomState.isRevealed}
					>
						Reveal Votes
					</Button>
				</S.Actions>
			</S.HeaderContainer>

			<Dialog
				isOpen={isResetDialogOpen}
				title="Reset Board"
				message="Are you sure you want to clear all current votes? This action will apply to all connected peers and cannot be undone."
				confirmText="Reset Votes"
				onConfirm={handleReset}
				onCancel={() => setIsResetDialogOpen(false)}
			/>
		</>
	);
}

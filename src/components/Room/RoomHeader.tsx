import styled from '@emotion/styled';
import { useState } from 'react';

import { useRoom } from '../../context/RoomContext';
import { Button } from '../Shared/Button';
import { Dialog } from '../Shared/Dialog';

const HeaderContainer = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-md) var(--sys-spacing-xl);
	background-color: var(--sys-color-surface);
	border-bottom: 1px solid var(--sys-color-border);
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 10;
`;

const Brand = styled.div`
	font-weight: bold;
	font-size: 1.25rem;
	color: var(--sys-color-primary);
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-sm);
`;

const RoomInfo = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
`;

const RoomCodeBadge = styled.button`
	background: var(--sys-color-bg);
	border: 1px solid var(--sys-color-border);
	padding: var(--sys-spacing-xs) var(--sys-spacing-md);
	border-radius: var(--sys-radius-pill);
	font-family: monospace;
	font-size: 0.875rem;
	color: var(--sys-color-text-secondary);
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: var(--sys-color-border);
		color: var(--sys-color-text-primary);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px var(--sys-color-focus);
	}
`;

const Actions = styled.div`
	display: flex;
	gap: var(--sys-spacing-sm);
`;

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
			<HeaderContainer>
				<Brand>
					<span aria-hidden="true">🃏</span> P2P Poker
				</Brand>

				<RoomInfo>
					<RoomCodeBadge
						onClick={handleCopyCode}
						aria-label={`Room Code is ${roomState.roomId}. Click to copy.`}
					>
						{copied ? 'Copied!' : `Code: ${roomState.roomId}`}
					</RoomCodeBadge>
				</RoomInfo>

				<Actions>
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
				</Actions>
			</HeaderContainer>

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

import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { Button } from './Button';

interface DialogProps {
	cancelText?: string;
	confirmText?: string;
	isOpen: boolean;
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
	title: string;
}

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 50; /* Ensure on top */
	padding: var(--sys-spacing-md);
`;

const DialogBox = styled.div`
	background-color: var(--sys-color-surface);
	border-radius: var(--sys-radius-lg);
	padding: var(--sys-spacing-xl);
	max-width: 400px;
	width: 100%;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h2`
	margin-top: 0;
	margin-bottom: var(--sys-spacing-sm);
	color: var(--sys-color-text-primary);
	font-size: 1.25rem;
`;

const Message = styled.p`
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-xl);
`;

const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: var(--sys-spacing-md);
`;

export function Dialog({
	cancelText = 'Cancel',
	confirmText = 'Confirm',
	isOpen,
	message,
	onCancel,
	onConfirm,
	title,
}: DialogProps) {
	const dialogRef = useRef<HTMLDivElement>(null);

	// A11Y focus trapping: when dialog opens, focus the container
	useEffect(() => {
		if (isOpen && dialogRef.current) {
			dialogRef.current.focus();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<Overlay
			onClick={onCancel}
			// ARIA modal attributes
			role="dialog"
			aria-modal="true"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-message"
		>
			<DialogBox
				ref={dialogRef}
				tabIndex={-1} // Allow programmatic focus
				onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing
			>
				<Title id="dialog-title">{title}</Title>
				<Message id="dialog-message">{message}</Message>
				<Actions>
					<Button variant="secondary" onClick={onCancel}>
						{cancelText}
					</Button>
					<Button variant="danger" onClick={onConfirm}>
						{confirmText}
					</Button>
				</Actions>
			</DialogBox>
		</Overlay>
	);
}

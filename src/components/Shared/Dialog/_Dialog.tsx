import { useEffect, useRef } from 'react';

import { Button } from '../Button';
import * as S from './_Dialog.styles';
import type { DialogProps } from './_Dialog.types';

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
		<S.Overlay
			onClick={onCancel}
			// ARIA modal attributes
			role="dialog"
			aria-modal="true"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-message"
		>
			<S.DialogBox
				ref={dialogRef}
				tabIndex={-1} // Allow programmatic focus
				onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing
			>
				<S.Title id="dialog-title">{title}</S.Title>
				<S.Message id="dialog-message">{message}</S.Message>
				<S.Actions>
					<Button variant="secondary" onClick={onCancel}>
						{cancelText}
					</Button>
					<Button variant="danger" onClick={onConfirm}>
						{confirmText}
					</Button>
				</S.Actions>
			</S.DialogBox>
		</S.Overlay>
	);
}

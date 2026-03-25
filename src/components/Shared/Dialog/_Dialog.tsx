import { type MouseEvent, useEffect, useRef } from 'react';

// import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import * as S from './_Dialog.styles';
import type { IDialog } from './_Dialog.types';

export function Dialog({
	cancelText,
	children,
	confirmText,
	id,
	isOpen,
	message,
	onCancel,
	onConfirm,
	title,
}: IDialog) {
	// const { t } = useTranslation();
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			onCancel();
		}
	};

	return (
		<S.DialogBase
			id={id}
			ref={dialogRef}
			onCancel={onCancel} // Natively handles Escape key
			onClick={handleBackdropClick}
			aria-labelledby="dialog-title"
			aria-describedby="dialog-message"
		>
			<S.DialogContainer onClick={(e) => e.stopPropagation()}>
				<S.DialogHeader>
					<S.DialogTitle id="dialog-title">{title}</S.DialogTitle>
					{/* <S.CloseButton
						onClick={onCancel}
						aria-label={t('common.actions.cancel')}
					>
						<span aria-hidden="true">&times;</span>
					</S.CloseButton> */}
				</S.DialogHeader>

				<S.DialogContent id="dialog-message">
					{message && <p>{message}</p>}
					{children}
				</S.DialogContent>

				<S.DialogFooter>
					{onCancel && cancelText && (
						<Button variant="secondary" onClick={onCancel}>
							{cancelText}
						</Button>
					)}
					{onConfirm && confirmText && (
						<Button variant="primary" onClick={onConfirm}>
							{confirmText}
						</Button>
					)}
				</S.DialogFooter>
			</S.DialogContainer>
		</S.DialogBase>
	);
}

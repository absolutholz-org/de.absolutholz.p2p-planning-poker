import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import * as S from './_Dialog.styles';
import type { DialogProps } from './_Dialog.types';

export function Dialog({
	cancelText,
	children,
	confirmText,
	isOpen,
	message,
	onCancel,
	onConfirm,
	title,
}: DialogProps) {
	const { t } = useTranslation();
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

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			onCancel();
		}
	};

	return (
		<S.DialogBase
			ref={dialogRef}
			onCancel={onCancel} // Natively handles Escape key
			onClick={handleBackdropClick}
			aria-labelledby="dialog-title"
			aria-describedby="dialog-message"
		>
			<S.DialogContainer onClick={(e) => e.stopPropagation()}>
				<S.DialogHeader>
					<S.DialogTitle id="dialog-title">{title}</S.DialogTitle>
					<S.CloseButton
						onClick={onCancel}
						aria-label={t('common.actions.cancel')}
					>
						<span aria-hidden="true">&times;</span>
					</S.CloseButton>
				</S.DialogHeader>

				<S.DialogContent id="dialog-message">
					{message && <p>{message}</p>}
					{children}
				</S.DialogContent>

				<S.DialogFooter>
					<Button variant="secondary" onClick={onCancel}>
						{cancelText || t('common.actions.cancel')}
					</Button>
					<Button variant="danger" onClick={onConfirm}>
						{confirmText || t('common.actions.reset')}
					</Button>
				</S.DialogFooter>
			</S.DialogContainer>
		</S.DialogBase>
	);
}

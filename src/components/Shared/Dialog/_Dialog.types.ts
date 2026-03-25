import type { ReactNode } from 'react';

export interface IDialog {
	/**
	 * Text for the cancel button.
	 */
	cancelText: string;
	/**
	 * Text for the confirm button.
	 */
	confirmText?: string;
	/**
	 * The identifier for the dialog element.
	 */
	id?: string;
	/**
	 * Whether the dialog is currently visible.
	 */
	isOpen: boolean;
	/**
	 * The descriptive message of the dialog.
	 */
	message?: string;
	/**
	 * Optional custom content to render inside the dialog.
	 */
	children?: ReactNode;
	/**
	 * Callback fired when the cancel button or overlay is clicked.
	 */
	onCancel: () => void;
	/**
	 * Callback fired when the confirm button is clicked.
	 */
	onConfirm?: () => void;
	/**
	 * The main heading of the dialog.
	 */
	title: string;
}

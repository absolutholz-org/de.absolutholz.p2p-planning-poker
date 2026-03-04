export interface DialogProps {
	/**
	 * Text for the cancel button.
	 */
	cancelText?: string;
	/**
	 * Text for the confirm button.
	 */
	confirmText?: string;
	/**
	 * Whether the dialog is currently visible.
	 */
	isOpen: boolean;
	/**
	 * The descriptive message of the dialog.
	 */
	message: string;
	/**
	 * Callback fired when the cancel button or overlay is clicked.
	 */
	onCancel: () => void;
	/**
	 * Callback fired when the confirm button is clicked.
	 */
	onConfirm: () => void;
	/**
	 * The main heading of the dialog.
	 */
	title: string;
}

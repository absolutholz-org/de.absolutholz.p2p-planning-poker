export interface ShareDialogProps {
	/**
	 * Whether the share dialog is currently visible.
	 */
	isOpen: boolean;
	/**
	 * Callback fired when the dialog should close.
	 */
	onClose: () => void;
	/**
	 * The identifier for the current room to share.
	 */
	roomId: string;
}

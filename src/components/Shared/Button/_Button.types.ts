import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Props for the Button component.
 */
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Variant of the button (primary, secondary, danger, ghost).
	 */
	variant?: ButtonVariant;
	/**
	 * Optional icon to display before the label.
	 */
	icon?: ReactNode;
}

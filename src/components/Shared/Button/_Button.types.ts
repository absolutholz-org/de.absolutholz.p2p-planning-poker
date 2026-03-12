import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Props for the Button component.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * The content to display inside the button.
	 */
	children?: ReactNode;
	/**
	 * An optional icon to display before the children.
	 */
	icon?: ReactNode;
	/**
	 * The visual variant of the button.
	 */
	variant?: ButtonVariant;
}

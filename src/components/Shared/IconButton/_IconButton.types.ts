import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import { type ButtonVariant } from '../Button';

export interface IIconButton extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'children'
> {
	/**
	 * The icon to display inside the button. Required for IconButton.
	 */
	icon: ReactNode;
	/**
	 * Accessible label for the button. Crucial for icon-only buttons.
	 */
	'aria-label': string;
	/**
	 * The visual variant of the button.
	 */
	variant?: ButtonVariant;
}

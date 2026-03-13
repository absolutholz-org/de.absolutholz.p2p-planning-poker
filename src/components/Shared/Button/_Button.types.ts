import type { ButtonHTMLAttributes } from 'react';

import type { IconName } from '../Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component.
 */
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * The visual variant of the button.
	 */
	variant?: ButtonVariant;
	/**
	 * The size of the button.
	 */
	size?: ButtonSize;
	/**
	 * Optional icon to display before the label.
	 */
	icon?: IconName;
}

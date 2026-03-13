import { type ButtonHTMLAttributes } from 'react';

import { type ButtonSize, type ButtonVariant } from '../Button';
import type { IconName } from '../Icon';

export interface IIconButton extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'children'
> {
	/**
	 * The name of the icon to display inside the button.
	 */
	icon: IconName;
	/**
	 * Accessible label for the button. Crucial for icon-only buttons.
	 */
	'aria-label': string;
	/**
	 * The visual variant of the button.
	 */
	variant?: ButtonVariant;
	/**
	 * The size of the button.
	 */
	size?: ButtonSize;
}

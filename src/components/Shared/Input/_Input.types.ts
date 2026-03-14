import type { InputHTMLAttributes } from 'react';

import type { IconName } from '../Icon';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Name of the icon to display (Material Symbol name or emoji)
	 */
	icon?: IconName;
	/**
	 * Error message to display below the input
	 */
	error?: string;
	/**
	 * Optional accessible label for the input.
	 * If not provided, you should ensure an aria-label or associated label element is used.
	 */
	label?: string;
}

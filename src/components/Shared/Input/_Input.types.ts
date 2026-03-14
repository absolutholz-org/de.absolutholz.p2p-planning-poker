import type { InputHTMLAttributes } from 'react';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
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

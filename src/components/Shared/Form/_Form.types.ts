import type { FormHTMLAttributes, ReactNode } from 'react';

import type { StackSpacing } from '../Stack';

export interface IForm extends FormHTMLAttributes<HTMLFormElement> {
	/**
	 * Form content
	 */
	children: ReactNode;
	/**
	 * Form-level error message
	 */
	error?: string;
	/**
	 * Spacing between form groups/fields
	 * @default 'md'
	 */
	spacing?: StackSpacing;
}

import { type ElementType, type ReactNode } from 'react';

export interface IVisuallyHidden {
	/**
	 * The content to be visually hidden but accessible to screen readers.
	 */
	children: ReactNode;
	/**
	 * The HTML element to render the component as.
	 * @default 'span'
	 */
	as?: ElementType;
}

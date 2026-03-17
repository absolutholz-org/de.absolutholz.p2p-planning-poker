import {
	type ComponentPropsWithoutRef,
	type ElementType,
	type ReactNode,
} from 'react';

export type IVisuallyHidden<T extends ElementType = 'span'> = {
	/**
	 * The content to be visually hidden but accessible to screen readers.
	 */
	children: ReactNode;
	/**
	 * The HTML element to render the component as.
	 * @default 'span'
	 */
	as?: T;
	/**
	 * Whether the content should be visible when it (or an element inside) is focused.
	 * @default false
	 */
	focusable?: boolean;
} & ComponentPropsWithoutRef<T>;

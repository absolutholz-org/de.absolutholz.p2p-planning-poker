import type { ReactNode } from 'react';

export interface IPageContainer {
	/**
	 * The content to be wrapped within the container.
	 */
	children: ReactNode;
	/**
	 * Optional class name for custom styling.
	 */
	className?: string;
}

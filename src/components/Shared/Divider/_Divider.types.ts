import type { ReactNode } from 'react';

export interface DividerProps {
	/**
	 * Optional text to display in the middle of the divider
	 */
	children?: ReactNode;
	/**
	 * If true, the divider will be hidden on desktop screens (>= 45rem)
	 * @default false
	 */
	hideOnDesktop?: boolean;
}

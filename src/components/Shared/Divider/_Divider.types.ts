import { type ReactNode } from 'react';

export interface IDivider {
	/**
	 * The content to display inside the divider.
	 */
	children?: ReactNode;
	/**
	 * Whether the divider should be hidden on desktop screens.
	 */
	hideOnDesktop?: boolean;
}

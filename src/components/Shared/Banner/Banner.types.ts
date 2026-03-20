import type { ReactNode } from 'react';

export type BannerVariant = 'success' | 'info';

export interface IBanner {
	/**
	 * Optional action to be displayed on the right side of the banner.
	 */
	action?: ReactNode;

	/**
	 * The message to be displayed in the banner.
	 */
	message: string;

	/**
	 * The visual style of the banner.
	 * @default 'info'
	 */
	variant?: BannerVariant;
}

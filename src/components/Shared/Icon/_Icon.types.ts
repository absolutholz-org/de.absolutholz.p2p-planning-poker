import type { HTMLAttributes } from 'react';

export type IconName =
	| 'add'
	| 'arrow_right'
	| 'check'
	| 'contrast'
	| 'crown'
	| 'dark_mode'
	| 'key'
	| 'language'
	| 'light_mode'
	| 'pause'
	| 'play_arrow'
	| 'refresh'
	| 'remove'
	| 'user'
	| (string & {});

export interface IIcon extends HTMLAttributes<HTMLElement> {
	/**
	 * Name of the icon to display (Material Symbol name or emoji/text)
	 */
	name: IconName;
	/**
	 * Size of the icon (default: 24)
	 */
	size?: 12 | 16 | 20 | 24;
	/**
	 * Optional accessible label for the icon
	 */
	label?: string;
	/**
	 * Whether the icon should be filled
	 */
	fill?: boolean;
	/**
	 * Font weight (100-700)
	 */
	weight?: number;
	/**
	 * Grade (-25 to 200)
	 */
	grade?: number;
	/**
	 * Optical size (20-48)
	 */
	opticalSize?: number;
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ICard extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'value'
> {
	/**
	 * The display value of the card (e.g., '1', 'Coffee').
	 */
	value: ReactNode;
	/**
	 * Whether the card is currently selected by the user.
	 */
	isSelected?: boolean;
	/**
	 * Whether the card value should be hidden (used before votes are revealed).
	 */
	isHidden?: boolean;
}

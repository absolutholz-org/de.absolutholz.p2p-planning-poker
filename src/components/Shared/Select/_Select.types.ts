import { type ReactNode } from 'react';

/**
 * Represents a single option in the select component.
 */
export interface ISelectOption<T extends string = string> {
	/**
	 * Unique identifier for the option.
	 */
	id: T;
	/**
	 * Display label for the option.
	 */
	label: ReactNode;
	/**
	 * Accessible title for the option.
	 */
	title?: string;
	/**
	 * Optional icon for the option.
	 */
	icon?: ReactNode;
}

/**
 * Props for the Select component.
 */
export interface ISelect<T extends string = string> {
	/**
	 * The current active (selected) option ID.
	 */
	activeId: T;
	/**
	 * Callback fired when an option is selected.
	 */
	onSelect: (id: T) => void;
	/**
	 * Array of available options.
	 */
	options: ISelectOption<T>[];
	/**
	 * Accessible label for the select component.
	 */
	'aria-label': string;
	/**
	 * Optional CSS class name for the trigger button.
	 */
	className?: string;
	/**
	 * The visual variant of the trigger button.
	 */
	variant?: 'primary' | 'secondary' | 'danger';
	/**
	 * Whether to show the text label in the trigger button.
	 * If false, IconButton is used.
	 */
	showLabel?: boolean;
}

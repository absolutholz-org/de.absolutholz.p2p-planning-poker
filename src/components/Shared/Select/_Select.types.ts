import { type ReactNode } from 'react';

export interface SelectOption<T extends string> {
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

export interface SelectProps<T extends string> {
	/**
	 * The currently active option ID.
	 */
	activeId: T;
	/**
	 * Callback when an option is selected.
	 */
	onSelect: (id: T) => void;
	/**
	 * List of available options.
	 */
	options: SelectOption<T>[];
	/**
	 * Accessible label for the select trigger.
	 */
	'aria-label': string;
	/**
	 * Custom class name for the trigger button.
	 */
	className?: string;
	/**
	 * The visual variant of the trigger button.
	 */
	variant?: 'primary' | 'secondary' | 'danger';
}

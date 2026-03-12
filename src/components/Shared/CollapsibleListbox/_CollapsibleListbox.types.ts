import { type ReactNode } from 'react';

/**
 * Represents a single option in the CollapsibleListbox component.
 */
export interface ICollapsibleListboxOption<T extends string = string> {
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
 * Props for the CollapsibleListbox component.
 */
export interface ICollapsibleListbox<T extends string = string> {
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
	options: ICollapsibleListboxOption<T>[];
	/**
	 * Accessible label for the listbox component.
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

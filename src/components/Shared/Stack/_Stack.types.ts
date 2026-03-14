import type { ElementType, ReactNode } from 'react';

/**
 * Valid spacing values based on the system design tokens.
 */
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface IStack {
	/**
	 * Elements to be laid out
	 */
	children: ReactNode;
	/**
	 * Direction of the stack
	 * @default 'column'
	 */
	direction?: 'row' | 'column';
	/**
	 * Spacing between elements
	 * @default 'md'
	 */
	spacing?: StackSpacing;
	/**
	 * Alignment of elements along the cross axis
	 * @default 'stretch'
	 */
	align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	/**
	 * Alignment of elements along the main axis
	 * @default 'start'
	 */
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
	/**
	 * Whether to wrap elements if they exceed the container size
	 * @default false
	 */
	wrap?: boolean;
	/**
	 * The HTML element to render
	 * @default 'div'
	 */
	component?: ElementType;
	/**
	 * Optional CSS class
	 */
	className?: string;
}

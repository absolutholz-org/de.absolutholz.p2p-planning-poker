import type { ReactElement, ReactNode } from 'react';

export interface IPopover {
	/** First child is the trigger element, the rest of the children are the popover content. */
	children: [ReactElement, ...ReactNode[]];
	/** Preferred position of the popover */
	align?: 'start' | 'end' | 'top' | 'right' | 'bottom' | 'left';
}

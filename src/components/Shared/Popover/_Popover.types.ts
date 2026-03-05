import type { ReactNode, RefObject } from 'react';

export interface PopoverProps {
	renderTrigger: (props: {
		popoverTarget: string;
		ref: RefObject<HTMLButtonElement | null>;
	}) => ReactNode;
	children: ReactNode;
	align?: 'start' | 'end';
}

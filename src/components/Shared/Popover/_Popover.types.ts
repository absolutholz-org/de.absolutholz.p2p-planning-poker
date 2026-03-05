import type { ReactNode, RefObject } from 'react';

export interface PopoverProps {
	renderTrigger: (props: {
		popoverTarget: string;
		ref: RefObject<HTMLButtonElement>;
	}) => ReactNode;
	children: ReactNode;
	align?: 'start' | 'end';
}

import { type ReactNode } from 'react';

export interface IDisclosure {
	title: ReactNode | string;
	icon?: string;
	children: ReactNode;
}

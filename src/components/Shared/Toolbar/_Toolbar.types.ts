import type { CSSProperties, ReactNode } from 'react';

export interface IToolbarContext {
	registerItem: (id: string) => void;
	setTabStopId: (id: string) => void;
	tabStopId: string | null;
	unregisterItem: (id: string) => void;
}

export interface IToolbar {
	'aria-label': string;
	children: ReactNode;
	style?: CSSProperties;
}

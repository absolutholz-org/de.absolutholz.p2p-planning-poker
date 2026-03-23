import type { ReactNode } from 'react';

import * as S from './_Toolbar.styles';

export interface IToolbarGroup {
	children: ReactNode;
	className?: string;
}

/**
 * ToolbarGroup provides flex-based layout grouping for related toolbar items.
 * Uses system spacing tokens for consistent gaps.
 */
export function ToolbarGroup({ children, className }: IToolbarGroup) {
	return <S.Group className={className}>{children}</S.Group>;
}

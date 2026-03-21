import { type ReactNode } from 'react';

import * as S from './Toolbar.styles';

interface ToolbarGroupProps {
	children: ReactNode;
	className?: string;
}

/**
 * ToolbarGroup provides flex-based layout grouping for related toolbar items.
 * Uses system spacing tokens for consistent gaps.
 */
export function ToolbarGroup({ children, className }: ToolbarGroupProps) {
	return <S.Group className={className}>{children}</S.Group>;
}

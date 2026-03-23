import { useCallback, useState } from 'react';

import * as S from './_Toolbar.styles';
import type { IToolbar } from './_Toolbar.types';
import { ToolbarContext } from './_ToolbarContext';
import { useToolbarNavigation } from './_useToolbarNavigation';

/**
 * Toolbar Root component that provides focus management via roving tabindex.
 * Implements role="toolbar" for standard accessibility.
 */
export function Toolbar({
	'aria-label': ariaLabel,
	children,
	style,
}: IToolbar) {
	const { handleKeyDown } = useToolbarNavigation();
	const [tabStopId, setTabStopId] = useState<string | null>(null);

	const registerItem = useCallback((id: string) => {
		setTabStopId((current) => (current === null ? id : current));
	}, []);

	const unregisterItem = useCallback(
		(id: string) => {
			setTabStopId((current) => (current === id ? null : current));
		},
		[setTabStopId],
	);

	return (
		<ToolbarContext.Provider
			value={{ registerItem, setTabStopId, tabStopId, unregisterItem }}
		>
			<S.ToolbarRoot
				role="toolbar"
				aria-label={ariaLabel}
				onKeyDown={handleKeyDown}
				style={style}
			>
				{children}
			</S.ToolbarRoot>
		</ToolbarContext.Provider>
	);
}

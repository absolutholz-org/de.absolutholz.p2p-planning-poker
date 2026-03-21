import React, {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from 'react';

import * as S from './Toolbar.styles';
import { useToolbarNavigation } from './useToolbarNavigation';

interface ToolbarContextValue {
	registerItem: (id: string) => void;
	setTabStopId: (id: string) => void;
	tabStopId: string | null;
	unregisterItem: (id: string) => void;
}

const ToolbarContext = createContext<ToolbarContextValue | undefined>(
	undefined,
);

export function useToolbar() {
	const context = useContext(ToolbarContext);
	if (!context) {
		throw new Error('useToolbar must be used within a Toolbar root');
	}
	return context;
}

interface ToolbarProps {
	'aria-label': string;
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * Toolbar Root component that provides focus management via roving tabindex.
 * Implements role="toolbar" for standard accessibility.
 */
export function Toolbar({
	'aria-label': ariaLabel,
	children,
	className,
	style,
}: ToolbarProps) {
	const { containerRef, handleKeyDown } = useToolbarNavigation();
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
				ref={containerRef}
				role="toolbar"
				aria-label={ariaLabel}
				onKeyDown={handleKeyDown}
				className={className}
				style={style}
			>
				{children}
			</S.ToolbarRoot>
		</ToolbarContext.Provider>
	);
}

import { createContext, useContext, type ReactNode } from 'react';

import * as S from './Toolbar.styles';
import { useToolbarNavigation } from './useToolbarNavigation';

interface ToolbarContextValue {
	focusedIndex: number;
	setFocusedIndex: (index: number) => void;
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
	const { containerRef, focusedIndex, handleKeyDown, setFocusedIndex } =
		useToolbarNavigation();

	return (
		<ToolbarContext.Provider value={{ focusedIndex, setFocusedIndex }}>
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

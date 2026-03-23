import { useContext } from 'react';

import { ToolbarContext } from './_ToolbarContext';

/**
 * useToolbar hook to access the Toolbar context.
 * Useful for any child component that needs to register or manage focus.
 */
export function useToolbar() {
	const context = useContext(ToolbarContext);
	if (!context) {
		throw new Error('useToolbar must be used within a Toolbar root');
	}
	return context;
}

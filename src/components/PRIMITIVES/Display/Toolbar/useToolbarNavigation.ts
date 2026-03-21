import type React from 'react';
import { useCallback, useRef } from 'react';

/**
 * Hook to manage a roving tabindex for a toolbar.
 *
 * Supports ArrowLeft, ArrowRight, Home, and End keys.
 * Items in the toolbar must have the data-toolbar-item="true" attribute.
 */
export function useToolbarNavigation() {
	const containerRef = useRef<HTMLDivElement>(null);

	const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
		if (!containerRef.current) return;

		// Find all focusable toolbar items
		const items = Array.from(
			containerRef.current.querySelectorAll(
				'[data-toolbar-item="true"]:not([disabled])',
			),
		) as HTMLElement[];

		if (items.length === 0) return;

		// Find current index based on active element
		const currentIndex = items.indexOf(
			document.activeElement as HTMLElement,
		);

		let nextIndex = currentIndex !== -1 ? currentIndex : 0;

		switch (event.key) {
			case 'ArrowRight':
				nextIndex = (nextIndex + 1) % items.length;
				break;
			case 'ArrowLeft':
				nextIndex = (nextIndex - 1 + items.length) % items.length;
				break;
			case 'Home':
				nextIndex = 0;
				break;
			case 'End':
				nextIndex = items.length - 1;
				break;
			default:
				return;
		}

		event.preventDefault();

		// Focus the next item immediately
		items[nextIndex].focus();
	}, []);

	return {
		containerRef,
		handleKeyDown,
	};
}

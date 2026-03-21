import { useCallback, useRef, useState } from 'react';

/**
 * Hook to manage a roving tabindex for a toolbar.
 *
 * Supports ArrowLeft, ArrowRight, Home, and End keys.
 * Items in the toolbar must have the data-toolbar-item="true" attribute.
 */
export function useToolbarNavigation() {
	const [focusedIndex, setFocusedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (!containerRef.current) return;

			// Find all focusable toolbar items (skipping groups and non-interactive wrappers)
			const items = Array.from(
				containerRef.current.querySelectorAll(
					'[data-toolbar-item="true"]:not([disabled])',
				),
			) as HTMLElement[];

			if (items.length === 0) return;

			let nextIndex = focusedIndex;

			switch (event.key) {
				case 'ArrowRight':
					nextIndex = (focusedIndex + 1) % items.length;
					break;
				case 'ArrowLeft':
					nextIndex =
						(focusedIndex - 1 + items.length) % items.length;
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
			setFocusedIndex(nextIndex);

			// Focus the next item immediately to allow for rapid keyboard interaction
			items[nextIndex].focus();
		},
		[focusedIndex],
	);

	return {
		containerRef,
		focusedIndex,
		handleKeyDown,
		setFocusedIndex,
	};
}

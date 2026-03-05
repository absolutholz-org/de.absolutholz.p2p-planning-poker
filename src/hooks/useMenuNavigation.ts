import { type RefObject, useEffect } from 'react';

/**
 * A hook to manage keyboard navigation within a menu container.
 * It cycles focus between child elements explicitly marked with `role="menuitem"`.
 */
export function useMenuNavigation(containerRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const popoverElement = container.closest('[popover]');
		if (!popoverElement) return;

		const handleToggle = (e: Event) => {
			const toggleEvent = e as Event & { newState: string };
			if (toggleEvent.newState === 'open') {
				// Focus the first menu item or the currently checked item when opened
				const items = Array.from(
					container.querySelectorAll<HTMLElement>(
						'[role="menuitem"]',
					),
				);
				if (items.length > 0) {
					const selectedItem =
						items.find(
							(item) =>
								item.hasAttribute('data-active') &&
								item.getAttribute('data-active') !== 'false',
						) || items[0];

					// Slight delay to ensure popover is fully visible before focusing
					setTimeout(() => {
						selectedItem.focus();
					}, 0);
				}
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const currentFocus = document.activeElement as HTMLElement;
			const menuItems = Array.from(
				container.querySelectorAll<HTMLElement>('[role="menuitem"]'),
			);

			if (!menuItems.includes(currentFocus)) return;

			const currentIndex = menuItems.indexOf(currentFocus);

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					menuItems[(currentIndex + 1) % menuItems.length]?.focus();
					break;
				case 'ArrowUp':
					e.preventDefault();
					menuItems[
						(currentIndex - 1 + menuItems.length) % menuItems.length
					]?.focus();
					break;
				case 'Home':
					e.preventDefault();
					menuItems[0]?.focus();
					break;
				case 'End':
					e.preventDefault();
					menuItems[menuItems.length - 1]?.focus();
					break;
				case 'Enter':
				case ' ':
					e.preventDefault();
					currentFocus.click();

					// Optionally close the popover. Native buttons inside standard popover close it
					// but let's fire a blur or let the popover click handler do it.
					break;
			}
		};

		popoverElement.addEventListener('toggle', handleToggle);
		container.addEventListener('keydown', handleKeyDown);

		return () => {
			popoverElement.removeEventListener('toggle', handleToggle);
			container.removeEventListener('keydown', handleKeyDown);
		};
	}, [containerRef]);
}

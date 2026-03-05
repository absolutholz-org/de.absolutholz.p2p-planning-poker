import { useEffect, useId, useLayoutEffect, useRef } from 'react';

import * as S from './_Popover.styles';
import type { PopoverProps } from './_Popover.types';

export function Popover({
	align = 'end',
	children,
	renderTrigger,
}: PopoverProps) {
	const rawId = useId();
	const id = `popover-${rawId.replace(/:/g, '')}`; // Safe DOM string
	const triggerRef = useRef<HTMLButtonElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	// Force DOM attributes to bypass @emotion/is-prop-valid stripping modern HTML Popover hooks
	useLayoutEffect(() => {
		if (triggerRef.current) {
			triggerRef.current.setAttribute('popovertarget', id);
		}
		if (popoverRef.current && !popoverRef.current.hasAttribute('popover')) {
			popoverRef.current.setAttribute('popover', 'auto');
		}
	}, [id]);

	useEffect(() => {
		const popover = popoverRef.current;
		if (!popover) return;

		const handleToggle = (e: Event) => {
			// Cast event to standard toggle payload without triggering any-type lints
			const toggleEvent = e as Event & { newState: string };
			if (toggleEvent.newState === 'open' && triggerRef.current) {
				const rect = triggerRef.current.getBoundingClientRect();

				// Base top anchoring against the bottom of the bounding element
				popover.style.top = `${rect.bottom + 8}px`;

				// Calc alignment hooks
				if (align === 'end') {
					popover.style.left = `${rect.right - popover.offsetWidth}px`;
				} else {
					popover.style.left = `${rect.left}px`;
				}
			}
		};

		popover.addEventListener('toggle', handleToggle);
		return () => popover.removeEventListener('toggle', handleToggle);
	}, [align]);

	return (
		<>
			{renderTrigger({ popovertarget: id, ref: triggerRef })}
			<S.PopoverContent
				id={id}
				popover="auto"
				ref={popoverRef}
				onClick={(e) => {
					// Auto dismiss logic when a semantic button/link action resolves within the card
					if ((e.target as HTMLElement).closest('button, a')) {
						popoverRef.current?.hidePopover?.();
					}
				}}
			>
				{children}
			</S.PopoverContent>
		</>
	);
}

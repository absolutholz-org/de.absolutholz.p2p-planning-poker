import {
	Children,
	cloneElement,
	type ReactElement,
	type Ref,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
} from 'react';

import {
	type FloatingPosition,
	useFloatingPosition,
} from '../../../hooks/useFloatingPosition';
import * as S from './_Popover.styles';
import type { IPopover } from './_Popover.types';

export function Popover({ align = 'bottom', children }: IPopover) {
	const rawId = useId();
	const id = `popover-${rawId.replace(/:/g, '')}`; // Safe DOM string
	const triggerRef = useRef<HTMLElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const childrenArray = Children.toArray(children);
	const trigger = childrenArray[0] as ReactElement;
	const popoverContent = childrenArray.slice(1);

	// Map generic alignments to valid floating positions
	const position: FloatingPosition =
		align === 'start'
			? 'left'
			: align === 'end'
				? 'right'
				: (align as FloatingPosition);

	const { updatePosition } = useFloatingPosition({
		gap: 8,
		popoverRef,
		position,
		triggerRef,
	});

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
			if (toggleEvent.newState === 'open') {
				requestAnimationFrame(() => updatePosition());
			}
		};

		popover.addEventListener('toggle', handleToggle);
		return () => popover.removeEventListener('toggle', handleToggle);
	}, [updatePosition]);

	const mergedRef = (node: HTMLElement) => {
		triggerRef.current = node;
		const childElement = trigger as ReactElement & {
			ref?: Ref<HTMLElement>;
		};
		const childRef = childElement.ref;
		if (typeof childRef === 'function') {
			childRef(node);
		} else if (childRef && typeof childRef === 'object') {
			(childRef as { current: HTMLElement | null }).current = node;
		}
	};

	return (
		<>
			{/* eslint-disable react-hooks/refs */}
			{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			{cloneElement(trigger as ReactElement<any>, {
				popovertarget: id,
				ref: mergedRef,
			})}
			{/* eslint-enable react-hooks/refs */}
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
				{popoverContent}
			</S.PopoverContent>
		</>
	);
}

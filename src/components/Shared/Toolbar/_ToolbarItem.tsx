import { useEffect, useId } from 'react';

import { Icon } from '../Icon';
import * as S from './_Toolbar.styles';
import type { IToolbarItem } from './_ToolbarItem.types';
import { useToolbar } from './_useToolbar';

/**
 * Adaptive Toolbar Item that collapses to icon-only on mobile (< 768px).
 * Uses roving tabindex to ensure focus is managed correctly within the toolbar.
 */
export function ToolbarItem({
	className,
	disabled,
	icon,
	id: providedId,
	label,
	onClick,
	variant = 'ghost',
}: IToolbarItem) {
	const generatedId = useId();
	const id = providedId || generatedId;

	const { registerItem, setTabStopId, tabStopId, unregisterItem } =
		useToolbar();

	useEffect(() => {
		if (!disabled) {
			registerItem(id);
		}
		return () => unregisterItem(id);
	}, [id, disabled, registerItem, unregisterItem]);

	const isActive = tabStopId === id;

	return (
		<S.ItemButton
			data-toolbar-item="true"
			tabIndex={isActive ? 0 : -1}
			onClick={() => {
				setTabStopId(id);
				onClick?.();
			}}
			onFocus={() => setTabStopId(id)}
			disabled={disabled}
			variant={variant}
			title={label} // Tooltip fallback for icon-only state
			aria-label={label}
			className={className}
		>
			<Icon name={icon} size="sm" aria-hidden="true" />
			<S.ItemLabel>{label}</S.ItemLabel>
		</S.ItemButton>
	);
}

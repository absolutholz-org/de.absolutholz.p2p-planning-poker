import { Icon } from '../../../Shared/Icon';
import { useToolbar } from './Toolbar';
import * as S from './Toolbar.styles';

export type ToolbarItemVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ToolbarItemProps {
	className?: string;
	disabled?: boolean;
	icon: string;
	index: number; // Required for roving tabindex mapping
	label: string;
	onClick?: () => void;
	variant?: ToolbarItemVariant;
}

/**
 * Adaptive Toolbar Item that collapses to icon-only on mobile (< 768px).
 * Uses roving tabindex to ensure focus is managed correctly within the toolbar.
 */
export function ToolbarItem({
	className,
	disabled,
	icon,
	index,
	label,
	onClick,
	variant = 'ghost',
}: ToolbarItemProps) {
	const { focusedIndex, setFocusedIndex } = useToolbar();
	const isFocused = focusedIndex === index;

	return (
		<S.ItemButton
			data-toolbar-item="true"
			tabIndex={isFocused ? 0 : -1}
			onClick={() => {
				setFocusedIndex(index);
				onClick?.();
			}}
			onFocus={() => setFocusedIndex(index)}
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

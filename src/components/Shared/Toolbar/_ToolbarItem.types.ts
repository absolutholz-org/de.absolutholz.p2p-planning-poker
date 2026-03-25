export type ToolbarItemVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface IToolbarItem {
	ariaControls?: string;
	ariaExpanded?: boolean;
	ariaHasPopup?: 'dialog' | 'menu';
	className?: string;
	disabled?: boolean;
	icon: string;
	id?: string;
	label: string;
	onClick?: () => void;
	variant?: ToolbarItemVariant;
}

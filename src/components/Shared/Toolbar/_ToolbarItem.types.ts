export type ToolbarItemVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface IToolbarItem {
	className?: string;
	disabled?: boolean;
	icon: string;
	id?: string;
	label: string;
	onClick?: () => void;
	variant?: ToolbarItemVariant;
}

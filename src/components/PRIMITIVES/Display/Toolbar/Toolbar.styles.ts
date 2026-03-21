import styled from '@emotion/styled';

import type { ToolbarItemVariant } from './ToolbarItem';

export const ToolbarRoot = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--sys-spacing-md);
`;

export const Group = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
	padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-md);
	box-shadow: var(--sys-shadow-sm);
`;

interface ItemButtonProps {
	variant: ToolbarItemVariant;
}

export const ItemButton = styled.button<ItemButtonProps>`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-sm);
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	border-radius: var(--sys-radius-sm);
	font-size: var(--sys-font-size-sm);
	font-weight: var(--sys-font-weight-medium);
	transition:
		background-color 0.2s ease-in-out,
		color 0.2s ease-in-out,
		outline 0.2s ease-in-out;
	border: 1px solid transparent;

	${({ variant }) => {
		switch (variant) {
			case 'primary':
				return `
					background-color: var(--sys-color-primary);
					color: var(--sys-color-primary-text);
					&:hover:not(:disabled) { background-color: var(--sys-color-primary-hover); }
				`;
			case 'danger':
				return `
					color: var(--sys-color-danger);
					&:hover:not(:disabled) { 
						background-color: var(--sys-color-danger); 
						color: var(--sys-color-primary-text);
					}
				`;
			case 'secondary':
				return `
					background-color: var(--sys-color-surface);
					border-color: var(--sys-color-border);
					color: var(--sys-color-text-primary);
					&:hover:not(:disabled) { background-color: var(--sys-color-bg); }
				`;
			default:
				return `
					background-color: transparent;
					color: var(--sys-color-text-primary);
					&:hover:not(:disabled) { background-color: var(--sys-color-bg); }
				`;
		}
	}}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 2px solid var(--sys-color-primary);
		outline-offset: 2px;
	}
`;

export const ItemLabel = styled.span`
	@media (max-width: 768px) {
		display: none;
	}
`;

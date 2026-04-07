import styled from '@emotion/styled';

import { Stack } from '../Stack';
import type { ToolbarItemVariant } from './_ToolbarItem.types';

export const ToolbarRoot = styled(Stack)`
	align-items: center;
	display: flex;
	gap: var(--sys-spacing-md);
	justify-content: space-between;
	width: fit-content;
`;

export const Group = styled.div`
	align-items: center;
	display: flex;
	gap: var(--sys-spacing-md);
`;

interface ItemButtonProps {
	variant: ToolbarItemVariant;
}

export const ItemButton = styled.button<ItemButtonProps>`
	align-items: center;
	border: 1px solid transparent;
	border-radius: var(--sys-radius-sm);
	display: flex;
	gap: var(--sys-spacing-sm);
	font-size: var(--sys-font-size-sm);
	font-weight: var(--sys-font-weight-medium);
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	transition:
		background-color 0.2s ease-in-out,
		color 0.2s ease-in-out,
		outline 0.2s ease-in-out;

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
		cursor: not-allowed;
		opacity: 0.5;
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

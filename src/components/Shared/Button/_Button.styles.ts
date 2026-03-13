import styled from '@emotion/styled';

import type { ButtonVariant } from './_Button.types';

export const Button = styled.button<{ 'data-variant': ButtonVariant }>`
	/* A11Y requirement: 48px min touch target */
	min-height: 3rem;
	min-width: 3rem;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: var(--sys-spacing-sm) var(--sys-spacing-lg);

	font-family: inherit;
	font-size: var(--sys-font-size-md);
	font-weight: 500;

	border-radius: var(--sys-radius-md);
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	gap: var(--sys-spacing-sm);

	/* Focus ring for accessibility */
	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px var(--sys-color-focus);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Variants */
	&[data-variant='primary'] {
		background-color: var(--sys-color-primary);
		color: var(--sys-color-primary-text);

		&:hover:not(:disabled) {
			background-color: var(--sys-color-primary-hover);
		}
	}

	&[data-variant='secondary'] {
		background-color: transparent;
		color: var(--sys-color-text-primary);
		border-color: var(--sys-color-border);

		&:hover:not(:disabled) {
			background-color: var(--sys-color-border);
		}
	}

	&[data-variant='danger'] {
		background-color: transparent;
		color: var(--sys-color-danger);
		border-color: var(--sys-color-border);

		&:hover:not(:disabled) {
			border-color: var(--sys-color-danger);
		}
	}

	&[data-variant='ghost'] {
		background-color: transparent;
		color: var(--sys-color-text-primary);
		border: none;

		&:hover:not(:disabled) {
			background-color: var(--sys-color-border-subtle);
		}
	}

	/* Sizes */
	&[data-size='sm'] {
		min-height: 2.25rem;
		min-width: 2.25rem;
		padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
		font-size: var(--sys-font-size-sm);
	}

	&[data-size='md'] {
		min-height: 3rem;
		min-width: 3rem;
	}

	&[data-size='lg'] {
		min-height: 3.5rem;
		min-width: 3.5rem;
		padding: var(--sys-spacing-md) var(--sys-spacing-xl);
		font-size: var(--sys-font-size-lg);
	}
`;

export const Button_Icon = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25em;
`;

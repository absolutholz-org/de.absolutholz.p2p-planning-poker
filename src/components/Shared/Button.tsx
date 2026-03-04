import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
}

// Map variants to our CSS Custom Properties from index.css
const StyledButton = styled.button<{ 'data-variant': ButtonVariant }>`
	/* A11Y requirement: 48px min touch target */
	min-height: 48px;
	min-width: 48px;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: var(--sys-spacing-sm) var(--sys-spacing-lg);

	font-family: inherit;
	font-size: 1rem;
	font-weight: 500;

	border-radius: var(--sys-radius-md);
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

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
		border-color: var(--sys-color-danger);

		&:hover:not(:disabled) {
			background-color: var(--sys-color-danger);
			color: var(--sys-color-surface);
		}
	}
`;

export function Button({
	children,
	variant = 'primary',
	...props
}: ButtonProps) {
	return (
		<StyledButton data-variant={variant} {...props}>
			{children}
		</StyledButton>
	);
}

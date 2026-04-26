import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, space } from '../../../theme/tokens';
import type { ButtonVariant } from './_Button.types';

export const Button = styled.button<{ 'data-variant': ButtonVariant }>`
	/* A11Y requirement: 48px min touch target */
	min-height: 3rem;
	min-width: 3rem;

	align-items: center;
	display: inline-flex;
	flex-shrink: 0; // tmp because of being within a flex box parent
	justify-content: center;
	padding: ${space('sm')} ${space('lg')};

	font-family: inherit;
	font-size: ${fontSize('md')};
	font-weight: 500;

	border-radius: ${borderRadius('md')};
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	gap: ${space('sm')};

	/* Focus ring for accessibility */
	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px ${color('focus')};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Variants */
	&[data-variant='primary'] {
		background-color: ${color('primary')};
		color: ${color('primary-text')};

		&:hover:not(:disabled) {
			background-color: ${color('primary-hover')};
		}
	}

	&[data-variant='success'] {
		background-color: ${color('success')};
		color: ${color('primary-text')};

		&:hover:not(:disabled) {
			background-color: ${color('success-hover')};
		}
	}

	&[data-variant='info'] {
		background-color: ${color('info')};
		color: ${color('primary-text')};

		&:hover:not(:disabled) {
			background-color: ${color('info-hover')};
		}
	}

	&[data-variant='warning'] {
		background-color: ${color('warning')};
		color: ${color('primary-text')};

		&:hover:not(:disabled) {
			background-color: ${color('warning-hover')};
		}
	}

	&[data-variant='danger'] {
		background-color: ${color('danger')};
		color: ${color('primary-text')};

		&:hover:not(:disabled) {
			background-color: ${color('danger-hover')};
		}
	}

	&[data-variant='secondary'] {
		background-color: transparent;
		color: ${color('text-primary')};
		border-color: ${color('border')};

		&:hover:not(:disabled) {
			background-color: ${color('border')};
		}
	}

	&[data-variant='ghost'] {
		background-color: transparent;
		color: ${color('text-primary')};
		border: none;

		&:hover:not(:disabled) {
			background-color: ${color('border')};
		}
	}

	/* Sizes */
	&[data-size='sm'] {
		min-height: 2.25rem;
		min-width: 2.25rem;
		padding: ${space('xs')} ${space('sm')};
		font-size: ${fontSize('sm')};
	}

	&[data-size='md'] {
		min-height: 3rem;
		min-width: 3rem;
	}

	&[data-size='lg'] {
		min-height: 3.5rem;
		min-width: 3.5rem;
		padding: ${space('md')} ${space('xl')};
		font-size: ${fontSize('lg')};
	}
`;

export const Button_Icon = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25em;
`;

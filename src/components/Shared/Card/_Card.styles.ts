import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const Card = styled.button<{
	'data-selected': boolean;
	'data-hidden': boolean;
}>`
	/* Mobile First Scaling */
	flex: 0 0 4.5rem; /* Lock exact width to force precise 4-column wrapping over 400px container */
	aspect-ratio: 2.5 / 3.5;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: ${color('surface')};
	color: ${color('text-primary')};
	border: 2px solid ${color('border')};
	border-radius: var(--sys-radius-lg);

	font-size: var(--sys-font-size-3xl);
	font-weight: 800;
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px ${color('focus')};
	}

	&:hover:not(:disabled) {
		transform: translateY(-0.25rem);
		border-color: ${color('primary')};
	}

	&[data-selected='true'] {
		border-color: ${color('primary')};
		background-color: ${color('primary')};
		color: ${color('primary-text')};
		transform: translateY(-0.5rem);
		box-shadow: 0 10px 15px -3px ${color('focus')};
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: -0.75rem;
			left: 50%;
			transform: translateX(-50%);
			width: 0.375rem;
			height: 0.375rem;
			border-radius: 50%;
			background-color: ${color('text-primary')};
		}
	}

	/* Hidden State for Roster (Pending reveal) */
	&[data-hidden='true'] {
		background-color: transparent;
		border-color: ${color('border')};
		color: transparent; /* Hide text */
		position: relative;

		&::after {
			content: '✓';
			color: ${color('text-primary')};
			font-size: var(--sys-font-size-xl);
			position: absolute;
		}
	}

	&:disabled {
		cursor: default;
		opacity: 0.8;
		&:hover {
			transform: none;
		}
	}
`;

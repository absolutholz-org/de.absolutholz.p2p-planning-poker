import styled from '@emotion/styled';

export const Card = styled.button<{
	'data-selected': boolean;
	'data-hidden': boolean;
}>`
	/* Mobile First Scaling */
	flex: 0 0 72px; /* Lock exact width to force precise 4-column wrapping over 400px container */
	aspect-ratio: 2.5 / 3.5;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: var(--sys-color-surface);
	color: var(--sys-color-text-primary);
	border: 2px solid var(--sys-color-border);
	border-radius: var(--sys-radius-lg);

	font-size: var(--sys-font-size-3xl);
	font-weight: 800;
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px var(--sys-color-focus);
	}

	&:hover:not(:disabled) {
		transform: translateY(-4px);
		border-color: var(--sys-color-primary);
	}

	&[data-selected='true'] {
		border-color: var(--sys-color-primary);
		background-color: var(--sys-color-primary);
		color: var(--sys-color-primary-text);
		transform: translateY(-8px);
		box-shadow: 0 10px 15px -3px var(--sys-color-focus);
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: -12px;
			left: 50%;
			transform: translateX(-50%);
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background-color: var(--sys-color-text-primary);
		}
	}

	/* Hidden State for Roster (Pending reveal) */
	&[data-hidden='true'] {
		background-color: transparent;
		border-color: var(--sys-color-border);
		color: transparent; /* Hide text */
		position: relative;

		&::after {
			content: '✓';
			color: var(--sys-color-text-primary);
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

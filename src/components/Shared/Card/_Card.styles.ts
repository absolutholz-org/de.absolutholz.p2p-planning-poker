import styled from '@emotion/styled';

export const Card = styled.button<{
	'data-selected': boolean;
	'data-hidden': boolean;
}>`
	/* A11Y requirement: 48px min touch target */
	min-height: 80px;
	min-width: 60px;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: var(--sys-color-surface);
	color: var(--sys-color-text-primary);
	border: 2px solid var(--sys-color-border);
	border-radius: var(--sys-radius-lg);

	font-size: 1.5rem;
	font-weight: bold;
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

	/* Selected State for VotingDeck */
	&[data-selected='true'] {
		border-color: var(--sys-color-primary);
		background-color: var(--sys-color-primary);
		color: var(--sys-color-primary-text);
		transform: translateY(-8px);
		box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
	}

	/* Hidden State for Roster (Pending reveal) */
	&[data-hidden='true'] {
		background-color: var(--sys-color-success);
		border-color: var(--sys-color-success);
		color: transparent; /* Hide text */
		/* Add a generic checkmark or pattern using pseudo element if desired */
		position: relative;

		&::after {
			content: '✓';
			color: var(--sys-color-surface);
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

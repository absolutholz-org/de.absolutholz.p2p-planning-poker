import styled from '@emotion/styled';

export const SwitcherContainer = styled.nav`
	display: flex;
	gap: 0.25rem;
	align-items: center;
	background: var(--sys-color-surface-hover);
	padding: 0.25rem;
	border-radius: var(--sys-radius-full);
`;

export const LanguageButton = styled.button`
	background: transparent;
	border: none;
	color: var(--sys-color-text-secondary);
	font-family: inherit;
	font-size: 0.75rem;
	font-weight: 600;
	cursor: pointer;

	/* Logical properties for resilient layout */
	min-width: 2rem;
	min-height: 2rem;
	padding-inline: 0.5rem;
	border-radius: var(--sys-radius-full);

	display: flex;
	align-items: center;
	justify-content: center;

	transition: all 0.2s ease;

	&:hover {
		color: var(--sys-color-text-primary);
		background: var(--sys-color-surface-active);
	}

	&[data-active='true'] {
		background: var(--sys-color-primary);
		color: var(--sys-color-surface);
	}

	/* Force minimum 48px touch target for strict A11Y */
	@media (pointer: coarse) {
		min-width: 3rem;
		min-height: 3rem;
	}
`;

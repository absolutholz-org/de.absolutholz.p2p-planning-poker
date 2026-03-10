import styled from '@emotion/styled';

export const Tooltip = styled.div`
	margin: 0;
	padding: var(--sys-spacing-xs) var(--sys-spacing-md);
	background-color: var(--sys-color-primary);
	color: var(--sys-color-primary-text);
	font-size: var(--sys-font-size-xs);
	font-weight: 500;
	border-radius: var(--sys-radius-sm);
	border: none;
	box-shadow: var(--sys-shadow-sm);
	z-index: 50;
	white-space: nowrap;

	/* Reset positioning to be controlled by JS */
	inset: auto;
	position: fixed;

	/* Baseline hidden state */
	display: none;

	/* Native API state and our fallback state */
	&:popover-open,
	&.fallback-open {
		display: block;
		animation: popoverFadeIn 0.15s ease-out forwards;
	}

	@keyframes popoverFadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

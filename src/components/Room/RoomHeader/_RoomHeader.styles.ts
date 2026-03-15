import styled from '@emotion/styled';

import { Stack } from '../../Shared/Stack';

export const SubHeaderContainer = styled.div`
	align-items: stretch; /* Stretch children (Actions) to full width */
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-md);
	justify-content: space-between;

	@media (min-width: 600px) {
		align-items: center;
		flex-direction: row;
	}
`;

export const Toast = styled.div`
	animation:
		fadein 0.3s,
		fadeout 0.3s 2.5s forwards;
	background: var(--sys-color-text-primary);
	border-radius: var(--sys-radius-pill);
	bottom: var(--sys-spacing-xl);
	box-shadow: var(--sys-shadow-lg);
	color: var(--sys-color-bg);
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
	left: 50%;
	padding: var(--sys-spacing-md) var(--sys-spacing-lg);
	position: fixed;
	transform: translateX(-50%);
	z-index: 50;

	@keyframes fadein {
		from {
			opacity: 0;
			transform: translate(-50%, 1.25rem);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
	@keyframes fadeout {
		from {
			opacity: 1;
			transform: translate(-50%, 0);
		}
		to {
			opacity: 0;
			transform: translate(-50%, 1.25rem);
		}
	}
`;

export const Actions = styled(Stack)`
	@media (max-width: 600px) {
		/* Ensure buttons stretch perfectly inside the grid cells */
		button {
			width: 100%;
			font-size: var(--sys-font-size-sm);
			padding: var(--sys-spacing-sm);
		}
	}
`;

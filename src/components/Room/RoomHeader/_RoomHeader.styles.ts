import styled from '@emotion/styled';

export const SubHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-md);
	justify-content: space-between;
	align-items: stretch;

	@media (min-width: 600px) {
		flex-direction: row;
		align-items: center;
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

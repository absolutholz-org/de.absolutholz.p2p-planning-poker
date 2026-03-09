import styled from '@emotion/styled';

export const SubHeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-xl) 0;
	width: 100%;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: stretch; /* Stretch children (Actions) to full width */
		gap: var(--sys-spacing-lg);
		padding: var(--sys-spacing-md) var(--sys-spacing-sm);
	}
`;

export const Toast = styled.div`
	animation:
		fadein 0.3s,
		fadeout 0.3s 2.5s forwards;
	background: var(--sys-color-text-primary);
	border-radius: var(--sys-radius-pill);
	bottom: var(--sys-spacing-xl);
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
			transform: translate(-50%, 20px);
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
			transform: translate(-50%, 20px);
		}
	}
`;

export const Actions = styled.div`
	display: flex;
	gap: var(--sys-spacing-sm);

	@media (max-width: 600px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;

		/* Ensure buttons stretch perfectly inside the grid cells */
		button {
			width: 100%;
			font-size: var(--sys-font-size-sm);
			padding: var(--sys-spacing-sm);
		}
	}
`;

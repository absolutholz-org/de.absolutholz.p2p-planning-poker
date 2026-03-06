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

export const ShareWrapper = styled.div`
	position: relative;

	@media (min-width: 1024px) {
		display: none;
	}
`;

export const Toast = styled.div`
	position: fixed;
	bottom: var(--sys-spacing-xl);
	left: 50%;
	transform: translateX(-50%);
	background: var(--sys-color-text-primary);
	color: var(--sys-color-bg);
	padding: var(--sys-spacing-md) var(--sys-spacing-lg);
	border-radius: var(--sys-radius-pill);
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
	z-index: 50;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	animation:
		fadein 0.3s,
		fadeout 0.3s 2.5s forwards;

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

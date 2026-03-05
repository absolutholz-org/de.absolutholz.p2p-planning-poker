import styled from '@emotion/styled';

export const SubHeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-xl) 0;
	margin: 0 auto;
	max-width: 1200px;
	width: 100%;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: stretch; /* Stretch children (Actions) to full width */
		gap: var(--sys-spacing-lg);
		padding: var(--sys-spacing-md) var(--sys-spacing-sm);
	}
`;

export const RoomCodeLabel = styled.div`
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--sys-color-text-secondary);
	margin-bottom: 4px;
`;

export const RoomCodeValue = styled.div`
	font-size: 1.25rem;
	font-weight: 700;
	color: var(--sys-color-text-primary);
	font-variant-numeric: tabular-nums;
`;

export const RoomInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ShareWrapper = styled.div`
	position: relative;
`;

export const ShareMenu = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: var(--sys-spacing-sm);
	background: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-md);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	padding: var(--sys-spacing-xs);
	display: flex;
	flex-direction: column;
	min-width: 220px;
	z-index: 20;
`;

export const ShareMenuItem = styled.button`
	text-align: left;
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	min-height: 48px; /* A11y touch target */
	background: transparent;
	border: none;
	border-radius: var(--sys-radius-sm);
	color: var(--sys-color-text-primary);
	font-size: 0.875rem;
	cursor: pointer;

	&:hover {
		background: var(--sys-color-bg);
	}

	&:focus-visible {
		outline: 2px solid var(--sys-color-focus);
		outline-offset: -2px;
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
	font-size: 0.875rem;
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
			font-size: 0.875rem;
			padding: var(--sys-spacing-sm);
		}
	}
`;

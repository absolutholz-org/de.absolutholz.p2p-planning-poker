import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-md) var(--sys-spacing-xl);
	background-color: var(--sys-color-surface);
	border-bottom: 1px solid var(--sys-color-border);
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 10;
`;

export const Brand = styled.div`
	font-weight: bold;
	font-size: 1.25rem;
	color: var(--sys-color-primary);
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-sm);
`;

export const RoomInfo = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
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
`;

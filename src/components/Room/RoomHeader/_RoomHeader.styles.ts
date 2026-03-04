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

export const RoomCodeBadge = styled.button`
	background: var(--sys-color-bg);
	border: 1px solid var(--sys-color-border);
	padding: var(--sys-spacing-xs) var(--sys-spacing-md);
	border-radius: var(--sys-radius-pill);
	font-family: monospace;
	font-size: 0.875rem;
	color: var(--sys-color-text-secondary);
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: var(--sys-color-border);
		color: var(--sys-color-text-primary);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px var(--sys-color-focus);
	}
`;

export const Actions = styled.div`
	display: flex;
	gap: var(--sys-spacing-sm);
`;

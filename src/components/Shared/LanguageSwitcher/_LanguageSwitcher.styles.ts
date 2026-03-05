import styled from '@emotion/styled';

export const TriggerButton = styled.button`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-sm);
	height: 44px; /* Match SchemeSwitcher height */
	background: transparent;
	border: 1px solid var(--sys-color-border);
	padding: 0 var(--sys-spacing-md);
	border-radius: var(--sys-radius-pill);
	color: var(--sys-color-text-primary);
	font-weight: 500;
	font-size: var(--sys-font-size-sm);
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: var(--sys-color-bg);
	}

	&:focus-visible {
		outline: 2px solid var(--sys-color-focus);
	}
`;

export const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 140px;
`;

export const MenuItem = styled.button<{ 'data-active': boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	background: ${(props) =>
		props['data-active'] ? 'var(--sys-color-bg)' : 'transparent'};
	border: none;
	width: 100%;
	text-align: left;
	font-size: var(--sys-font-size-sm);
	color: var(--sys-color-text-primary);
	border-radius: var(--sys-radius-sm);
	cursor: pointer;

	&:hover {
		background: var(--sys-color-border);
	}

	.check {
		font-weight: bold;
	}
`;

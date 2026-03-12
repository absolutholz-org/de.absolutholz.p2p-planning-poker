import styled from '@emotion/styled';

export const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 10rem;
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

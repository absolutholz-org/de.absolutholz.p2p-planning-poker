import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
	align-items: center;
	background-color: var(--sys-color-bg);
	border-bottom: 1px solid var(--sys-color-border);
	display: flex;
	justify-content: space-between;
	padding: var(--sys-spacing-md) var(--page-content-padding);
	position: sticky;
	top: 0;
	z-index: 50;

	@media (max-width: 600px) {
		padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	}
`;

export const Brand = styled.div`
	align-items: center;
	color: var(--sys-color-text-primary);
	cursor: pointer;
	display: flex;
	font-size: var(--sys-font-size-lg);
	font-weight: 700;
	gap: var(--sys-spacing-sm);
	transition: opacity 0.2s ease;
	user-select: none;

	&:hover {
		opacity: 0.8;
	}

	&:focus-visible {
		border-radius: var(--sys-radius-sm);
		outline: 2px solid var(--sys-color-focus);
		outline-offset: 4px;
	}
`;

export const BrandText = styled.div`
	align-items: center;
	display: flex;
	gap: var(--sys-spacing-xs);
	line-height: 1;

	@media (max-width: 600px) {
		align-items: flex-start;
		flex-direction: column;
		gap: 0.125rem;

		span {
			font-size: var(--sys-font-size-sm);
		}
	}
`;

export const LogoIcon = styled.div`
	align-items: center;
	background-color: var(--sys-color-text-primary);
	border-radius: var(--sys-radius-md);
	color: var(--sys-color-bg);
	display: flex;
	font-size: var(--sys-font-size-md);
	font-weight: 800;
	height: 2rem;
	justify-content: center;
	width: 2rem;
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
`;

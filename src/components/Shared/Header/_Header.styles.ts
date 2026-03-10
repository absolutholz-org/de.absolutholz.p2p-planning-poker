import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-md) var(--sys-spacing-xxl);
	background-color: var(--sys-color-bg);
	border-bottom: 1px solid var(--sys-color-border);
	position: sticky;
	top: 0;
	z-index: 50;

	@media (max-width: 600px) {
		padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	}
`;

export const Brand = styled.div`
	font-weight: 700;
	font-size: var(--sys-font-size-lg);
	color: var(--sys-color-text-primary);
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-sm);
	cursor: pointer;
	user-select: none;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.8;
	}

	&:focus-visible {
		outline: 2px solid var(--sys-color-focus);
		outline-offset: 4px;
		border-radius: var(--sys-radius-sm);
	}
`;

export const BrandText = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-xs);
	line-height: 1;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.125rem;

		span {
			font-size: var(--sys-font-size-sm);
		}
	}
`;

export const LogoIcon = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: var(--sys-radius-md);
	background-color: var(--sys-color-text-primary);
	color: var(--sys-color-bg);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 800;
	font-size: var(--sys-font-size-md);
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
`;

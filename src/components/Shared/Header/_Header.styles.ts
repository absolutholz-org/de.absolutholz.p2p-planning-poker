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
	font-size: 1.125rem;
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
	gap: 4px;
	line-height: 1;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;

		span {
			font-size: 0.875rem;
		}
	}
`;

export const LogoIcon = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 8px;
	background-color: var(--sys-color-text-primary);
	color: var(--sys-color-bg);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 800;
	font-size: 1rem;
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
`;

import styled from '@emotion/styled';

export const BannerContainer = styled.div`
	align-items: center;
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-lg);
	box-shadow: var(--sys-shadow-sm);
	display: flex;
	gap: var(--sys-spacing-md);
	overflow: hidden;
	padding: var(--sys-spacing-sm-md) var(--sys-spacing-md);
	position: relative;
	width: 100%;

	&::before {
		background-color: var(--banner-accent-color);
		bottom: 0;
		content: '';
		left: 0;
		position: absolute;
		top: 0;
		width: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

export const IconContainer = styled.div`
	align-items: center;
	color: var(--banner-accent-color);
	display: flex;
	flex-shrink: 0;
`;

export const Message = styled.span`
	color: var(--sys-color-text-primary);
	flex: 1;
	font-size: var(--sys-font-size-md);
	font-weight: var(--sys-font-weight-bold);
`;

export const ActionContainer = styled.div`
	display: flex;
	flex-shrink: 0;
`;

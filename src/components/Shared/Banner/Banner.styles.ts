import styled from '@emotion/styled';

import { type BannerVariant } from './Banner.types';

export const BannerContainer = styled.div<{ variant: BannerVariant }>`
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
		background-color: var(--sys-color-${({ variant }) => variant});
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

export const IconContainer = styled.div<{ variant: BannerVariant }>`
	align-items: center;
	color: var(--sys-color-${({ variant }) => variant});
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

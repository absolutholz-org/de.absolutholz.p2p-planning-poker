import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Stack } from '../Stack';

export const FooterContainer = styled.footer`
	align-items: center;
	border-top: 1px solid var(--sys-color-border);
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-md);
	padding: var(--sys-spacing-lg) var(--page-content-padding);
	text-align: center;

	> *:not(:first-child) {
		@media (max-width: 767px) {
			border-top: 1px solid var(--sys-color-border);
			padding-top: var(--sys-spacing-md);
		}
	}

	@media (min-width: 768px) {
		flex-direction: row;
		gap: var(--page-content-padding);
		justify-content: space-between;
		padding: var(--sys-spacing-md) var(--page-content-padding);
	}
`;

export const IdentityContainer = styled(Stack)`
	width: auto;
`;

const commonLinkStyles = `
	color: var(--sys-color-text);
	font-size: var(--sys-font-size-sm);
	padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

export const FooterLink = styled(Link)`
	${commonLinkStyles}
`;

export const StaticFooterLink = styled.a`
	${commonLinkStyles}
`;

export const Copyright = styled.span`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	white-space: nowrap;
`;

export const VersionInfo = styled.span`
	font-size: var(--sys-font-size-xs);
	opacity: 0.6;
	white-space: nowrap;
`;

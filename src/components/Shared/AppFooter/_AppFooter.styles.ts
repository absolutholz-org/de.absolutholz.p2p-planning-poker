import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
	align-items: center;
	border-top: 1px solid var(--sys-color-border);
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-xs) var(--page-content-padding);
	justify-content: center;
	padding: var(--sys-spacing-md) var(--page-content-padding);
	text-align: center;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

export const Nav = styled.nav`
	/* Project Nav (the second one) pushed to right on desktop */
	&:nth-of-type(2) {
		@media (min-width: 768px) {
			margin-left: auto;
		}
	}
`;

const commonLinkStyles = `
	font-size: var(--sys-font-size-sm);
	padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
`;

export const FooterLink = styled(Link)`
	${commonLinkStyles}
`;

export const StaticFooterLink = styled.a`
	${commonLinkStyles}
`;

export const VersionInfo = styled.span`
	// color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	opacity: 0.6;

	@media (max-width: 767px) {
		margin-top: var(--sys-spacing-xs);
	}
`;

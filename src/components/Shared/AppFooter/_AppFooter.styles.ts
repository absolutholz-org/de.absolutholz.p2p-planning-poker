import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
	border-top: 1px solid var(--sys-color-border);
	padding: var(--sys-spacing-md);
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: var(--sys-spacing-lg);
	background-color: transparent;
`;

const commonLinkStyles = `
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	text-decoration: none;

	&:hover,
	&:focus-visible {
		text-decoration: underline;
		color: var(--sys-color-text-primary);
	}
`;

export const FooterLink = styled(Link)`
	${commonLinkStyles}
`;

export const StaticFooterLink = styled.a`
	${commonLinkStyles}
`;

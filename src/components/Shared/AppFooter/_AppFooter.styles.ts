import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
	border-top: 1px solid var(--sys-color-border);
	padding: var(--sys-spacing-md);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--sys-spacing-md) var(--sys-spacing-lg);
	background-color: transparent;
`;
export const Nav = styled.nav`
	display: contents;
`;

export const NavList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: var(--sys-spacing-sm) var(--sys-spacing-lg);
`;

export const NavListItem = styled.li`
	display: flex;
	align-items: center;
`;

const commonLinkStyles = `
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	text-decoration: none;
	border-radius: var(--sys-radius-sm);
	transition: all 0.2s ease-in-out;

	&:hover {
		text-decoration: underline;
		color: var(--sys-color-text-primary);
	}

	&:focus-visible {
		outline: 2px solid var(--sys-color-primary);
		outline-offset: 4px;
		color: var(--sys-color-text-primary);
	}
`;

export const FooterLink = styled(Link)`
	${commonLinkStyles}
`;

export const StaticFooterLink = styled.a`
	${commonLinkStyles}
`;

export const VersionInfo = styled.span`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	pointer-events: none;
	margin-left: auto;

	@media (max-width: 480px) {
		margin-left: 0;
		width: 100%;
		text-align: center;
		margin-top: var(--sys-spacing-sm);
	}
`;

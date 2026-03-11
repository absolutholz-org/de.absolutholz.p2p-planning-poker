import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const FixedFooter = styled.footer`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: var(--sys-spacing-md);
	display: flex;
	justify-content: center;
	gap: var(--sys-spacing-lg);
	background-color: transparent;
	pointer-events: none; /* Let clicks pass through empty space */

	/* Re-enable pointer events for links */
	& > * {
		pointer-events: auto;
	}
`;

export const FooterLink = styled(Link)`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	text-decoration: none;

	&:hover,
	&:focus-visible {
		text-decoration: underline;
		color: var(--sys-color-text-primary);
	}
`;

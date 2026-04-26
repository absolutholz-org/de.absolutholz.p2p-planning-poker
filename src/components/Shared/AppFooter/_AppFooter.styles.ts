import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { color } from '../../../theme/colors';
import { fontSize, space } from '../../../theme/tokens';
import { Stack } from '../Stack';

export const FooterContainer = styled.footer`
	align-items: center;
	border-top: 1px solid ${color('border')};
	display: flex;
	flex-direction: column;
	gap: ${space('md')};
	padding: ${space('lg')} var(--page-content-padding);
	text-align: center;

	> *:not(:first-child) {
		@media (max-width: 767px) {
			border-top: 1px solid ${color('border')};
			padding-top: ${space('md')};
		}
	}

	@media (min-width: 768px) {
		flex-direction: row;
		gap: var(--page-content-padding);
		justify-content: space-between;
		padding: ${space('md')} var(--page-content-padding);
	}
`;

export const IdentityContainer = styled(Stack)`
	width: auto;
`;

const commonLinkStyles = `
	color: ${color('text-primary')};
	font-size: ${fontSize('sm')};
	padding: ${space('xs')} ${space('sm')};
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
	color: ${color('text-secondary')};
	font-size: ${fontSize('sm')};
	white-space: nowrap;
`;

export const VersionInfo = styled.span`
	font-size: ${fontSize('xs')};
	opacity: 0.6;
	white-space: nowrap;
`;

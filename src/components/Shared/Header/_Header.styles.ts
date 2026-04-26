import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, space } from '../../../theme/tokens';

export const HeaderContainer = styled.header`
	align-items: center;
	background-color: ${color('bg')};
	border-bottom: 1px solid ${color('border')};
	display: flex;
	justify-content: space-between;
	padding: ${space('md')} var(--page-content-padding);
	position: sticky;
	top: 0;
	z-index: 50;

	@media (max-width: 600px) {
		padding: ${space('sm')} ${space('md')};
	}
`;

export const Brand = styled.div`
	align-items: center;
	color: ${color('text-primary')};
	cursor: pointer;
	display: flex;
	font-size: ${fontSize('lg')};
	font-weight: 700;
	gap: ${space('sm')};
	transition: opacity 0.2s ease;
	user-select: none;

	&:hover {
		opacity: 0.8;
	}

	&:focus-visible {
		border-radius: ${borderRadius('sm')};
		outline: 2px solid ${color('focus')};
		outline-offset: 4px;
	}
`;

export const BrandText = styled.div`
	align-items: center;
	display: flex;
	gap: ${space('xs')};
	line-height: 1;

	@media (max-width: 600px) {
		align-items: flex-start;
		flex-direction: column;
		gap: 0.125rem;

		span {
			font-size: ${fontSize('sm')};
		}
	}
`;

export const LogoIcon = styled.div`
	align-items: center;
	background-color: ${color('text-primary')};
	border-radius: ${borderRadius('md')};
	color: ${color('bg')};
	display: flex;
	font-size: ${fontSize('md')};
	font-weight: 800;
	height: 2rem;
	justify-content: center;
	width: 2rem;
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: ${space('md')};
`;

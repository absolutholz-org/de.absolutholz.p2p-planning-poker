import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, shadow, space } from '../../../theme/tokens';

export const Banner_Root = styled.div`
	container-type: inline-size;
	width: 100%;
`;

export const Banner_Container = styled.div`
	background-color: ${color('surface')};
	border: 1px solid ${color('border')};
	border-left: 4px solid var(--banner-accent-color);
	border-radius: ${borderRadius('lg')};
	box-shadow: ${shadow('sm')};
	color: ${color('text-primary')};
	display: flex;
	flex-direction: column;
	font-size: ${fontSize('md')};
	gap: ${space('md')};
	padding: ${space('sm-md')} ${space('md')};

	@container (min-width: 40em) {
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

export const Banner_Content = styled.div``;

export const Banner_Status = styled.div`
	align-items: center;
	color: var(--banner-accent-color);
	display: flex;
	gap: ${space('xs')};
	margin-bottom: ${space('sm')};
`;

export const Banner_StatusLabel = styled.span`
	font-size: ${fontSize('xs')};
	font-weight: var(--sys-font-weight-bold);
	text-transform: uppercase;
`;

export const Banner_Message = styled.div`
	max-width: 70ch;
`;

export const Banner_Actions = styled.div`
	align-self: flex-end;
	flex-shrink: 0;

	@container (min-width: 40em) {
		align-self: center;
	}
`;

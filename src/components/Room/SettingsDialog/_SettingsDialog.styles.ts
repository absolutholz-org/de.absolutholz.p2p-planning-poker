import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { fontSize, space } from '../../../theme/tokens';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${space('lg')};
	padding-top: ${space('sm')};
`;

export const SettingRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${space('xs')};
`;

export const Description = styled.p`
	color: ${color('text-secondary')};
	font-size: ${fontSize('xs')};
	margin: 0;
`;

import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-lg);
	padding-top: var(--sys-spacing-sm);
`;

export const SettingRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-xs);
`;

export const Description = styled.p`
	color: ${color('text-secondary')};
	font-size: var(--sys-font-size-xs);
	margin: 0;
`;

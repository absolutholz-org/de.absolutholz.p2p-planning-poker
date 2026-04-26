import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, space } from '../../../theme/tokens';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${space('xl')};
`;

export const QrCodeWrapper = styled.div`
	padding: ${space('md')};
	background: ${color('surface')};
	border-radius: ${borderRadius('lg')};
	border: 1px solid ${color('border')};
`;

export const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${space('md')};
	width: 100%;
`;

export const RoomCodeDisplay = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${space('md')};
	background: ${color('bg')};
	border-radius: ${borderRadius('md')};
	border: 1px dashed ${color('border')};
	font-family: inherit;
	font-size: ${fontSize('xl')};
	font-weight: 700;
	letter-spacing: 0.1em;
	color: ${color('text-primary')};
`;

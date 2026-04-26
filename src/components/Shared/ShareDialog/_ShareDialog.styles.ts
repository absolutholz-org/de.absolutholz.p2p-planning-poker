import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sys-spacing-xl);
`;

export const QrCodeWrapper = styled.div`
	padding: var(--sys-spacing-md);
	background: ${color('surface')};
	border-radius: var(--sys-radius-lg);
	border: 1px solid ${color('border')};
`;

export const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-md);
	width: 100%;
`;

export const RoomCodeDisplay = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-md);
	background: ${color('bg')};
	border-radius: var(--sys-radius-md);
	border: 1px dashed ${color('border')};
	font-family: inherit;
	font-size: var(--sys-font-size-xl);
	font-weight: 700;
	letter-spacing: 0.1em;
	color: ${color('text-primary')};
`;

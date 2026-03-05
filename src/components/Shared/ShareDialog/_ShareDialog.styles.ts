import styled from '@emotion/styled';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sys-spacing-xl);
`;

export const QrCodeWrapper = styled.div`
	padding: var(--sys-spacing-md);
	background: var(--sys-color-surface);
	border-radius: var(--sys-radius-lg);
	border: 1px solid var(--sys-color-border);
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
	background: var(--sys-color-bg);
	border-radius: var(--sys-radius-md);
	border: 1px dashed var(--sys-color-border);
	font-family: inherit;
	font-size: var(--sys-font-size-xl);
	font-weight: 700;
	letter-spacing: 0.1em;
	color: var(--sys-color-text-primary);
`;

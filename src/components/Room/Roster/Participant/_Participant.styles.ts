import styled from '@emotion/styled';

export const ParticipantSlot = styled.div<{
	'data-connected': boolean;
	'data-empty': boolean;
}>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-md) var(--sys-spacing-lg);
	background: ${(props) =>
		props['data-empty'] ? 'transparent' : 'var(--sys-color-surface)'};
	border: ${(props) =>
		props['data-empty']
			? '1px dashed var(--sys-color-border)'
			: '1px solid var(--sys-color-border)'};
	border-radius: var(--sys-radius-xl);
	opacity: ${(props) => (props['data-connected'] ? 1 : 0.5)};
	transition: all 0.2s ease;

	/* Scale the card layout down slightly when nested in roster */
	button {
		min-height: 32px;
		min-width: 32px;
		height: 32px;
		width: 32px;
		font-size: var(--sys-font-size-md);
		border-radius: 50%;
		pointer-events: none;
	}
`;

export const ParticipantInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

export const Name = styled.span`
	font-size: var(--sys-font-size-sm);
	font-weight: 600;
	color: var(--sys-color-text-primary);
`;

export const StatusText = styled.span`
	font-size: var(--sys-font-size-xs);
	color: var(--sys-color-text-secondary);
`;

export const ParticipantAction = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const EmptyStatusCircle = styled.div`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 2px dashed var(--sys-color-border);
	opacity: 0.5;
	animation: spin 4s linear infinite;

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const DisconnectedBadge = styled.span`
	font-size: var(--sys-font-size-xs);
	color: var(--sys-color-danger);
	font-weight: 500;
`;

import styled from '@emotion/styled';

export const TimerContainer = styled.div`
	display: flex;
	align-items: stretch;
	background: var(--sys-color-surface);
	border-radius: var(--sys-radius-pill);
	border: 1px solid var(--sys-color-border);
	overflow: hidden;
	height: 48px;
`;

export const Segment = styled.div<{
	$flex?: number;
	$variant?: 'action' | 'input';
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 12px;
	flex: ${(props) => props.$flex || 'none'};
	background: ${(props) =>
		props.$variant === 'action' ? 'var(--sys-color-bg)' : 'transparent'};

	&:not(:last-child) {
		border-right: 1px solid var(--sys-color-border);
	}
`;

export const TimeDisplay = styled.div`
	font-family: 'JetBrains Mono', monospace;
	font-size: 1.25rem;
	font-weight: 700;
	color: var(--sys-color-text-primary);
	display: flex;
	align-items: center;
	gap: 8px;
	white-space: nowrap;

	svg {
		opacity: 0.3;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
`;

export const Label = styled.label``;

export const TimerInput = styled.input`
	width: 40px;
	background: transparent;
	border: none;
	color: var(--sys-color-text-primary);
	font-family: 'JetBrains Mono', monospace;
	font-size: 1.25rem;
	font-weight: 700;
	text-align: center;
	padding: 0;

	&:focus {
		outline: none;
	}

	&:read-only {
		cursor: default;
		background-color: transparent;
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const ControlButton = styled.button<{ $color?: string }>`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 0 16px;
	height: 100%;
	font-weight: 700;
	font-size: 1.125rem;
	color: ${(props) => props.$color || 'var(--sys-color-text-primary)'};
	transition: background-color 0.2s;

	&:hover:not(:disabled) {
		background-color: var(--sys-color-border-subtle);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const IconButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 100%;
	color: var(--sys-color-text-primary);
	transition: background-color 0.2s;

	&:hover:not(:disabled) {
		background-color: var(--sys-color-border-subtle);
	}
`;

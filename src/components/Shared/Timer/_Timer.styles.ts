import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { VisuallyHidden } from '../VisuallyHidden';

export const TimerContainer = styled.div`
	display: flex;
	align-items: stretch;
	background: ${color('surface')};
	border-radius: var(--sys-radius-pill);
	border: 1px solid ${color('border')};
	overflow: hidden;
	height: var(--sys-spacing-xxl);
`;

export const Segment = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-inline: var(--sys-spacing-sm-md);
	flex: none;

	&:not(:last-child) {
		border-right: 1px solid ${color('border')};
	}
`;

export const ProgressSegment = styled(Segment)`
	background: linear-gradient(
		to right,
		${color('surface-subtle')} var(--timer-progress, 100%),
		transparent var(--timer-progress, 100%)
	);
	transition: background 0.3s ease;
`;

export const ActionSegment = styled(Segment)`
	background: ${color('bg')};
`;

export const TimeDisplay = styled.div`
	font-family: var(--sys-font-mono);
	font-size: var(--sys-font-size-xl);
	font-weight: var(--sys-font-weight-bold);
	color: ${color('text-primary')};
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-sm);
	white-space: nowrap;

	svg {
		opacity: 0.3;
	}
`;

export const Label = styled(VisuallyHidden)``;

export const TimerInput = styled.input`
	background: transparent;
	border: none;
	color: ${color('text-primary')};
	font-family: var(--sys-font-mono);
	font-size: var(--sys-font-size-xl);
	font-weight: var(--sys-font-weight-bold);
	padding: 0;
	text-align: right;
	width: 2ch;

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

export const ControlButton = styled.button`
	align-items: center;
	color: ${color('text-primary')};
	display: flex;
	font-size: var(--sys-font-size-lg);
	font-weight: var(--sys-font-weight-bold);
	gap: var(--sys-spacing-sm);
	height: 100%;
	padding-inline: var(--sys-spacing-md);
	transition: background-color 0.2s;

	&:hover:not(:disabled) {
		background-color: ${color('border')};
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const PauseButton = styled(ControlButton)`
	color: ${color('warning')};
`;

export const ResetButton = styled(ControlButton)`
	color: ${color('danger')};
`;

export const IconButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--sys-spacing-xxl);
	height: 100%;
	color: ${color('text-primary')};
	transition: background-color 0.2s;

	&:hover:not(:disabled) {
		background-color: ${color('border')};
	}
`;

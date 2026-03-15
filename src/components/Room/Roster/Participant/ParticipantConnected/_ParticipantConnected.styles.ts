import styled from '@emotion/styled';

import { Icon } from '../../../../Shared/Icon';
import { Participant_Base } from '../_Participant.styles';

export const Participant_Connected = styled(Participant_Base)`
	align-items: center;
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	// box-shadow: var(--sys-shadow-sm);
	display: grid;
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
	grid-template-columns: 1fr auto;
`;

export const Participant_HostBadge = styled(Icon)`
	margin-right: 0.5em;
	vertical-align: text-bottom;
`;

export const Participant_MeBadge = styled.span``;

export const Participant_Status_Text = styled.span`
	color: var(--sys-color-text-secondary);
	display: block;
	font-size: var(--sys-font-size-xs);
	font-weight: 400;
`;

export const Participant_Status_Text_Disconnected = styled(
	Participant_Status_Text,
)`
	color: var(--sys-color-danger);
`;

export const Participant_Status = styled.div`
	align-items: center;
	background-color: var(--sys-color-bg);
	border: 1px solid oklch(0.967 0.001 286.375);
	border-radius: var(--sys-radius-md);
	display: flex;
	font-size: var(--sys-font-size-sm);
	font-weight: 700;
	height: 1.875rem;
	justify-content: center;
	width: 1.875rem;
`;

export const Participant_Status_Thinking = styled.span`
	animation: spin 4s linear infinite;
	border: 2px dashed var(--sys-color-border);
	border-radius: var(--sys-radius-pill);
	height: 1rem;
	opacity: 0.5;
	width: 1rem;

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const Participant_Status_Voted = styled.span`
	align-items: center;
	border: 2px solid;
	border-radius: var(--sys-radius-pill);
	color: var(--sys-color-success);
	display: inline-flex;
	justify-content: center;
	height: 1.25rem;
	width: 1.25rem;
`;

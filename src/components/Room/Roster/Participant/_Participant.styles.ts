import styled from '@emotion/styled';

import { Icon } from '../../../Shared/Icon';

export const Participant = styled.div`
	align-items: center;
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-lg);
	display: grid;
	font-size: var(--sys-font-size-sm);
	font-weight: var(--sys-font-weight-medium);
	grid-template-columns: 1fr auto;
	padding: var(--sys-spacing-sm-md);
`;

export const Participant_HostBadge = styled(Icon)`
	color: var(--sys-color-warning);
	margin-right: 0.5em;
	vertical-align: text-bottom;
`;

export const Participant_MeBadge = styled.span``;

export const Participant_Status_Text = styled.span`
	color: var(--sys-color-text-secondary);
	display: block;
	font-size: var(--sys-font-size-xs);
	font-weight: var(--sys-font-weight-normal);
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
	font-weight: var(--sys-font-weight-bold);
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

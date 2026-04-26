import styled from '@emotion/styled';

import { color } from '../../../../theme/colors';
import { Icon } from '../../../Shared/Icon';

export const Participant = styled.div`
	align-items: center;
	background-color: ${color('surface')};
	border: 1px solid ${color('border')};
	border-radius: var(--sys-radius-lg);
	display: grid;
	font-size: var(--sys-font-size-sm);
	font-weight: var(--sys-font-weight-medium);
	grid-template-columns: 1fr auto;
	padding: var(--sys-spacing-sm-md);
`;

export const Participant_Identification = styled.div`
	display: flex;
`;

export const Participant_HostBadge = styled(Icon)`
	color: ${color('warning')};
	margin-right: 0.5em;
	vertical-align: text-bottom;
`;

export const Participant_MeBadge = styled.span`
	display: none;
`;

export const EditButton = styled.button`
	align-items: center;
	background: transparent;
	border: none;
	border-radius: var(--sys-radius-sm);
	color: ${color('text-secondary')};
	cursor: pointer;
	display: inline-flex;
	justify-content: center;
	line-height: 1;
	margin-left: 0.25em;
	opacity: 0.6;
	padding: var(--sys-spacing-xs);
	transition: all var(--sys-transition-base);
	vertical-align: middle;

	&:hover,
	&:focus-visible {
		background-color: ${color('surface-neutral')};
		color: ${color('primary')};
		opacity: 1 !important;
	}

	&:active {
		transform: scale(0.95);
	}

	&:focus-visible {
		outline: 2px solid ${color('primary')};
		outline-offset: 2px;
	}
`;

export const Participant_Status_Text = styled.span`
	color: ${color('text-secondary')};
	display: block;
	font-size: var(--sys-font-size-xs);
	font-weight: var(--sys-font-weight-normal);
	margin-top: var(--sys-spacing-xs);
`;

export const Participant_Status_Text_Disconnected = styled(
	Participant_Status_Text,
)`
	color: ${color('danger')};
`;

export const Participant_Status = styled.div`
	align-items: center;
	background-color: ${color('bg')};
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
	border: 2px dashed ${color('border')};
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
	color: ${color('success')};
	display: inline-flex;
	justify-content: center;
	height: 1.25rem;
	width: 1.25rem;
`;

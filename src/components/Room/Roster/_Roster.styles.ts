import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const RosterContainer = styled.section`
	// margin-inline: auto;
	// max-width: 800px;
`;

export const SectionTitle = styled.h2`
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: ${color('text-secondary')};
	margin-bottom: var(--sys-spacing-xl);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const VoteCountBadge = styled.div`
	background: ${color('surface')};
	border: 1px solid ${color('border')};
	border-radius: var(--sys-radius-pill);
	color: ${color('text-secondary')};
	font-size: var(--sys-font-size-xs);
	font-weight: 600;
	margin-block: calc(-1 * (var(--sys-spacing-xs) + 1px));
	padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
`;

export const ParticipantGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
	gap: var(--sys-spacing-md);
`;

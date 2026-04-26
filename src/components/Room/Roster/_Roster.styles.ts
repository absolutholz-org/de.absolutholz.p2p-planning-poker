import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, space } from '../../../theme/tokens';

export const RosterContainer = styled.section`
	// margin-inline: auto;
	// max-width: 800px;
`;

export const SectionTitle = styled.h2`
	font-size: ${fontSize('xs')};
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: ${color('text-secondary')};
	margin-bottom: ${space('xl')};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const VoteCountBadge = styled.div`
	background: ${color('surface')};
	border: 1px solid ${color('border')};
	border-radius: ${borderRadius('pill')};
	color: ${color('text-secondary')};
	font-size: ${fontSize('xs')};
	font-weight: 600;
	margin-block: calc(-1 * (${space('xs')} + 1px));
	padding: ${space('xs')} ${space('sm')};
`;

export const ParticipantGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
	gap: ${space('md')};
`;

import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { fontSize, space } from '../../../theme/tokens';

const LAYOUT_BREAKPOINT = '45rem';

export const DeckContainer = styled.section`
	@media (min-width: ${LAYOUT_BREAKPOINT}) {
		min-width: max-content;
	}
`;

export const SectionTitle = styled.h2`
	color: ${color('text-secondary')};
	font-size: ${fontSize('xs')};
	font-weight: 700;
	letter-spacing: 0.05em;
	margin-bottom: ${space('xl')};
	text-align: center;
	text-transform: uppercase;
`;

export const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${space('md')};
	justify-content: center;
	margin: 0 auto;
	max-width: 25rem; /* Constrain tightly to force the 4-4-1 wrapping cleanly */
`;

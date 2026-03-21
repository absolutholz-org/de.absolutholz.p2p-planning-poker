import styled from '@emotion/styled';

export const DeckContainer = styled.section`
	min-width: max-content;
`;

export const SectionTitle = styled.h2`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	letter-spacing: 0.05em;
	margin-bottom: var(--sys-spacing-xl);
	text-align: center;
	text-transform: uppercase;
`;

export const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: var(--sys-spacing-md);
	justify-content: center;
	margin: 0 auto;
	max-width: 25rem; /* Constrain tightly to force the 4-4-1 wrapping cleanly */
`;

import styled from '@emotion/styled';

export const DeckContainer = styled.section`
	padding: var(--sys-spacing-xl) 0;
	margin-top: var(--sys-spacing-xl);
`;

export const SectionTitle = styled.h2`
	font-size: 0.75rem;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-xl);
	text-align: center;
	font-weight: 700;
`;

export const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: var(--sys-spacing-md);
	max-width: 400px; /* Constrain tightly to force the 4-4-1 wrapping cleanly */
	margin: 0 auto;
`;

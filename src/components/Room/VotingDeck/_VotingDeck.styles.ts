import styled from '@emotion/styled';

export const DeckContainer = styled.section`
	padding: var(--sys-spacing-xl) 0;
	border-top: 1px solid var(--sys-color-border);
	margin-top: var(--sys-spacing-xl);
`;

export const SectionTitle = styled.h2`
	font-size: 1.125rem;
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-md);
	text-align: center;
	font-weight: 600;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
	gap: var(--sys-spacing-md);
	justify-items: center;
	max-width: 600px;
	margin: 0 auto;
`;

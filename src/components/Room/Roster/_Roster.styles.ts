import styled from '@emotion/styled';

export const RosterContainer = styled.section`
	max-width: 800px;
	margin: 0 auto;
	padding: var(--sys-spacing-xl) 0;
	border-top: 1px solid var(--sys-color-border);
`;

export const SectionTitle = styled.h2`
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-xl);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const VoteCountBadge = styled.div`
	background: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	padding: 4px 12px;
	border-radius: var(--sys-radius-pill);
	font-size: var(--sys-font-size-xs);
	font-weight: 600;
	color: var(--sys-color-text-secondary);
`;

export const ParticipantGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: var(--sys-spacing-md);
`;

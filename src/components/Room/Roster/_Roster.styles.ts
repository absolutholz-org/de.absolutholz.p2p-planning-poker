import styled from '@emotion/styled';

export const RosterContainer = styled.section`
	max-width: 800px;
	margin: 0 auto;
	padding: var(--sys-spacing-xl) var(--sys-spacing-md);
`;

export const SectionTitle = styled.h2`
	font-size: 1.125rem;
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-lg);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ParticipantGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	gap: var(--sys-spacing-lg);
`;

export const ParticipantSlot = styled.div<{ 'data-connected': boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sys-spacing-sm);
	opacity: ${(props) => (props['data-connected'] ? 1 : 0.5)};
	transition: opacity 0.2s ease;
`;

export const Name = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	color: var(--sys-color-text-primary);
	text-align: center;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const EmptyCardSlot = styled.div`
	min-height: 80px;
	min-width: 60px;
	border: 2px dashed var(--sys-color-border);
	border-radius: var(--sys-radius-lg);
	background-color: transparent;
`;

export const DisconnectedBadge = styled.span`
	font-size: 0.75rem;
	color: var(--sys-color-danger);
	background: rgba(239, 68, 68, 0.1);
	padding: 2px 6px;
	border-radius: var(--sys-radius-sm);
`;

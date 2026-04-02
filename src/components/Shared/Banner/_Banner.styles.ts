import styled from '@emotion/styled';

export const Banner_Root = styled.div`
	container-type: inline-size;
	width: 100%;
`;

export const Banner_Container = styled.div`
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-left: 4px solid var(--banner-accent-color);
	border-radius: var(--sys-radius-lg);
	box-shadow: var(--sys-shadow-sm);
	color: var(--sys-color-text-primary);
	display: flex;
	flex-direction: column;
	font-size: var(--sys-font-size-md);
	gap: var(--sys-spacing-md);
	padding: var(--sys-spacing-sm-md) var(--sys-spacing-md);

	@container (min-width: 40em) {
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

export const Banner_Content = styled.div``;

export const Banner_Status = styled.div`
	align-items: center;
	color: var(--banner-accent-color);
	display: flex;
	gap: var(--sys-spacing-xs);
	margin-bottom: var(--sys-spacing-sm);
`;

export const Banner_StatusLabel = styled.span`
	font-size: var(--sys-font-size-xs);
	font-weight: var(--sys-font-weight-bold);
	text-transform: uppercase;
`;

export const Banner_Message = styled.div`
	max-width: 70ch;
`;

export const Banner_Actions = styled.div`
	align-self: flex-end;
	flex-shrink: 0;

	@container (min-width: 40em) {
		align-self: center;
	}
`;

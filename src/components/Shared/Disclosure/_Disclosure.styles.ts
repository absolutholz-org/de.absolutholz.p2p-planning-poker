import styled from '@emotion/styled';

export const DisclosureContainer = styled.div`
	margin-top: var(--sys-spacing-md);
	width: 100%;

	details {
		background-color: var(--sys-color-surface-subtle);
		border-radius: var(--sys-radius-md);
		border: 1px solid var(--sys-color-border);
		padding: var(--sys-spacing-md);
		transition: all 0.2s ease-in-out;

		&[open] {
			background-color: var(--sys-color-surface);
			// box-shadow: var(--sys-shadow-sm);
		}
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 600;
		color: var(--sys-color-text-primary);
		font-size: var(--sys-font-size-sm);
		outline: 2px solid transparent;
		outline-offset: 2px;
		border-radius: var(--sys-radius-sm);
		user-select: none;
		transition: all 0.2s;

		&:hover {
			color: var(--sys-color-primary);
		}

		&:focus-visible {
			outline-color: var(--sys-color-info);
		}
	}
`;

export const DisclosureContent = styled.div`
	margin-top: var(--sys-spacing-md);
	padding-top: var(--sys-spacing-md);
	border-top: 1px solid var(--sys-color-border);
	text-align: left;

	h4 {
		color: var(--sys-color-text-primary);
		font-size: var(--sys-font-size-sm);
		font-weight: 600;
		margin: 0;
	}

	p {
		color: var(--sys-color-text-secondary);
		font-size: var(--sys-font-size-xs);
		line-height: 1.5;
		margin: 0;
	}
`;

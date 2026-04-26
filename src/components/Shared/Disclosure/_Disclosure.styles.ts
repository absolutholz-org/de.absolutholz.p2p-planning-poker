import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const DisclosureContainer = styled.div`
	margin-top: var(--sys-spacing-md);
	width: 100%;

	details {
		background-color: ${color('surface-subtle')};
		border-radius: var(--sys-radius-md);
		border: 1px solid ${color('border')};
		padding: var(--sys-spacing-md);
		transition: all 0.2s ease-in-out;

		&[open] {
			background-color: ${color('surface')};
			// box-shadow: var(--sys-shadow-sm);
		}
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 600;
		color: ${color('text-primary')};
		font-size: var(--sys-font-size-sm);
		outline: 2px solid transparent;
		outline-offset: 2px;
		border-radius: var(--sys-radius-sm);
		user-select: none;
		transition: all 0.2s;

		&:hover {
			color: ${color('primary')};
		}

		&:focus-visible {
			outline-color: ${color('info')};
		}
	}
`;

export const DisclosureContent = styled.div`
	margin-top: var(--sys-spacing-md);
	padding-top: var(--sys-spacing-md);
	border-top: 1px solid ${color('border')};
	text-align: left;

	h4 {
		color: ${color('text-primary')};
		font-size: var(--sys-font-size-sm);
		font-weight: 600;
		margin: 0;
	}

	p {
		color: ${color('text-secondary')};
		font-size: var(--sys-font-size-xs);
		line-height: 1.5;
		margin: 0;
	}
`;

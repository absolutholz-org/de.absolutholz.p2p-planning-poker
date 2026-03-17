import styled from '@emotion/styled';

import { VisuallyHidden } from '../VisuallyHidden';

export const SkipLink = styled(VisuallyHidden)`
	/* Visible on focus */
	&:focus {
		position: fixed;
		top: var(--sys-spacing-md);
		left: var(--sys-spacing-md);
		z-index: 1000;
		padding: var(--sys-spacing-md) var(--sys-spacing-lg);
		background-color: var(--sys-color-primary);
		color: var(--sys-color-primary-text);
		border-radius: var(--sys-radius-md);
		text-decoration: none;
		font-weight: 600;
		outline: 3px solid var(--sys-color-focus);
		outline-offset: 4px;
	}
`;

import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { VisuallyHidden } from '../VisuallyHidden';

export const SkipLink = styled(VisuallyHidden)`
	/* Visible on focus */
	&:focus {
		position: fixed;
		top: var(--sys-spacing-md);
		left: var(--sys-spacing-md);
		z-index: 1000;
		padding: var(--sys-spacing-md) var(--sys-spacing-lg);
		background-color: ${color('primary')};
		color: ${color('primary-text')};
		border-radius: var(--sys-radius-md);
		text-decoration: none;
		font-weight: 600;
		outline: 3px solid ${color('focus')};
		outline-offset: 4px;
	}
`;

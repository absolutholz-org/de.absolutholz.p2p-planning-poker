import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, space } from '../../../theme/tokens';
import { VisuallyHidden } from '../VisuallyHidden';

export const SkipLink = styled(VisuallyHidden)`
	/* Visible on focus */
	&:focus {
		position: fixed;
		top: ${space('md')};
		left: ${space('md')};
		z-index: 1000;
		padding: ${space('md')} ${space('lg')};
		background-color: ${color('primary')};
		color: ${color('primary-text')};
		border-radius: ${borderRadius('md')};
		text-decoration: none;
		font-weight: 600;
		outline: 3px solid ${color('focus')};
		outline-offset: 4px;
	}
`;

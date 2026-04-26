import styled from '@emotion/styled';

import { space } from '../../../theme/tokens';
import { Button } from '../Button/_Button.styles';

export const IconButton = styled(Button)`
	/* Ensure square aspect ratio by matching horizontal padding to vertical */
	padding-inline: ${space('sm')};

	/* Reset min-width to allow perfect square if icon is small, 
	   but keep min-height for touch target */
	min-width: 3rem;

	/* Ensure icon is perfectly centered */
	& > svg {
		margin: 0;
	}
`;

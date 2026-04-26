import styled from '@emotion/styled';

import { space } from '../../../theme/tokens';

export const LayoutRoot = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
`;

export const MainContent = styled.main`
	flex: 1;
	padding-block: ${space('xl')};

	/* Focus indicator for skip-link targets */
	&:focus {
		outline: none;
	}
`;

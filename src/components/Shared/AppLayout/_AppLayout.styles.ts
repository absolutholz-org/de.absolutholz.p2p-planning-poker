import styled from '@emotion/styled';

export const LayoutRoot = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
`;

export const MainContent = styled.main`
	flex: 1;
	width: 100%;
	/* Focus indicator for skip-link targets */
	&:focus {
		outline: none;
	}
`;

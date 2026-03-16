import styled from '@emotion/styled';

export const IconContainer = styled.span`
	align-items: center;
	display: inline-flex;
	flex-shrink: 0;
	font-size: var(--icon-size);
	justify-content: center;
	line-height: 1;
	transition: all 0.2s ease;
	user-select: none;

	svg {
		fill: currentColor;
		height: 1em;
		width: 1em;
	}
`;

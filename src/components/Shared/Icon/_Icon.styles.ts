import styled from '@emotion/styled';

export const IconContainer = styled.span<{
	$size: number | string;
}>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: ${({ $size }) =>
		typeof $size === 'number' ? `${$size}px` : $size || '24px'};
	height: ${({ $size }) =>
		typeof $size === 'number' ? `${$size}px` : $size || '24px'};
	line-height: 1;
	user-select: none;
	flex-shrink: 0;
	transition: all 0.2s ease;

	svg {
		width: 100%;
		height: 100%;
		fill: currentColor;
	}
`;


import styled from '@emotion/styled';

export const IconContainer = styled.span<{
	$size: number | string;
	$fill: boolean;
	$weight: number;
	$grade: number;
	$opticalSize: number;
}>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: ${({ $size }) =>
		typeof $size === 'number' ? `${$size}px` : $size || '24px'};
	height: ${({ $size }) =>
		typeof $size === 'number' ? `${$size}px` : $size || '24px'};
	font-size: ${({ $size }) =>
		typeof $size === 'number' ? `${$size}px` : $size || '24px'};
	line-height: 1;
	user-select: none;
	flex-shrink: 0;
	transition: all 0.2s ease;

	&.material-symbols-rounded {
		font-variation-settings:
			'FILL' ${({ $fill }) => ($fill ? 1 : 0)},
			'wght' ${({ $weight }) => $weight},
			'GRAD' ${({ $grade }) => $grade},
			'opsz' ${({ $opticalSize }) => $opticalSize};
	}
`;

import styled from '@emotion/styled';

import type { StackSpacing } from './_Stack.types';

const getGap = (spacing?: StackSpacing) => {
	if (spacing === 'none') return '0';
	return `var(--sys-spacing-${spacing || 'md'})`;
};

const getAlign = (align?: string) => {
	switch (align) {
		case 'start':
			return 'flex-start';
		case 'end':
			return 'flex-end';
		case 'between':
			return 'space-between';
		case 'around':
			return 'space-around';
		case 'evenly':
			return 'space-evenly';
		default:
			return align || 'stretch';
	}
};

export const StyledStack = styled.div<{
	$direction: string;
	$spacing: StackSpacing;
	$align: string;
	$justify: string;
	$wrap: boolean;
}>`
	display: flex;
	flex-direction: ${(props) => props.$direction};
	gap: ${(props) => getGap(props.$spacing)};
	align-items: ${(props) => getAlign(props.$align)};
	justify-content: ${(props) => getAlign(props.$justify)};
	flex-wrap: ${(props) => (props.$wrap ? 'wrap' : 'nowrap')};
	width: 100%;
`;

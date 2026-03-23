import * as S from './_Stack.styles';
import type { IStack } from './_Stack.types';

export function Stack({
	align = 'stretch',
	children,
	component = 'div',
	direction = 'column',
	justify = 'start',
	spacing = 'md',
	wrap = false,
	...props
}: IStack) {
	return (
		<S.StyledStack
			as={component}
			$direction={direction}
			$spacing={spacing}
			$align={align}
			$justify={justify}
			$wrap={wrap}
			{...props}
		>
			{children}
		</S.StyledStack>
	);
}

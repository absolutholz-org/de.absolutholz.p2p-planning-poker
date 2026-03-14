import * as S from './_Stack.styles';
import type { IStack } from './_Stack.types';

export function Stack({
	align = 'stretch',
	children,
	className,
	component = 'div',
	direction = 'column',
	justify = 'start',
	spacing = 'md',
	wrap = false,
}: IStack) {
	return (
		<S.StyledStack
			as={component}
			className={className}
			$direction={direction}
			$spacing={spacing}
			$align={align}
			$justify={justify}
			$wrap={wrap}
		>
			{children}
		</S.StyledStack>
	);
}

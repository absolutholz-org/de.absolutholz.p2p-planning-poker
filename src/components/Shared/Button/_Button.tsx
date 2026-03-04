import * as S from './_Button.styles';
import type { ButtonProps } from './_Button.types';

export function Button({
	children,
	variant = 'primary',
	...props
}: ButtonProps) {
	return (
		<S.Button data-variant={variant} {...props}>
			{children}
		</S.Button>
	);
}

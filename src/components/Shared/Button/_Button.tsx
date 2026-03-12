import * as S from './_Button.styles';
import type { ButtonProps } from './_Button.types';

export function Button({
	children,
	icon,
	variant = 'primary',
	...props
}: ButtonProps) {
	return (
		<S.Button data-variant={variant} {...props}>
			{icon && <span className="button-icon">{icon}</span>}
			{children}
		</S.Button>
	);
}

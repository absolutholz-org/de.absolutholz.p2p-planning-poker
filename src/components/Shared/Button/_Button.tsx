import { Icon } from '../Icon';
import * as S from './_Button.styles';
import type { IButton } from './_Button.types';

export function Button({
	children,
	icon,
	size = 'md',
	variant = 'secondary',
	...props
}: IButton) {
	return (
		<S.Button data-size={size} data-variant={variant} {...props}>
			{icon && (
				<S.Button_Icon>
					<Icon name={icon} size={20} />
				</S.Button_Icon>
			)}
			{children}
		</S.Button>
	);
}

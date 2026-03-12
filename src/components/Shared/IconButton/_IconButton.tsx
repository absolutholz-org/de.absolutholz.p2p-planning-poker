import { Button_Icon } from '../Button/_Button.styles';
import * as S from './_IconButton.styles';
import type { IIconButton } from './_IconButton.types';

export function IconButton({
	icon,
	variant = 'primary',
	...props
}: IIconButton) {
	return (
		<S.IconButton data-variant={variant} {...props}>
			<Button_Icon>{icon}</Button_Icon>
		</S.IconButton>
	);
}

import { Icon } from '../Icon';
import * as S from './_IconButton.styles';
import type { IIconButton } from './_IconButton.types';

export function IconButton({
	icon,
	size = 'md',
	variant = 'primary',
	...props
}: IIconButton) {
	return (
		<S.IconButton data-size={size} data-variant={variant} {...props}>
			<Icon name={icon} size="md" />
		</S.IconButton>
	);
}

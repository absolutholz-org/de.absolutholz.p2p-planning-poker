import * as S from './_Icon.styles';
import { type IIcon } from './_Icon.types';

export function Icon({
	fill = false,
	grade = 0,
	label,
	name,
	opticalSize = 24,
	size = 24,
	weight = 400,
	...props
}: IIcon) {
	// Simple heuristic to detect emojis or non-ligature text
	const isSymbol = /^[a-z0-9_]+$/.test(name);

	return (
		<S.IconContainer
			className={isSymbol ? 'material-symbols-rounded' : undefined}
			$size={size}
			$fill={fill}
			$weight={weight}
			$grade={grade}
			$opticalSize={opticalSize}
			role={label ? 'img' : 'presentation'}
			aria-label={label || (isSymbol ? undefined : name)}
			aria-hidden={!label && isSymbol}
			{...props}
		>
			{name}
		</S.IconContainer>
	);
}

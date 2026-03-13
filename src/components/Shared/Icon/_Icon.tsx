import * as S from './_Icon.styles';
import { type IIcon } from './_Icon.types';
import { ICON_PATHS } from './IconLibrary';

export function Icon({ label, name, size = 24, ...props }: IIcon) {
	const svgPath = ICON_PATHS[name];
	const isSymbol = !!svgPath;

	return (
		<S.IconContainer
			$size={size}
			role={label ? 'img' : 'presentation'}
			aria-label={label || (isSymbol ? undefined : name)}
			aria-hidden={!label && isSymbol}
			{...props}
		>
			{svgPath ? (
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d={svgPath} />
				</svg>
			) : (
				name
			)}
		</S.IconContainer>
	);
}

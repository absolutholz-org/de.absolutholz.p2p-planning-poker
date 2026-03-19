import * as S from './_Icon.styles';
import { type IIcon } from './_Icon.types';
import { ICON_PATHS } from './IconLibrary';

export function Icon({ label, name, size = 'inherit', ...props }: IIcon) {
	const svgData = ICON_PATHS[name];
	const isSymbol = !!svgData;

	return (
		<S.IconContainer
			role={label ? 'img' : 'presentation'}
			aria-label={label || (isSymbol ? undefined : name)}
			aria-hidden={!label && isSymbol}
			style={
				{
					'--icon-size':
						size === 'inherit'
							? 'inherit'
							: `var(--sys-icon-size-${size})`,
				} as React.CSSProperties
			}
			{...props}
		>
			{svgData ? (
				<svg
					viewBox={
						typeof svgData === 'string'
							? '0 0 24 24'
							: svgData.viewBox || '0 0 24 24'
					}
					aria-hidden="true"
					focusable="false"
				>
					<path
						d={typeof svgData === 'string' ? svgData : svgData.path}
					/>
				</svg>
			) : (
				name
			)}
		</S.IconContainer>
	);
}

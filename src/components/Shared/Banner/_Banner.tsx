import { color } from '../../../theme/colors';
import { Icon } from '../Icon';
import * as S from './_Banner.styles';
import { type BannerVariant, type IBanner } from './_Banner.types';

export function Banner({
	action,
	message,
	statusLabel,
	variant = 'info',
}: IBanner) {
	const iconMap: Record<BannerVariant, string> = {
		danger: 'report',
		info: 'info',
		success: 'check_circle',
		warning: 'warning',
	};
	const iconName = iconMap[variant];

	return (
		<S.Banner_Root>
			<S.Banner_Container
				style={
					{
						'--banner-accent-color': color(variant),
					} as React.CSSProperties
				}
				role="status"
				aria-live="polite"
				aria-atomic="true"
			>
				<S.Banner_Content>
					<S.Banner_Status>
						<Icon name={iconName} size="md" />
						<S.Banner_StatusLabel>
							{statusLabel}
						</S.Banner_StatusLabel>
					</S.Banner_Status>
					<S.Banner_Message>{message}</S.Banner_Message>
				</S.Banner_Content>
				{action && <S.Banner_Actions>{action}</S.Banner_Actions>}
			</S.Banner_Container>
		</S.Banner_Root>
	);
}

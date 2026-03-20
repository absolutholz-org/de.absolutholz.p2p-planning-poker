import { Icon } from '../../Shared/Icon';
import * as S from './Banner.styles';
import { type BannerVariant, type IBanner } from './Banner.types';

export function Banner({ action, message, variant = 'info' }: IBanner) {
	const iconMap: Record<BannerVariant, string> = {
		danger: 'report',
		info: 'info',
		success: 'check_circle',
		warning: 'warning',
	};
	const iconName = iconMap[variant];

	return (
		<S.BannerContainer
			variant={variant}
			role="status"
			aria-live="polite"
			aria-atomic="true"
		>
			<S.IconContainer variant={variant}>
				<Icon name={iconName} size="lg" aria-hidden="true" />
			</S.IconContainer>
			<S.Message>{message}</S.Message>
			{action && <S.ActionContainer>{action}</S.ActionContainer>}
		</S.BannerContainer>
	);
}

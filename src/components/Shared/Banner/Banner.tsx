import { Icon } from '../../Shared/Icon';
import * as S from './Banner.styles';
import { type IBanner } from './Banner.types';

export function Banner({ action, message, variant = 'info' }: IBanner) {
	const iconName = variant === 'success' ? 'check_circle' : 'info';

	return (
		<S.BannerContainer variant={variant}>
			<S.IconContainer variant={variant}>
				<Icon name={iconName} size="lg" />
			</S.IconContainer>
			<S.Message>{message}</S.Message>
			{action && <S.ActionContainer>{action}</S.ActionContainer>}
		</S.BannerContainer>
	);
}

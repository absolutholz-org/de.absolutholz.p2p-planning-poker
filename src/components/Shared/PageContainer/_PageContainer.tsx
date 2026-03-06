import * as S from './_PageContainer.styles';
import type { PageContainerProps } from './_PageContainer.types';

export function PageContainer({ children, className }: PageContainerProps) {
	return <S.Container className={className}>{children}</S.Container>;
}

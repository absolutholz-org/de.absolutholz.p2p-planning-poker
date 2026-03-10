import * as S from './_VisuallyHidden.styles';
import { type IVisuallyHidden } from './_VisuallyHidden.types';

export function VisuallyHidden({
	as: Component = 'span',
	children,
}: IVisuallyHidden) {
	return <S.VisuallyHidden as={Component}>{children}</S.VisuallyHidden>;
}

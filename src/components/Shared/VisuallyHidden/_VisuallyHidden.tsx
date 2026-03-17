import { type ElementType } from 'react';

import * as S from './_VisuallyHidden.styles';
import { type IVisuallyHidden } from './_VisuallyHidden.types';

export function VisuallyHidden<T extends ElementType = 'span'>({
	as,
	children,
	focusable,
	...props
}: IVisuallyHidden<T>) {
	const Component = as || 'span';
	return (
		<S.VisuallyHidden as={Component} focusable={focusable} {...props}>
			{children}
		</S.VisuallyHidden>
	);
}

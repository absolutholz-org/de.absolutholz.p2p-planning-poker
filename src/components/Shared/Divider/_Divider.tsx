import { StyledDivider } from './_Divider.styles';
import type { DividerProps } from './_Divider.types';

export const Divider = ({ children, hideOnDesktop = false }: DividerProps) => {
	return (
		<StyledDivider hideOnDesktop={hideOnDesktop}>{children}</StyledDivider>
	);
};

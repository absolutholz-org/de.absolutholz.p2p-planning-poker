import { StyledDivider } from './_Divider.styles';
import type { IDivider } from './_Divider.types';

export function Divider({ children, hideOnDesktop = false }: IDivider) {
	return (
		<StyledDivider hideOnDesktop={hideOnDesktop}>{children}</StyledDivider>
	);
}

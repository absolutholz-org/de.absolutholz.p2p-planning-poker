import { Icon } from '../Icon';
import { Stack } from '../Stack';
import * as S from './_Disclosure.styles';
import type { IDisclosure } from './_Disclosure.types';

export function Disclosure({ children, icon, title }: IDisclosure) {
	return (
		<S.DisclosureContainer>
			<details>
				<summary>
					<Stack
						direction="row"
						align="center"
						justify="center"
						spacing="xs"
					>
						{icon && <Icon name={icon} size="sm" />}
						<span>{title}</span>
					</Stack>
				</summary>
				<S.DisclosureContent>{children}</S.DisclosureContent>
			</details>
		</S.DisclosureContainer>
	);
}

import { useId, useState } from 'react';

import { Icon } from '../Icon';
import { Stack } from '../Stack';
import * as S from './_Disclosure.styles';
import type { IDisclosure } from './_Disclosure.types';

export function Disclosure({ children, icon, title }: IDisclosure) {
	const [isOpen, setIsOpen] = useState(false);
	const contentId = useId();

	return (
		<S.DisclosureContainer>
			<details onToggle={(e) => setIsOpen(e.currentTarget.open)}>
				<summary aria-expanded={isOpen} aria-controls={contentId}>
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
				<S.DisclosureContent id={contentId}>
					{children}
				</S.DisclosureContent>
			</details>
		</S.DisclosureContainer>
	);
}

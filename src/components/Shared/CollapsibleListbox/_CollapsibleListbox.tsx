import { useRef, useState } from 'react';

import { useMenuNavigation } from '../../../hooks/useMenuNavigation';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Popover } from '../Popover';
import * as S from './_CollapsibleListbox.styles';
import type { ICollapsibleListbox } from './_CollapsibleListbox.types';

export function CollapsibleListbox<T extends string>({
	activeId,
	'aria-label': ariaLabel,
	className,
	onSelect,
	options,
	showLabel = true,
	variant = 'secondary',
}: ICollapsibleListbox<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	useMenuNavigation(menuRef);

	const activeOption =
		options.find((opt) => opt.id === activeId) || options[0];

	return (
		<Popover align="end" onOpenChange={setIsOpen}>
			{showLabel ? (
				<Button
					variant={variant}
					className={className}
					aria-label={ariaLabel}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					icon={activeOption.icon}
				>
					{activeOption.label}
				</Button>
			) : (
				<IconButton
					variant={variant}
					className={className}
					aria-label={ariaLabel}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					icon={activeOption.icon || 'language'}
				/>
			)}
			<S.MenuContainer
				ref={menuRef}
				role="listbox"
				aria-label={ariaLabel}
			>
				{options.map((option) => {
					const isActive = option.id === activeId;
					return (
						<S.MenuItem
							key={option.id}
							role="option"
							aria-selected={isActive}
							tabIndex={-1}
							title={option.title}
							data-active={isActive}
							onClick={() => onSelect(option.id)}
						>
							<span className="option-content">
								{option.icon && (
									<span
										className="option-icon"
										aria-hidden="true"
									>
										<Icon name={option.icon} size={20} />
									</span>
								)}
								{option.label}
							</span>
							{isActive && (
								<span className="check" aria-hidden="true">
									✓
								</span>
							)}
						</S.MenuItem>
					);
				})}
			</S.MenuContainer>
		</Popover>
	);
}

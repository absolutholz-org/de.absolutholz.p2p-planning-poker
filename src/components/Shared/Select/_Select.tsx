import { useRef } from 'react';

import { useMenuNavigation } from '../../../hooks/useMenuNavigation';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Popover } from '../Popover';
import * as S from './_Select.styles';
import type { SelectProps } from './_Select.types';

export function Select<T extends string>({
	activeId,
	'aria-label': ariaLabel,
	className,
	onSelect,
	options,
	showLabel = true,
	variant = 'secondary',
}: SelectProps<T>) {
	const menuRef = useRef<HTMLDivElement>(null);
	useMenuNavigation(menuRef);

	const activeOption =
		options.find((opt) => opt.id === activeId) || options[0];

	return (
		<Popover align="end">
			{showLabel ? (
				<Button
					variant={variant}
					className={className}
					aria-label={ariaLabel}
					aria-haspopup="listbox"
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
					icon={activeOption.icon}
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
										{option.icon}
									</span>
								)}
								{option.label}
							</span>
							{isActive && <span className="check">✓</span>}
						</S.MenuItem>
					);
				})}
			</S.MenuContainer>
		</Popover>
	);
}

import { useEffect, useRef, useState } from 'react';

import { useMenuNavigation } from '../../../hooks/useMenuNavigation';
import { Popover } from '../Popover';
import * as S from './_SchemeSwitcher.styles';

type Scheme = 'light' | 'dark' | 'system';

const SCHEMES: { id: Scheme; label: string; icon: string }[] = [
	{ icon: '☀️', id: 'light', label: 'Light' },
	{ icon: '🌙', id: 'dark', label: 'Dark' },
	{ icon: '🖥️', id: 'system', label: 'System' },
];

export function SchemeSwitcher() {
	const menuRef = useRef<HTMLDivElement>(null);
	useMenuNavigation(menuRef);

	const [scheme, setScheme] = useState<Scheme>(() => {
		return (
			(localStorage.getItem('scheme-preference') as Scheme) || 'system'
		);
	});

	useEffect(() => {
		const root = document.documentElement;
		if (scheme === 'system') {
			root.removeAttribute('data-color-scheme');
			localStorage.removeItem('scheme-preference');
		} else {
			root.setAttribute('data-color-scheme', scheme);
			localStorage.setItem('scheme-preference', scheme);
		}
	}, [scheme]);

	return (
		<Popover
			align="end"
			renderTrigger={({
				popoverTarget,
				ref,
			}: {
				popoverTarget: string;
				ref: React.RefObject<HTMLButtonElement | null>;
			}) => (
				<S.TriggerButton
					ref={ref}
					popoverTarget={popoverTarget}
					aria-label="Toggle scheme"
				>
					<span aria-hidden="true">🖥️</span>
				</S.TriggerButton>
			)}
		>
			<S.MenuContainer ref={menuRef} role="menu">
				{SCHEMES.map(({ icon, id, label }) => (
					<S.MenuItem
						key={id}
						role="menuitem"
						tabIndex={-1}
						data-active={scheme === id}
						onClick={() => setScheme(id)}
					>
						<span>
							<span
								aria-hidden="true"
								style={{
									display: 'inline-block',
									width: '24px',
								}}
							>
								{icon}
							</span>{' '}
							{label}
						</span>
						{scheme === id && <span className="check">✓</span>}
					</S.MenuItem>
				))}
			</S.MenuContainer>
		</Popover>
	);
}

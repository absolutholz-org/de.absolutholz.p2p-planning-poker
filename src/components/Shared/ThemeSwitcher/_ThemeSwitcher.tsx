import { useEffect, useState } from 'react';

import { Popover } from '../Popover';
import * as S from './_ThemeSwitcher.styles';

type Theme = 'light' | 'dark' | 'system';

const THEMES: { id: Theme; label: string; icon: string }[] = [
	{ icon: '☀️', id: 'light', label: 'Light' },
	{ icon: '🌙', id: 'dark', label: 'Dark' },
	{ icon: '🖥️', id: 'system', label: 'System' },
];

export function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>(() => {
		return (localStorage.getItem('theme-preference') as Theme) || 'system';
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'system') {
			root.removeAttribute('data-theme');
			localStorage.removeItem('theme-preference');
		} else {
			root.setAttribute('data-theme', theme);
			localStorage.setItem('theme-preference', theme);
		}
	}, [theme]);

	return (
		<Popover
			align="end"
			renderTrigger={({
				popoverTarget,
				ref,
			}: {
				popoverTarget: string;
				ref: React.RefObject<HTMLButtonElement>;
			}) => (
				<S.TriggerButton
					ref={ref}
					popoverTarget={popoverTarget}
					aria-label="Toggle theme"
				>
					<span aria-hidden="true">🖥️</span>
				</S.TriggerButton>
			)}
		>
			<S.MenuContainer>
				{THEMES.map(({ icon, id, label }) => (
					<S.MenuItem
						key={id}
						data-active={theme === id}
						onClick={() => setTheme(id)}
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
						{theme === id && <span className="check">✓</span>}
					</S.MenuItem>
				))}
			</S.MenuContainer>
		</Popover>
	);
}

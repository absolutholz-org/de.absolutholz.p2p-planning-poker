import { useEffect, useState } from 'react';

import { Select, type SelectOption } from '../Select';

type Scheme = 'light' | 'dark' | 'system';

const SCHEMES: SelectOption<Scheme>[] = [
	{ icon: '☀️', id: 'light', label: 'Light' },
	{ icon: '🌙', id: 'dark', label: 'Dark' },
	{ icon: '🖥️', id: 'system', label: 'System' },
] as const;

export function SchemeSwitcher() {
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
		<Select
			activeId={scheme}
			options={SCHEMES}
			onSelect={setScheme}
			showLabel={false}
			aria-label="Toggle scheme"
		/>
	);
}

import { useEffect, useState } from 'react';

import { type ISelectOption, Select } from '../Select';

type Scheme = 'light' | 'dark' | 'system';

const SCHEMES: ISelectOption<Scheme>[] = [
	{ icon: '☀️', id: 'light', label: 'Light', title: 'Light' },
	{ icon: '🌙', id: 'dark', label: 'Dark', title: 'Dark' },
	{ icon: '💻', id: 'system', label: 'System', title: 'System' },
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

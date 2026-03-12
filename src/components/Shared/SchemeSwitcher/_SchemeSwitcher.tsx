import { useEffect, useState } from 'react';

import { STORAGE_KEYS } from '../../../constants/storage';
import {
	CollapsibleListbox,
	type ICollapsibleListboxOption,
} from '../CollapsibleListbox';

type Scheme = 'light' | 'dark' | 'system';

const SCHEMES: ICollapsibleListboxOption<Scheme>[] = [
	{ icon: '☀️', id: 'light', label: 'Light', title: 'Light' },
	{ icon: '🌙', id: 'dark', label: 'Dark', title: 'Dark' },
	{ icon: '💻', id: 'system', label: 'System', title: 'System' },
] as const;

export function SchemeSwitcher() {
	const [scheme, setScheme] = useState<Scheme>(() => {
		return (
			(localStorage.getItem(STORAGE_KEYS.SCHEME) as Scheme) || 'system'
		);
	});

	useEffect(() => {
		const root = document.documentElement;
		if (scheme === 'system') {
			root.removeAttribute('data-color-scheme');
			localStorage.removeItem(STORAGE_KEYS.SCHEME);
		} else {
			root.setAttribute('data-color-scheme', scheme);
			localStorage.setItem(STORAGE_KEYS.SCHEME, scheme);
		}
	}, [scheme]);

	return (
		<CollapsibleListbox
			activeId={scheme}
			options={SCHEMES}
			onSelect={setScheme}
			showLabel={false}
			aria-label="Toggle scheme"
		/>
	);
}

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { STORAGE_KEYS } from '../../../constants/storage';
import {
	CollapsibleListbox,
	type ICollapsibleListboxOption,
} from '../CollapsibleListbox';

type Scheme = 'light' | 'dark' | 'system';

export function SchemeSwitcher() {
	const { t } = useTranslation();
	const [scheme, setScheme] = useState<Scheme>(() => {
		return (
			(localStorage.getItem(STORAGE_KEYS.SCHEME) as Scheme) || 'system'
		);
	});

	const SCHEMES: ICollapsibleListboxOption<Scheme>[] = [
		{
			icon: 'light_mode',
			id: 'light',
			label: t('common.switchers.scheme.options.light'),
			title: t('common.switchers.scheme.options.light'),
		},
		{
			icon: 'dark_mode',
			id: 'dark',
			label: t('common.switchers.scheme.options.dark'),
			title: t('common.switchers.scheme.options.dark'),
		},
		{
			icon: 'contrast',
			id: 'system',
			label: t('common.switchers.scheme.options.system'),
			title: t('common.switchers.scheme.options.system'),
		},
	];

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
			aria-label={t('common.switchers.scheme.ariaLabel')}
		/>
	);
}

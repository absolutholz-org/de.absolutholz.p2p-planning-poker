import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { STORAGE_KEYS } from '../../../constants/storage';
import { type ISelectOption, Select } from '../Select';
import type { ILanguageSwitcher } from './_LanguageSwitcher.types';

type LanguageCode = 'en' | 'de' | 'pt' | 'fr';

const SUPPORTED_LANGUAGES: ISelectOption<LanguageCode>[] = [
	{ icon: '🇺🇸', id: 'en', label: 'English', title: 'English' },
	{ icon: '🇩🇪', id: 'de', label: 'Deutsch', title: 'Deutsch' },
	{ icon: '🇧🇷', id: 'pt', label: 'Português', title: 'Português' },
	{ icon: '🇫🇷', id: 'fr', label: 'Français', title: 'Français' },
];

export function LanguageSwitcher({ className }: ILanguageSwitcher) {
	const { i18n } = useTranslation();

	const handleLanguageChange = (lang: LanguageCode) => {
		i18n.changeLanguage(lang);
		localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
	};

	useEffect(() => {
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<Select
			className={className}
			activeId={i18n.language as LanguageCode}
			options={SUPPORTED_LANGUAGES}
			onSelect={handleLanguageChange}
			aria-label="Toggle language"
		/>
	);
}

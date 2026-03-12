import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Select, type SelectOption } from '../Select';
import type { LanguageSwitcherProps } from './_LanguageSwitcher.types';

type LanguageCode = 'en' | 'de' | 'pt' | 'fr';

const SUPPORTED_LANGUAGES: SelectOption<LanguageCode>[] = [
	{ icon: '🇺🇸', id: 'en', label: 'EN', title: 'English' },
	{ icon: '🇩🇪', id: 'de', label: 'DE', title: 'Deutsch' },
	{ icon: '🇧🇷', id: 'pt', label: 'PT', title: 'Português' },
	{ icon: '🇫🇷', id: 'fr', label: 'FR', title: 'Français' },
] as const;

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
	const { i18n } = useTranslation();

	useEffect(() => {
		// Enforce a11y & L10n structural requirements when language changes
		if (i18n.language) {
			document.documentElement.lang = i18n.language;
		}
	}, [i18n.language]);

	const handleLanguageChange = (code: LanguageCode) => {
		i18n.changeLanguage(code);
		localStorage.setItem('language-preference', code);
	};

	const activeId =
		(SUPPORTED_LANGUAGES.find((l) => i18n.language?.startsWith(l.id))
			?.id as LanguageCode) || 'en';

	return (
		<Select
			className={className}
			activeId={activeId}
			options={SUPPORTED_LANGUAGES}
			onSelect={handleLanguageChange}
			aria-label="Select language"
		/>
	);
}

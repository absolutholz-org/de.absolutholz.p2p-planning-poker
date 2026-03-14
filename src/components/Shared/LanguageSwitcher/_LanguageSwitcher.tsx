import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	SUPPORTED_LANGUAGES,
	type SupportedLanguageCode,
} from '../../../constants/languages';
import { STORAGE_KEYS } from '../../../constants/storage';
import {
	CollapsibleListbox,
	type ICollapsibleListboxOption,
} from '../CollapsibleListbox';

const OPTIONS: ICollapsibleListboxOption<SupportedLanguageCode>[] =
	SUPPORTED_LANGUAGES.map((lang) => ({
		icon: lang.flag,
		id: lang.code,
		label: lang.label,
		title: lang.label,
	}));

export function LanguageSwitcher() {
	const { i18n, t } = useTranslation();

	const handleLanguageChange = (lang: SupportedLanguageCode) => {
		i18n.changeLanguage(lang);
		localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
	};

	useEffect(() => {
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<CollapsibleListbox
			activeId={i18n.language as SupportedLanguageCode}
			options={OPTIONS}
			onSelect={handleLanguageChange}
			showLabel={false}
			aria-label={t('common.switchers.language.ariaLabel')}
		/>
	);
}

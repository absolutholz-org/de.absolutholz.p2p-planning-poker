import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './_LanguageSwitcher.styles';
import type { LanguageSwitcherProps } from './_LanguageSwitcher.types';

const SUPPORTED_LANGUAGES = [
	{ code: 'en', label: 'EN', title: 'English' },
	{ code: 'de', label: 'DE', title: 'Deutsch' },
	{ code: 'pt', label: 'PT', title: 'Português' },
	{ code: 'fr', label: 'FR', title: 'Français' },
];

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
	const { i18n } = useTranslation();

	useEffect(() => {
		// Enforce a11y & L10n structural requirements when language changes
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	const handleLanguageChange = (code: string) => {
		i18n.changeLanguage(code);
	};

	return (
		<S.SwitcherContainer className={className} aria-label="Select language">
			{SUPPORTED_LANGUAGES.map(({ code, label, title }) => (
				<S.LanguageButton
					key={code}
					title={title}
					aria-label={`Change language to ${title}`}
					data-active={i18n.language.startsWith(code)}
					onClick={() => handleLanguageChange(code)}
				>
					{label}
				</S.LanguageButton>
			))}
		</S.SwitcherContainer>
	);
}

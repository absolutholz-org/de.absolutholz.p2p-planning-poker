import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useMenuNavigation } from '../../../hooks/useMenuNavigation';
import { Popover } from '../Popover';
import * as S from './_LanguageSwitcher.styles';
import type { LanguageSwitcherProps } from './_LanguageSwitcher.types';

const SUPPORTED_LANGUAGES = [
	{ code: 'en', label: 'EN', title: 'English' },
	{ code: 'de', label: 'DE', title: 'Deutsch' },
	{ code: 'pt', label: 'PT', title: 'Português' },
	{ code: 'fr', label: 'FR', title: 'Français' },
];

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
	const menuRef = useRef<HTMLDivElement>(null);
	useMenuNavigation(menuRef);

	const { i18n } = useTranslation();

	useEffect(() => {
		// Enforce a11y & L10n structural requirements when language changes
		if (i18n.language) {
			document.documentElement.lang = i18n.language;
		}
	}, [i18n.language]);

	const handleLanguageChange = (code: string) => {
		i18n.changeLanguage(code);
		localStorage.setItem('language-preference', code);
	};

	const currentLang =
		SUPPORTED_LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) ||
		SUPPORTED_LANGUAGES[0];

	return (
		<Popover align="end">
			<S.TriggerButton className={className} aria-label="Select language">
				<span aria-hidden="true">🌐</span> {currentLang.label}{' '}
				<span
					aria-hidden="true"
					style={{ fontSize: '0.7em', marginLeft: '4px' }}
				>
					▼
				</span>
			</S.TriggerButton>
			<S.MenuContainer ref={menuRef} role="menu">
				{SUPPORTED_LANGUAGES.map(({ code, title }) => {
					const isActive = i18n.language?.startsWith(code) ?? false;
					return (
						<S.MenuItem
							key={code}
							role="menuitem"
							tabIndex={-1}
							title={title}
							aria-label={`Change language to ${title}`}
							data-active={isActive}
							onClick={() => handleLanguageChange(code)}
						>
							{title}{' '}
							{isActive && <span className="check">✓</span>}
						</S.MenuItem>
					);
				})}
			</S.MenuContainer>
		</Popover>
	);
}

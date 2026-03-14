import { useTranslation } from 'react-i18next';

import * as S from './_AppFooter.styles';

export function AppFooter() {
	const { i18n, t } = useTranslation();

	const isGerman = i18n.language.startsWith('de');
	const isEnglish = i18n.language.startsWith('en');

	return (
		<S.FixedFooter>
			<S.FooterLink
				to="/impressum"
				hrefLang={!isGerman && !isEnglish ? 'en' : undefined}
			>
				{isGerman
					? 'Impressum'
					: isEnglish
						? 'Legal Notice'
						: `${t('lobby.footer.impressum')} (English)`}
			</S.FooterLink>
			<S.FooterLink
				to="/privacy"
				hrefLang={!isGerman && !isEnglish ? 'en' : undefined}
			>
				{isGerman
					? 'Datenschutzerklärung'
					: isEnglish
						? 'Privacy Policy'
						: `${t('lobby.footer.privacy')} (English)`}
			</S.FooterLink>
			<S.StaticFooterLink href="/storybook/">
				{t('lobby.footer.storybook')}
			</S.StaticFooterLink>
		</S.FixedFooter>
	);
}

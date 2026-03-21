import { useTranslation } from 'react-i18next';

import packageJson from '../../../../package.json';
import * as S from './_AppFooter.styles';

export function AppFooter() {
	const { i18n, t } = useTranslation();

	const isGerman = i18n.language.startsWith('de');
	const isEnglish = i18n.language.startsWith('en');

	return (
		<S.FooterContainer aria-label="Site Information">
			<S.Nav aria-label="Legal">
				<S.NavList role="list">
					<S.NavListItem>
						<S.FooterLink
							to="/impressum"
							hrefLang={
								!isGerman && !isEnglish ? 'en' : undefined
							}
						>
							{isGerman
								? 'Impressum'
								: isEnglish
									? 'Legal Notice'
									: `${t('lobby.footer.impressum')} (English)`}
						</S.FooterLink>
					</S.NavListItem>
					<S.NavListItem>
						<S.FooterLink
							to="/privacy"
							hrefLang={
								!isGerman && !isEnglish ? 'en' : undefined
							}
						>
							{isGerman
								? 'Datenschutzerklärung'
								: isEnglish
									? 'Privacy Policy'
									: `${t('lobby.footer.privacy')} (English)`}
						</S.FooterLink>
					</S.NavListItem>
					<S.NavListItem>
						<S.StaticFooterLink href="/storybook/">
							{t('lobby.footer.storybook')}
						</S.StaticFooterLink>
					</S.NavListItem>
				</S.NavList>
			</S.Nav>
			<S.VersionInfo aria-label={`Version ${packageJson.version}`}>
				v{packageJson.version}
			</S.VersionInfo>
		</S.FooterContainer>
	);
}

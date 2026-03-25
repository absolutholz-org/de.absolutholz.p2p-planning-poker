import { useTranslation } from 'react-i18next';

import packageJson from '../../../../package.json';
import { Stack } from '../../Shared/Stack';
import * as S from './_AppFooter.styles';

export function AppFooter() {
	const { i18n, t } = useTranslation();

	const isGerman = i18n.language.startsWith('de');
	const isEnglish = i18n.language.startsWith('en');

	return (
		<S.FooterContainer>
			<S.Nav aria-label={t('footer.aria.legal')}>
				<Stack direction="row" spacing="md" wrap>
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
				</Stack>
			</S.Nav>

			<S.Nav aria-label={t('footer.aria.project')}>
				<Stack direction="row" spacing="md" wrap>
					<S.StaticFooterLink
						href="https://github.com/absolutholz/p2p-planning-poker"
						target="_blank"
						rel="noopener noreferrer"
					>
						{t('footer.links.github')}
					</S.StaticFooterLink>
					<S.StaticFooterLink href="/storybook/">
						{t('lobby.footer.storybook')}
					</S.StaticFooterLink>
				</Stack>
			</S.Nav>

			<S.VersionInfo aria-label={`Version ${packageJson.version}`}>
				v{packageJson.version}
			</S.VersionInfo>
		</S.FooterContainer>
	);
}

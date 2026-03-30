import { useTranslation } from 'react-i18next';

import packageJson from '../../../../package.json';
import { Stack } from '../Stack';
import * as S from './_AppFooter.styles';

export function AppFooter() {
	const { i18n, t } = useTranslation();

	const isGerman = i18n.language.startsWith('de');
	const isEnglish = i18n.language.startsWith('en');

	const startYear = 2026;
	const isRange = startYear < BUILD_YEAR;

	const copyrightAriaLabel = isRange
		? t('footer.aria.copyright_range', {
				end: BUILD_YEAR,
				start: startYear,
			})
		: t('footer.aria.copyright_single', { year: BUILD_YEAR });

	return (
		<S.FooterContainer>
			{/* Cluster A: Legal Links */}
			<nav aria-label={t('footer.aria.legal')}>
				<Stack
					component="ul"
					direction="row"
					spacing="sm"
					crossSpacing="xs"
					wrap
					justify="center"
					role="list"
				>
					<li>
						<S.FooterLink
							to="/impressum"
							hrefLang={
								!isGerman && !isEnglish ? 'en' : undefined
							}
						>
							{isGerman
								? t('footer.legal.impressum_native')
								: isEnglish
									? t('footer.legal.impressum_en')
									: `${t('lobby.footer.impressum')} ${t('footer.legal.english_suffix')}`}
						</S.FooterLink>
					</li>
					<li>
						<S.FooterLink
							to="/privacy"
							hrefLang={
								!isGerman && !isEnglish ? 'en' : undefined
							}
						>
							{isGerman
								? t('footer.legal.privacy_native')
								: isEnglish
									? t('footer.legal.privacy_en')
									: `${t('lobby.footer.privacy')} ${t('footer.legal.english_suffix')}`}
						</S.FooterLink>
					</li>
				</Stack>
			</nav>

			{/* Cluster B: Identity & Copyright */}
			<S.IdentityContainer
				align="baseline"
				direction="row"
				wrap
				spacing="sm"
				crossSpacing="xs"
				justify="center"
			>
				<S.Copyright aria-label={copyrightAriaLabel}>
					©{' '}
					{isRange && (
						<>
							<time dateTime={startYear.toString()}>
								{startYear}
							</time>
							–
						</>
					)}
					<time dateTime={BUILD_YEAR.toString()}>{BUILD_YEAR}</time>{' '}
					absolutholz
				</S.Copyright>
				<S.VersionInfo aria-label={`Version ${packageJson.version}`}>
					v{packageJson.version}
				</S.VersionInfo>
			</S.IdentityContainer>

			{/* Cluster C: Resources */}
			<nav aria-label={t('footer.aria.project')}>
				<Stack
					component="ul"
					direction="row"
					spacing="sm"
					crossSpacing="xs"
					wrap
					justify="center"
					role="list"
				>
					<li>
						<S.StaticFooterLink
							href="https://github.com/absolutholz-org/de.absolutholz.p2p-planning-poker"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t('footer.links.github')}
						</S.StaticFooterLink>
					</li>
					<li>
						<S.StaticFooterLink href="/storybook/">
							{t('lobby.footer.storybook')}
						</S.StaticFooterLink>
					</li>
				</Stack>
			</nav>
		</S.FooterContainer>
	);
}

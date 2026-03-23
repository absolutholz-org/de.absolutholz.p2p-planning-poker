import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { AppFooter } from '../AppFooter';
import { Header } from '../Header';
import { SkipLink } from '../SkipLink';
import * as S from './_AppLayout.styles';

interface AppLayoutProps {
	children: ReactNode;
}

/**
 * Common layout frame for the application.
 * Provides the SkipLink, Header, Main content area, and AppFooter.
 */
export function AppLayout({ children }: AppLayoutProps) {
	const { t } = useTranslation();
	return (
		<S.LayoutRoot aria-label={t('common.poker')}>
			<SkipLink />
			<Header />
			<S.MainContent id="main-content" tabIndex={-1}>
				{children}
			</S.MainContent>
			<AppFooter />
		</S.LayoutRoot>
	);
}

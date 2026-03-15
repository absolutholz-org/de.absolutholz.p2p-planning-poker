import type { ReactNode } from 'react';

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
	return (
		<S.LayoutRoot>
			<SkipLink />
			<Header />
			<S.MainContent id="main-content" tabIndex={-1}>
				{children}
			</S.MainContent>
			<AppFooter />
		</S.LayoutRoot>
	);
}

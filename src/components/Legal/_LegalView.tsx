import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import remarkBreaks from 'remark-breaks';

import accessibilityDe from '../../assets/accessibility-de.md?raw';
import accessibilityEn from '../../assets/accessibility-en.md?raw';
import accessibilityFr from '../../assets/accessibility-fr.md?raw';
import accessibilityPt from '../../assets/accessibility-pt.md?raw';
import impressumDe from '../../assets/impressum-de.md?raw';
import impressumEn from '../../assets/impressum-en.md?raw';
import privacyDe from '../../assets/privacy-de.md?raw';
import privacyEn from '../../assets/privacy-en.md?raw';
import { Button } from '../Shared/Button';
import { PageContainer } from '../Shared/PageContainer';
import * as S from './_LegalView.styles';

export interface LegalViewProps {
	type: 'impressum' | 'privacy' | 'accessibility';
}
export function LegalView({ type }: LegalViewProps) {
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	const isGerman = i18n.language.startsWith('de');
	const isFrench = i18n.language.startsWith('fr');
	const isPortuguese = i18n.language.startsWith('pt');

	const content = useMemo(() => {
		if (type === 'impressum') {
			return isGerman ? impressumDe : impressumEn;
		}
		if (type === 'accessibility') {
			if (isGerman) return accessibilityDe;
			if (isFrench) return accessibilityFr;
			if (isPortuguese) return accessibilityPt;
			return accessibilityEn;
		}
		return isGerman ? privacyDe : privacyEn;
	}, [type, isGerman, isFrench, isPortuguese]);

	return (
		<PageContainer>
			<S.BackButtonContainer>
				<Button variant="secondary" onClick={() => navigate('/')}>
					{t('legal.back_to_app')}
				</Button>
			</S.BackButtonContainer>

			<S.MarkdownWrapper lang={isGerman ? 'de' : 'en'}>
				<ReactMarkdown remarkPlugins={[remarkBreaks]}>
					{content}
				</ReactMarkdown>
			</S.MarkdownWrapper>
		</PageContainer>
	);
}

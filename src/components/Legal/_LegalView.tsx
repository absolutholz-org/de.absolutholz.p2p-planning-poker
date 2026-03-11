import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import impressumDe from '../../assets/impressum-de.md?raw';
import impressumEn from '../../assets/impressum-en.md?raw';
import privacyDe from '../../assets/privacy-de.md?raw';
import privacyEn from '../../assets/privacy-en.md?raw';
import { Button } from '../Shared/Button';
import { PageContainer } from '../Shared/PageContainer';
import * as S from './_LegalView.styles';

export interface LegalViewProps {
	type: 'impressum' | 'privacy';
}
export function LegalView({ type }: LegalViewProps) {
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const isGerman = i18n.language.startsWith('de');

	const content = useMemo(() => {
		if (type === 'impressum') {
			return isGerman ? impressumDe : impressumEn;
		}
		return isGerman ? privacyDe : privacyEn;
	}, [type, isGerman]);

	return (
		<PageContainer>
			<S.ContentWrapper>
				<S.BackButtonContainer>
					<Button variant="secondary" onClick={() => navigate('/')}>
						← Back to App
					</Button>
				</S.BackButtonContainer>

				<S.MarkdownWrapper lang={isGerman ? 'de' : 'en'}>
					<ReactMarkdown>{content}</ReactMarkdown>
				</S.MarkdownWrapper>
			</S.ContentWrapper>
		</PageContainer>
	);
}

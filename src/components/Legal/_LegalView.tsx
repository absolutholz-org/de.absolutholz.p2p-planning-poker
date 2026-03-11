import { useMemo, useState } from 'react';
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

	// Default to browser/i18n language, but allow manual toggle
	const [activeLang, setActiveLang] = useState<'de' | 'en'>(
		i18n.language.startsWith('de') ? 'de' : 'en',
	);

	const content = useMemo(() => {
		if (type === 'impressum') {
			return activeLang === 'de' ? impressumDe : impressumEn;
		}
		return activeLang === 'de' ? privacyDe : privacyEn;
	}, [type, activeLang]);

	return (
		<PageContainer>
			<S.ContentWrapper>
				<S.BackButtonContainer>
					<Button variant="secondary" onClick={() => navigate('/')}>
						← Back to App
					</Button>

					<S.ToggleGroup>
						<S.ToggleButton
							active={activeLang === 'de'}
							onClick={() => setActiveLang('de')}
						>
							DE
						</S.ToggleButton>
						<S.ToggleButton
							active={activeLang === 'en'}
							onClick={() => setActiveLang('en')}
						>
							EN
						</S.ToggleButton>
					</S.ToggleGroup>
				</S.BackButtonContainer>

				<S.MarkdownWrapper>
					<ReactMarkdown>{content}</ReactMarkdown>
				</S.MarkdownWrapper>
			</S.ContentWrapper>
		</PageContainer>
	);
}

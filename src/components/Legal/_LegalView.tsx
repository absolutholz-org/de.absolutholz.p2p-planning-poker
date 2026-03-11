import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import { Button } from '../Shared/Button';
import { PageContainer } from '../Shared/PageContainer';
import * as S from './_LegalView.styles';

export interface LegalViewProps {
	content: string;
}

export function LegalView({ content }: LegalViewProps) {
	const navigate = useNavigate();

	return (
		<PageContainer>
			<S.ContentWrapper>
				<S.BackButtonContainer>
					<Button variant="secondary" onClick={() => navigate('/')}>
						← Back to App
					</Button>
				</S.BackButtonContainer>
				<S.MarkdownWrapper>
					<ReactMarkdown>{content}</ReactMarkdown>
				</S.MarkdownWrapper>
			</S.ContentWrapper>
		</PageContainer>
	);
}

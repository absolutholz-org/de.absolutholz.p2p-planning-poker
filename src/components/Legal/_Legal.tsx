import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import legalContent from '../../assets/legal.md?raw';
import { Button } from '../Shared/Button';
import { PageContainer } from '../Shared/PageContainer';
import * as S from './_Legal.styles';

export function Legal() {
	const navigate = useNavigate();

	return (
		<PageContainer>
			<S.ContentWrapper>
				<S.BackButtonContainer>
					<Button variant="secondary" onClick={() => navigate(-1)}>
						← Back to App
					</Button>
				</S.BackButtonContainer>
				<S.MarkdownWrapper>
					<ReactMarkdown>{legalContent}</ReactMarkdown>
				</S.MarkdownWrapper>
			</S.ContentWrapper>
		</PageContainer>
	);
}

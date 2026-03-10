import { useTranslation } from 'react-i18next';

import * as S from './_SkipLink.styles';
import { type ISkipLink } from './_SkipLink.types';

export function SkipLink({ targetId = 'main-content' }: ISkipLink) {
	const { t } = useTranslation();

	return (
		<S.SkipLink href={`#${targetId}`}>
			{t('common.skipToMainContent')}
		</S.SkipLink>
	);
}

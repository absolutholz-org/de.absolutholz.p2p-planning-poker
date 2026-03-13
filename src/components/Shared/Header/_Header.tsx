import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useRoom } from '../../../context/RoomContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SchemeSwitcher } from '../SchemeSwitcher';
import { Timer } from '../Timer';
import * as S from './_Header.styles';

export function Header() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { leaveRoom, roomState } = useRoom();

	const handleHomeClick = () => {
		leaveRoom();
		navigate('/');
	};

	return (
		<S.HeaderContainer>
			<S.Brand
				onClick={handleHomeClick}
				role="button"
				tabIndex={0}
				aria-label="Return to Home"
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleHomeClick();
					}
				}}
			>
				<S.LogoIcon aria-hidden="true">P</S.LogoIcon>
				<S.BrandText>
					<span>{t('common.p2p', 'P2P')}</span>
					<span>{t('common.poker_text', 'Poker')}</span>
				</S.BrandText>
			</S.Brand>

			<S.Actions>
				{roomState && <Timer />}
				<LanguageSwitcher />
				<SchemeSwitcher />
			</S.Actions>
		</S.HeaderContainer>
	);
}

import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../hooks/useRoom';
import { Dialog } from '../../Shared/Dialog';
import { Switch } from '../../Shared/Switch';
import * as S from './_SettingsDialog.styles';

export interface SettingsDialogProps {
	id?: string;
	isOpen: boolean;
	onClose: () => void;
}

export function SettingsDialog({
	id = 'settings-dialog',
	isOpen,
	onClose,
}: SettingsDialogProps) {
	const { t } = useTranslation();
	const { roomState, sendAction } = useRoom();

	if (!roomState) return null;

	const handleToggleRevote = () => {
		sendAction({ payload: undefined, type: 'TOGGLE_ALLOW_REVOTE' });
	};

	return (
		<Dialog
			id={id}
			isOpen={isOpen}
			title={t('components.settings.title')}
			cancelText={t('common.actions.close')}
			onCancel={onClose}
		>
			<S.ContentContainer>
				<S.SettingRow>
					<Switch
						id={`${id}-revote`}
						label={t('components.settings.revote.label')}
						checked={roomState.allowRevoteAfterReveal}
						onChange={handleToggleRevote}
					/>
					<S.Description>
						{t('components.settings.revote.description')}
					</S.Description>
				</S.SettingRow>
			</S.ContentContainer>
		</Dialog>
	);
}

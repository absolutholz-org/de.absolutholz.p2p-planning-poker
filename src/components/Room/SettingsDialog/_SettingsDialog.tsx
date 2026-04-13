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
						checked={roomState.settings.allowRevoteAfterReveal}
						onChange={() =>
							sendAction({
								payload: undefined,
								type: 'TOGGLE_ALLOW_REVOTE',
							})
						}
					/>
					<S.Description>
						{t('components.settings.revote.description')}
					</S.Description>
				</S.SettingRow>
				<S.SettingRow>
					<Switch
						id={`${id}-anyone-reveal`}
						label={t('components.settings.anyoneCanReveal.label')}
						checked={roomState.settings.anyoneCanReveal}
						onChange={() =>
							sendAction({
								payload: undefined,
								type: 'TOGGLE_ANYONE_CAN_REVEAL',
							})
						}
					/>
					<S.Description>
						{t('components.settings.anyoneCanReveal.description')}
					</S.Description>
				</S.SettingRow>
				<S.SettingRow>
					<Switch
						id={`${id}-only-all-voted`}
						label={t(
							'components.settings.revealOnlyWhenAllVoted.label',
						)}
						checked={roomState.settings.revealOnlyWhenAllVoted}
						onChange={() =>
							sendAction({
								payload: undefined,
								type: 'TOGGLE_REVEAL_ONLY_WHEN_ALL_VOTED',
							})
						}
					/>
					<S.Description>
						{t(
							'components.settings.revealOnlyWhenAllVoted.description',
						)}
					</S.Description>
				</S.SettingRow>
			</S.ContentContainer>
		</Dialog>
	);
}

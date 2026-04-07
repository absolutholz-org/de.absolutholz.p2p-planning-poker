import { VisuallyHidden } from '../VisuallyHidden';
import * as S from './_Switch.styles';
import { type ISwitch } from './_Switch.types';

export function Switch({
	checked,
	disabled = false,
	id,
	label,
	onChange,
}: ISwitch) {
	return (
		<S.Switch_Container htmlFor={id} disabled={disabled}>
			<S.Switch_LabelText>{label}</S.Switch_LabelText>
			<VisuallyHidden>
				<S.Switch_HiddenInput
					type="checkbox"
					role="switch"
					id={id}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					aria-checked={checked}
				/>
			</VisuallyHidden>
			<S.Switch_Track checked={checked} aria-hidden="true">
				<S.Switch_Thumb checked={checked} />
			</S.Switch_Track>
		</S.Switch_Container>
	);
}

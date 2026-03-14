import * as S from './_Input.styles';
import { type IInput } from './_Input.types';

export function Input({ error, id, label, ...props }: IInput) {
	const hasError = !!error;

	return (
		<S.InputWrapper>
			{label && <S.Label htmlFor={id}>{label}</S.Label>}
			<S.InputContainer $hasError={hasError}>
				<S.StyledInput
					id={id}
					$hasError={hasError}
					aria-invalid={hasError}
					aria-describedby={hasError ? `${id}-error` : undefined}
					{...props}
				/>
			</S.InputContainer>

			{error && (
				<S.ErrorMessage id={`${id}-error`} role="alert">
					{error}
				</S.ErrorMessage>
			)}
		</S.InputWrapper>
	);
}

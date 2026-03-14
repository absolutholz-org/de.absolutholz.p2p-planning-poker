import { forwardRef } from 'react';

import * as S from './_Input.styles';
import { type IInput } from './_Input.types';

export const Input = forwardRef<HTMLInputElement, IInput>(
	({ error, id, label, ...props }, ref) => {
		const hasError = !!error;

		return (
			<S.InputWrapper>
				{label && <S.Label htmlFor={id}>{label}</S.Label>}
				<S.InputContainer $hasError={hasError}>
					<S.StyledInput
						ref={ref}
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
	},
);

Input.displayName = 'Input';

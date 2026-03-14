import { forwardRef } from 'react';

import { Icon } from '../Icon';
import * as S from './_Input.styles';
import { type IInput } from './_Input.types';

export const Input = forwardRef<HTMLInputElement, IInput>(
	({ error, icon, id, label, ...props }, ref) => {
		const hasIcon = !!icon;
		const hasError = !!error;

		return (
			<S.InputWrapper>
				{label && <S.Label htmlFor={id}>{label}</S.Label>}
				<S.InputContainer $hasIcon={hasIcon} $hasError={hasError}>
					{icon && (
						<Icon name={icon} size={24} className="input-icon" />
					)}
					<S.StyledInput
						ref={ref}
						id={id}
						$hasIcon={hasIcon}
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

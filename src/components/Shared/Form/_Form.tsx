import { Stack } from '../Stack';
import * as S from './_Form.styles';
import type { IForm } from './_Form.types';

export function Form({ children, error, spacing = 'md', ...props }: IForm) {
	return (
		<S.StyledForm {...props}>
			{error && (
				<S.ErrorSummary role="alert" aria-live="polite">
					{error}
				</S.ErrorSummary>
			)}
			<Stack spacing={spacing}>{children}</Stack>
		</S.StyledForm>
	);
}

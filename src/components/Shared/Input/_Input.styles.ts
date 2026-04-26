import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, space } from '../../../theme/tokens';

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${space('xs')};
	width: 100%;
`;

export const Label = styled.label`
	color: ${color('text-secondary')};
	font-size: ${fontSize('xs')};
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

export const InputContainer = styled.div<{ $hasError: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
	width: 100%;
	min-height: 3.5rem;
	padding: 0 ${space('md')};

	background: ${color('surface-subtle')};
	backdrop-filter: blur(8px);
	border: 2px solid
		${(props) => (props.$hasError ? color('danger') : color('border'))};
	border-radius: ${borderRadius('lg')};

	color: ${color('text-primary')};
	font-family: inherit;
	font-size: ${fontSize('md')};
	font-weight: 500;

	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

	&::placeholder {
		color: ${color('text-secondary')};
		opacity: 0.5;
	}

	&:hover:not(:disabled) {
		border-color: ${(props) =>
			props.$hasError ? color('danger') : color('primary')};
		background: ${color('surface')};
	}

	&:focus {
		outline: none;
		border-color: ${(props) =>
			props.$hasError ? color('danger') : color('primary')};
		background: ${color('surface')};
		box-shadow: 0 0 0 4px
			${(props) =>
				props.$hasError ? 'rgba(239, 68, 68, 0.1)' : color('focus')};
		transform: translateY(-1px);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		filter: grayscale(1);
	}
`;

export const ErrorMessage = styled.span`
	color: ${color('danger')};
	font-size: ${fontSize('xs')};
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: ${space('xs')};
	margin-top: 2px;
	animation: fadeIn 0.3s ease-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

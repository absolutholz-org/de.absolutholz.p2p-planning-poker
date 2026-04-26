import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-xs);
	width: 100%;
`;

export const Label = styled.label`
	color: ${color('text-secondary')};
	font-size: var(--sys-font-size-xs);
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
	padding: 0 var(--sys-spacing-md);

	background: ${color('surface-subtle')};
	backdrop-filter: blur(8px);
	border: 2px solid
		${(props) => (props.$hasError ? color('danger') : color('border'))};
	border-radius: var(--sys-radius-lg);

	color: ${color('text-primary')};
	font-family: inherit;
	font-size: var(--sys-font-size-md);
	font-weight: 500;

	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

	&::placeholder {
		color: ${color('text-secondary')};
		opacity: 0.5;
	}

	&:hover:not(:disabled) {
		border-color: ${(props) =>
			props.$hasError ? color('danger') : color('primary-subtle')};
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
	font-size: var(--sys-font-size-xs);
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-xs);
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

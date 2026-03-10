import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
	margin-inline: auto;
	margin-top: var(--sys-spacing-xl);
	max-width: 30rem;
`;

export const FormCard = styled.form`
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-xl);
	box-shadow:
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	padding: var(--sys-spacing-xl);
	width: 100%;
`;

export const Title = styled.h1`
	color: var(--sys-color-text-primary);
	font-size: var(--sys-font-size-2xl);
	font-weight: 600;
	margin-bottom: var(--sys-spacing-sm);
`;

export const SubTitle = styled.p`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	line-height: 1.5;
	margin-bottom: var(--sys-spacing-xl);
`;

export const FieldLine = styled.div`
	margin-top: var(--sys-spacing-md);
`;

export const LabelRow = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--sys-spacing-sm);
`;

export const Label = styled.label`
	align-items: center;
	color: var(--sys-color-text-secondary);
	display: flex;
	font-size: var(--sys-font-size-xs);
	font-weight: 700;
	gap: var(--sys-spacing-xs);
	letter-spacing: 0.05em;
	text-transform: uppercase;
`;

export const OptionalLabel = styled.span`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	opacity: 0.7;
`;

export const Input = styled.input`
	background-color: var(--sys-color-bg);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-md);
	color: var(--sys-color-text-primary);
	font-family: inherit;
	font-size: var(--sys-font-size-md);
	min-height: 3rem;
	padding: 0 var(--sys-spacing-md);
	width: 100%;

	&:focus {
		border-color: var(--sys-color-primary);
		box-shadow: 0 0 0 3px var(--sys-color-focus);
		outline: none;
	}
`;

export const HelperText = styled.p`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	margin-top: 0.125rem;
`;

export const ErrorMessage = styled.div`
	background-color: rgba(239, 68, 68, 0.1);
	border-radius: var(--sys-radius-md);
	color: var(--sys-color-danger);
	font-weight: 500;
	padding: var(--sys-spacing-sm);
	text-align: center;
`;

export const Footer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: var(--sys-spacing-lg);
`;

export const ExtraText = styled.div`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	margin-top: var(--sys-spacing-xl);
	padding-inline: var(--sys-spacing-xl);
	text-align: center;
`;

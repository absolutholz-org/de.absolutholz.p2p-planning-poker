import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 80px); /* Account for global header */
	padding: var(--sys-spacing-md);
`;

export const FormCard = styled.form`
	background-color: var(--sys-color-surface);
	border-radius: var(--sys-radius-xxl);
	padding: var(--sys-spacing-xl);
	max-width: 480px;
	width: 100%;
	box-shadow:
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-lg);
`;

export const Title = styled.h1`
	color: var(--sys-color-text-primary);
	margin-bottom: var(--sys-spacing-sm);
	font-weight: 700;
	font-size: var(--sys-font-size-2xl);
`;

export const SubTitle = styled.p`
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-lg);
	font-size: var(--sys-font-size-sm);
	line-height: 1.5;
`;

export const FieldLine = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-xs);
	position: relative;
`;

export const LabelRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Label = styled.label`
	font-weight: 700;
	font-size: var(--sys-font-size-xs);
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: var(--sys-color-text-secondary);
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-xs);
`;

export const OptionalLabel = styled.span`
	font-size: var(--sys-font-size-xs);
	color: var(--sys-color-text-secondary);
	opacity: 0.7;
`;

export const Input = styled.input`
	/* A11Y requirement: 48px touch targets for inputs too */
	min-height: 48px;
	padding: 0 var(--sys-spacing-md);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-md);
	font-size: var(--sys-font-size-md);
	font-family: inherit;
	width: 100%;
	background-color: var(--sys-color-bg);
	color: var(--sys-color-text-primary);

	&:focus {
		outline: none;
		border-color: var(--sys-color-primary);
		box-shadow: 0 0 0 3px var(--sys-color-focus);
	}
`;

export const HelperText = styled.p`
	font-size: var(--sys-font-size-sm);
	color: var(--sys-color-text-secondary);
	margin-top: 2px;
`;

export const ErrorMessage = styled.div`
	background-color: rgba(239, 68, 68, 0.1);
	color: var(--sys-color-danger);
	padding: var(--sys-spacing-sm);
	border-radius: var(--sys-radius-md);
	font-weight: 500;
	text-align: center;
`;

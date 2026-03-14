import styled from '@emotion/styled';

export const StyledForm = styled.form`
	width: 100%;
`;

export const ErrorSummary = styled.div`
	background: var(--sys-color-danger-subtle);
	border-left: 4px solid var(--sys-color-danger);
	border-radius: var(--sys-radius-sm);
	color: var(--sys-color-danger);
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
	margin-bottom: var(--sys-spacing-md);
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
`;

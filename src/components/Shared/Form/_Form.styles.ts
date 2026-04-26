import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const StyledForm = styled.form`
	width: 100%;
`;

export const ErrorSummary = styled.div`
	background: ${color('surface-subtle')};
	border-left: 4px solid ${color('danger')};
	border-radius: var(--sys-radius-sm);
	color: ${color('danger')};
	font-size: var(--sys-font-size-sm);
	font-weight: 500;
	margin-bottom: var(--sys-spacing-md);
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
`;

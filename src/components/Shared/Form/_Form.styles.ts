import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, space } from '../../../theme/tokens';

export const StyledForm = styled.form`
	width: 100%;
`;

export const ErrorSummary = styled.div`
	background: ${color('surface-subtle')};
	border-left: 4px solid ${color('danger')};
	border-radius: ${borderRadius('sm')};
	color: ${color('danger')};
	font-size: ${fontSize('sm')};
	font-weight: 500;
	margin-bottom: ${space('md')};
	padding: ${space('sm')} ${space('md')};
`;

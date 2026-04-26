import styled from '@emotion/styled';

import { color } from '../../../theme/colors';
import { borderRadius, fontSize, shadow, space } from '../../../theme/tokens';

export const Switch_Container = styled.label<{ disabled?: boolean }>`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	gap: ${space('md')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	user-select: none;
	width: 100%;

	&:has(input:focus-visible) > div {
		outline: 0.125em solid ${color('info')};
		outline-offset: 0.25em;
	}
`;

export const Switch_LabelText = styled.span`
	font-size: ${fontSize('md')};
	color: ${color('text-primary')};
	font-weight: var(--sys-font-weight-bold);
`;

export const Switch_HiddenInput = styled.input`
	/* Inherits visually hidden boilerplate from VisuallyHidden component wrapper */
`;

export const Switch_Track = styled.div<{ checked: boolean }>`
	position: relative;
	width: 3em;
	height: 1.75em;
	background-color: ${(props) =>
		props.checked ? color('info') : color('border')};
	border-radius: ${borderRadius('pill')};
	transition: background-color 0.2s ease-in-out;
	flex-shrink: 0;

	/* Ensure visibility in Forced Colors Mode */
	border: 1px solid transparent;
	@media (forced-colors: active) {
		border-color: CanvasText;
	}
`;

export const Switch_Thumb = styled.span<{ checked: boolean }>`
	position: absolute;
	top: 0.125em;
	left: 0.125em;
	width: 1.375em;
	height: 1.375em;
	background-color: ${color('surface')};
	border-radius: ${borderRadius('pill')};
	transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	transform: ${(props) =>
		props.checked ? 'translateX(1.25em)' : 'translateX(0)'};
	box-shadow: ${shadow('sm')};
`;

import styled from '@emotion/styled';

export const Switch_Container = styled.label<{ disabled?: boolean }>`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--sys-spacing-md);
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	user-select: none;
	width: 100%;

	&:has(input:focus-visible) > div {
		outline: 0.125em solid var(--sys-color-info);
		outline-offset: 0.25em;
	}
`;

export const Switch_LabelText = styled.span`
	font-size: var(--sys-font-size-md);
	color: var(--sys-color-text-primary);
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
		props.checked ? 'var(--sys-color-info)' : 'var(--sys-color-border)'};
	border-radius: var(--sys-radius-pill);
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
	background-color: var(--sys-color-surface);
	border-radius: var(--sys-radius-pill);
	transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	transform: ${(props) =>
		props.checked ? 'translateX(1.25em)' : 'translateX(0)'};
	box-shadow: var(--sys-shadow-sm);
`;

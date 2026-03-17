import styled from '@emotion/styled';

export const VisuallyHidden = styled.span<{ focusable?: boolean }>`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;

	${({ focusable }) =>
		focusable &&
		`
		&:focus,
		&:focus-within {
			clip: auto;
			clip-path: none;
			height: auto;
			overflow: visible;
			position: static;
			white-space: normal;
			width: auto;
		}
	`}
`;

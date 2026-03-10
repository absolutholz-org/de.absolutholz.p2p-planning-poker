import styled from '@emotion/styled';

export const SkipLink = styled.a`
	/* Visually hidden by default */
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;

	/* Visible on focus */
	&:focus {
		position: fixed;
		top: var(--sys-spacing-md);
		left: var(--sys-spacing-md);
		z-index: 1000;
		width: auto;
		height: auto;
		padding: var(--sys-spacing-md) var(--sys-spacing-lg);
		background-color: var(--sys-color-primary);
		color: var(--sys-color-primary-text);
		border-radius: var(--sys-radius-md);
		text-decoration: none;
		font-weight: 600;
		clip: auto;
		white-space: normal;
		outline: 3px solid var(--sys-color-focus);
		outline-offset: 4px;
	}
`;

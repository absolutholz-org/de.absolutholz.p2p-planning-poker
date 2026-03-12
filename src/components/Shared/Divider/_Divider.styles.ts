import styled from '@emotion/styled';

import type { IDivider } from './_Divider.types';

const LAYOUT_BREAKPOINT = '45rem';

export const StyledDivider = styled.div<IDivider>`
	display: flex;
	align-items: center;
	gap: var(--sys-spacing-md);
	margin-block: var(--sys-spacing-xl);
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	text-transform: uppercase;
	letter-spacing: 0.05em;

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-top: 1px solid var(--sys-color-border);
	}

	${({ children }) =>
		!children &&
		`
		&::after {
			display: none;
		}
	`}

	${({ hideOnDesktop }) =>
		hideOnDesktop &&
		`
		@media (min-width: ${LAYOUT_BREAKPOINT}) {
			display: none;
		}
	`}
`;

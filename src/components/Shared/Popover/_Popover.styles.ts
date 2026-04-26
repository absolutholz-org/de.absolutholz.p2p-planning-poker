import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const PopoverContent = styled.div`
	/* Reset default popover styling applied natively by browsers */
	border: none;
	padding: var(--sys-spacing-sm);
	margin: 0;

	/* Top Layer Placement Override Constraints */
	position: fixed;
	inset: auto;
	z-index: 100;

	background-color: ${color('surface')};
	color: ${color('text-primary')};
	opacity: 1;
	border: 1px solid ${color('border')};
	border-radius: var(--sys-radius-lg);
	box-shadow: var(--sys-shadow-lg);
	min-width: 11.25rem;

	/* Top layer animation handling */
	transition:
		opacity 0.15s ease-out,
		transform 0.15s ease-out;

	&::backdrop {
		background: transparent;
	}

	&:popover-open {
		display: block;
		opacity: 1;
		transform: translateY(0);
	}

	/* Before popover opens native bounding constraints */
	@starting-style {
		&:popover-open {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
	}
`;

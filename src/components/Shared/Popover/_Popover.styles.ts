import styled from '@emotion/styled';

export const PopoverContent = styled.div`
	/* Reset default popover styling applied natively by browsers */
	border: none;
	padding: var(--sys-spacing-sm);
	margin: 0;

	/* Top Layer Placement Override Constraints */
	position: fixed;
	inset: auto;
	z-index: 100;

	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-lg);
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	min-width: 180px;

	/* Top layer animation handling */
	transition:
		opacity 0.15s ease-out,
		transform 0.15s ease-out;

	&::backdrop {
		background: transparent;
	}

	&:popover-open {
		/* Only standard visible state triggers. */
		opacity: 1;
		transform: translateY(0);
	}

	/* Before popover opens native bounding constraints */
	@starting-style {
		&:popover-open {
			opacity: 0;
			transform: translateY(-8px);
		}
	}
`;

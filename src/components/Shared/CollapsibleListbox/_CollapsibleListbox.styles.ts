import styled from '@emotion/styled';

import { color } from '../../../theme/colors';

export const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 10rem;
`;

export const MenuItem = styled.button<{ 'data-active': boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	background: ${(props) =>
		props['data-active'] ? color('bg') : 'transparent'};
	border: none;
	width: 100%;
	text-align: left;
	font-size: var(--sys-font-size-sm);
	color: ${color('text-primary')};
	border-radius: var(--sys-radius-sm);
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${color('border')};
	}

	&:focus-visible {
		outline: 2px solid ${color('focus')};
	}

	.check {
		font-weight: bold;
		color: ${color('text-primary')};
	}

	.option-content {
		display: flex;
		align-items: center;
		gap: var(--sys-spacing-sm);
	}

	.option-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
	}
`;

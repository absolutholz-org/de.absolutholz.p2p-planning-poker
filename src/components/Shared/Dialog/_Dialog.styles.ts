import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Animation for the modal appearing
export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

export const DialogBase = styled.dialog`
	background: transparent;
	border: none;
	border-radius: var(--sys-radius-xl);
	margin: auto;
	max-width: 40rem;
	overflow: visible;
	padding: 0;
	width: calc(100% - 2rem);

	&::backdrop {
		animation: ${fadeIn} 0.3s ease-out;
		backdrop-filter: blur(2px);
		background-color: rgba(0, 0, 0, 0.5);
	}

	&[open] {
		animation: ${slideUp} 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	&:focus-visible {
		outline: none;
	}
`;

export const DialogContainer = styled.div`
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-xl);
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	color: var(--sys-color-text-primary);
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

export const DialogHeader = styled.div`
	align-items: center;
	background-color: transparent;
	border-bottom: 1px solid var(--sys-color-border);
	display: flex;
	justify-content: space-between;
	padding: var(--sys-spacing-lg);
`;

export const DialogTitle = styled.h2`
	color: var(--sys-color-text-primary);
	font-size: var(--sys-font-size-2xl);
	font-weight: 700;
	margin: 0;
`;

export const CloseButton = styled.button`
	align-items: center;
	background: transparent;
	border: none;
	border-radius: var(--sys-radius-pill);
	color: var(--sys-color-text-secondary);
	cursor: pointer;
	display: flex;
	justify-content: center;
	padding: var(--sys-spacing-sm);
	transition: all 0.2s;

	&:hover {
		background-color: var(--sys-color-bg);
		color: var(--sys-color-text-primary);
	}

	&:focus-visible {
		box-shadow: 0 0 0 2px var(--sys-color-focus);
		outline: none;
	}

	/* Visually hidden text for accessibility */
	& > span {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
`;

export const DialogContent = styled.div`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-md);
	line-height: 1.5;
	padding: var(--sys-spacing-lg);
`;

export const DialogFooter = styled.div`
	display: flex;
	gap: var(--sys-spacing-sm);
	justify-content: flex-end;
	padding: 0 var(--sys-spacing-lg) var(--sys-spacing-lg) var(--sys-spacing-lg);
`;

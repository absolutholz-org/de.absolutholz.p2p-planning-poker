import styled from '@emotion/styled';

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 50; /* Ensure on top */
	padding: var(--sys-spacing-md);
`;

export const DialogBox = styled.div`
	background-color: var(--sys-color-surface);
	border-radius: var(--sys-radius-lg);
	padding: var(--sys-spacing-xl);
	max-width: 400px;
	width: 100%;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const Title = styled.h2`
	margin-top: 0;
	margin-bottom: var(--sys-spacing-sm);
	color: var(--sys-color-text-primary);
	font-size: 1.25rem;
`;

export const Message = styled.p`
	color: var(--sys-color-text-secondary);
	margin-bottom: var(--sys-spacing-xl);
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: var(--sys-spacing-md);
`;

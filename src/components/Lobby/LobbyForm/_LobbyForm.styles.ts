import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
	margin-inline: auto;
	margin-top: var(--sys-spacing-xl);
	max-width: 30rem;
`;

export const CardContainer = styled.div`
	background-color: var(--sys-color-surface);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-xl);
	box-shadow: var(--sys-shadow-lg);
	padding: var(--sys-spacing-xl);
	width: 100%;
`;

export const Title = styled.h1`
	color: var(--sys-color-text-primary);
	font-size: var(--sys-font-size-2xl);
	font-weight: 600;
`;

export const SubTitle = styled.p`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	line-height: 1.5;
`;

export const DebugSection = styled.section`
	background: #fdf2f2;
	border: 1px solid #fecaca;
	border-radius: var(--radius-md);
	font-family: var(--font-mono);
	font-size: var(--font-size-xs);
	margin: var(--space-xl) auto;
	max-width: var(--lobby-card-width);
	padding: var(--space-md);
	width: 100%;

	h3 {
		color: #991b1b;
		margin-bottom: var(--space-xs);
		text-transform: uppercase;
		font-size: var(--font-size-xs);
	}
`;

export const DebugHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--space-xs);
`;

export const DebugCloseButton = styled.button`
	color: #991b1b;
	font-size: 1.2rem;
	line-height: 1;
	opacity: 0.6;
	transition: opacity 0.2s;

	&:hover {
		opacity: 1;
	}
`;

export const DebugToggle = styled.button`
	position: fixed;
	bottom: var(--space-md);
	right: var(--space-md);
	width: 2rem;
	height: 2rem;
	background: var(--sys-color-bg);
	border: 1px solid var(--sys-color-border);
	border-radius: var(--sys-radius-pill);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	opacity: 0.3;
	transition: all 0.2s;
	z-index: 100;
	filter: grayscale(1);

	&:hover {
		opacity: 1;
		transform: scale(1.1);
		filter: grayscale(0);
		box-shadow: var(--sys-shadow-sm);
	}
`;

export const ToggleContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: var(--sys-spacing-md);
`;

export const JoinCodeToggle = styled.button`
	background: transparent;
	border: none;
	color: var(--sys-color-primary);
	cursor: pointer;
	font-size: var(--sys-font-size-sm);
	font-weight: 600;
	padding: var(--sys-spacing-sm) var(--sys-spacing-md);
	border-radius: var(--sys-radius-sm);
	transition: all 0.2s ease-in-out;
	opacity: 0.8;

	&:hover {
		opacity: 1;
		background: var(--sys-color-surface-subtle);
		color: var(--sys-color-primary-hover);
	}
`;

export const DebugList = styled.ul`
	list-style: none;
	max-height: 200px;
	overflow-y: auto;
	padding: 0;

	li {
		border-bottom: 1px solid #fee2e2;
		color: #b91c1c;
		padding: 2px 0;
	}
`;

export const HelperText = styled.p`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-sm);
	margin-top: 0.125rem;
`;

export const ExtraText = styled.div`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	margin-top: var(--sys-spacing-xl);
	padding-inline: var(--sys-spacing-xl);
	text-align: center;
`;

export const DisclaimerText = styled.p`
	color: var(--sys-color-text-secondary);
	font-size: var(--sys-font-size-xs);
	text-align: center;
	margin-top: var(--sys-spacing-sm);
`;

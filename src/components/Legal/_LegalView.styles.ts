import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
	margin: 0 auto;
	max-width: 800px;
	padding: var(--sys-spacing-xl) 0;
	display: flex;
	flex-direction: column;
	gap: var(--sys-spacing-lg);
`;

export const BackButtonContainer = styled.div`
	margin-bottom: var(--sys-spacing-lg);
	display: flex;
	justify-content: flex-start;
`;

export const MarkdownWrapper = styled.article`
	color: var(--sys-color-text-primary);
	font-size: var(--sys-font-size-md);
	line-height: 1.6;
	max-width: 65ch;

	/* Markdown Typography Styling matching our Design System */

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: var(--sys-color-text-primary);
		font-weight: 700;
		margin-top: var(--sys-spacing-xl);
		margin-bottom: var(--sys-spacing-md);
	}

	h1 {
		font-size: var(--sys-font-size-2xl);
		margin-top: 0;
	}

	h2 {
		font-size: var(--sys-font-size-xl);
	}

	h3 {
		font-size: var(--sys-font-size-lg);
	}

	p {
		margin-bottom: var(--sys-spacing-md);
		color: var(--sys-color-text-secondary);
	}

	hr {
		border: none;
		border-top: 1px solid var(--sys-color-border);
		margin: var(--sys-spacing-xl) 0;
	}

	a {
		color: var(--sys-color-primary);
		text-decoration: none;

		&:hover,
		&:focus-visible {
			text-decoration: underline;
		}
	}

	strong {
		color: var(--sys-color-text-primary);
		font-weight: 600;
	}

	ul,
	ol {
		margin-bottom: var(--sys-spacing-md);
		padding-left: var(--sys-spacing-xl);
		color: var(--sys-color-text-secondary);
	}

	li {
		margin-bottom: var(--sys-spacing-xs);
	}

	code {
		background-color: var(--sys-color-bg);
		padding: 2px 4px;
		border-radius: var(--sys-radius-sm);
		font-family: inherit; // use simple monospace if preferred
		font-size: 0.9em;
		color: var(--sys-color-primary);
	}
`;

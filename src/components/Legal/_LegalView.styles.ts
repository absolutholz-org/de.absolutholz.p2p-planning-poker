import styled from '@emotion/styled';

import { color } from '../../theme/colors';

export const BackButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-bottom: var(--sys-spacing-lg);
`;

export const MarkdownWrapper = styled.article`
	color: ${color('text-primary')};
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
		color: ${color('text-primary')};
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
		color: ${color('text-secondary')};
		margin-bottom: var(--sys-spacing-md);
	}

	hr {
		border: none;
		border-top: 1px solid ${color('border')};
		margin: var(--sys-spacing-xl) 0;
	}

	a {
		color: ${color('primary')};
		text-decoration: none;

		&:hover,
		&:focus-visible {
			text-decoration: underline;
		}
	}

	strong {
		color: ${color('text-primary')};
		font-weight: 600;
	}

	ul,
	ol {
		color: ${color('text-secondary')};
		margin-bottom: var(--sys-spacing-md);
		padding-left: var(--sys-spacing-xl);
	}

	li {
		margin-bottom: var(--sys-spacing-xs);
	}

	code {
		background-color: ${color('bg')};
		border-radius: var(--sys-radius-sm);
		color: ${color('primary')};
		font-size: 0.9em;
		font-family: inherit; // use simple monospace if preferred
		padding: 2px 4px;
	}
`;

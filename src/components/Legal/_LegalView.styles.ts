import styled from '@emotion/styled';

import { color } from '../../theme/colors';
import { borderRadius, fontSize, space } from '../../theme/tokens';

export const BackButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-bottom: ${space('lg')};
`;

export const MarkdownWrapper = styled.article`
	color: ${color('text-primary')};
	font-size: ${fontSize('md')};
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
		margin-top: ${space('xl')};
		margin-bottom: ${space('md')};
	}

	h1 {
		font-size: ${fontSize('2xl')};
		margin-top: 0;
	}

	h2 {
		font-size: ${fontSize('xl')};
	}

	h3 {
		font-size: ${fontSize('lg')};
	}

	p {
		color: ${color('text-secondary')};
		margin-bottom: ${space('md')};
	}

	hr {
		border: none;
		border-top: 1px solid ${color('border')};
		margin: ${space('xl')} 0;
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
		margin-bottom: ${space('md')};
		padding-left: ${space('xl')};
	}

	li {
		margin-bottom: ${space('xs')};
	}

	code {
		background-color: ${color('bg')};
		border-radius: ${borderRadius('sm')};
		color: ${color('primary')};
		font-size: 0.9em;
		font-family: inherit; // use simple monospace if preferred
		padding: 2px 4px;
	}
`;

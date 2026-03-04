import * as S from './_Card.styles';
import type { CardProps } from './_Card.types';

export function Card({
	isHidden = false,
	isSelected = false,
	value,
	...props
}: CardProps) {
	return (
		<S.Card
			data-hidden={isHidden}
			data-selected={isSelected}
			{...props}
			// Ensure screen readers handle the hidden state
			aria-label={isHidden ? 'Vote submitted, hidden' : `Select ${value}`}
		>
			{/* If hidden, the CSS pseudo-element renders the checkmark. Text stays hidden. */}
			{value}
		</S.Card>
	);
}

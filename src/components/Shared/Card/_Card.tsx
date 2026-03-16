import { Icon } from '../Icon';
import * as S from './_Card.styles';
import type { ICard } from './_Card.types';

export function Card({
	isHidden = false,
	isSelected = false,
	value,
	...props
}: ICard) {
	return (
		<S.Card
			data-hidden={isHidden}
			data-selected={isSelected}
			{...props}
			// Ensure screen readers handle the hidden state
			aria-label={
				isHidden
					? 'Vote submitted, hidden'
					: `Select ${
							value === 'coffee'
								? 'coffee break'
								: value === '?'
									? 'unsure'
									: value === '½'
										? '0.5'
										: value
						}`
			}
		>
			{/* If hidden, the CSS pseudo-element renders the checkmark. Text stays hidden. */}
			{value === 'coffee' ? (
				<Icon name="coffee" />
			) : value === '?' ? (
				<Icon name="question_mark" />
			) : (
				value
			)}
		</S.Card>
	);
}

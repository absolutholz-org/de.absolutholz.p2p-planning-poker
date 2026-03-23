import { useTranslation } from 'react-i18next';

import { Icon } from '../Icon';
import * as S from './_Card.styles';
import type { ICard } from './_Card.types';

export function Card({
	isHidden = false,
	isSelected = false,
	value,
	...props
}: ICard) {
	const { t } = useTranslation();

	const ariaValue =
		value === 'coffee'
			? t('card.special.coffee')
			: value === '?'
				? t('card.special.unsure')
				: value === '½'
					? '0.5'
					: value;

	return (
		<S.Card
			data-hidden={isHidden}
			data-selected={isSelected}
			{...props}
			// Ensure screen readers handle the hidden state and toggle state
			aria-label={
				isHidden
					? t('card.status.hidden')
					: t('card.action.select', { value: ariaValue })
			}
			aria-pressed={isSelected}
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

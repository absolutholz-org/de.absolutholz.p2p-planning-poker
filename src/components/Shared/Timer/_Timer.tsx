import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../../context/RoomContext';
import { Icon } from '../Icon';
import * as S from './_Timer.styles';
import { type ITimerProps } from './_Timer.types';

export const Timer = ({ className }: ITimerProps) => {
	const { t } = useTranslation();
	const { pauseTimer, resetTimer, roomState, setTimer, startTimer } =
		useRoom();
	const timer = roomState?.timer;

	const [now, setNow] = useState(() => Date.now());
	const [inputMinutes, setInputMinutes] = useState<string>('5');

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (timer?.isRunning) {
			interval = setInterval(() => {
				setNow(Date.now());
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timer?.isRunning]);

	const getDisplayTime = () => {
		if (!timer) return 0;
		if (!timer.isRunning || !timer.startedAt) return timer.remainingTime;

		const startedAt = timer.startedAt || 0;
		const elapsed = Math.floor((now - startedAt) / 1000);
		const remaining = Math.max(0, timer.remainingTime - elapsed);

		return remaining;
	};

	const displayTime = getDisplayTime();

	useEffect(() => {
		if (timer?.isRunning && displayTime === 0) {
			pauseTimer();
		}
	}, [displayTime, timer?.isRunning, pauseTimer]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputMinutes(e.target.value);
	};

	const handleSetTimer = useCallback(() => {
		const mins = parseInt(inputMinutes, 10);
		if (!isNaN(mins) && mins > 0) {
			setTimer(mins * 60);
		}
	}, [inputMinutes, setTimer]);

	const incrementMinutes = () => {
		const mins = parseInt(inputMinutes, 10) || 0;
		setInputMinutes((mins + 1).toString());
	};

	const decrementMinutes = () => {
		const mins = parseInt(inputMinutes, 10) || 0;
		if (mins > 1) {
			setInputMinutes((mins - 1).toString());
		}
	};

	const isSetup = !timer;
	const isRunning = timer?.isRunning;
	const inputId = 'timer-minutes-input';

	const displayMins = isSetup
		? inputMinutes
		: Math.floor(displayTime / 60).toString();
	const displaySecs = isSetup
		? '00'
		: (displayTime % 60).toString().padStart(2, '0');

	return (
		<S.TimerContainer className={className}>
			<S.Segment>
				<S.IconButton
					aria-label={t('room.header.timer.aria.decrement')}
					aria-controls={inputId}
					onClick={decrementMinutes}
					disabled={!isSetup}
				>
					<Icon name="remove" />
				</S.IconButton>
			</S.Segment>

			<S.Segment $variant="input">
				<S.TimeDisplay
					role="timer"
					aria-live="polite"
					aria-atomic="true"
				>
					<S.Label htmlFor={inputId} className="sr-only">
						{t('room.header.timer.aria.input')}
					</S.Label>
					<S.TimerInput
						id={inputId}
						onChange={handleInputChange}
						type="number"
						min="1"
						max="99"
						value={displayMins}
						readOnly={!isSetup}
					/>
					<span aria-hidden="true">:</span>
					<span>{displaySecs}</span>
				</S.TimeDisplay>
			</S.Segment>

			<S.Segment>
				<S.IconButton
					aria-label={t('room.header.timer.aria.increment')}
					aria-controls={inputId}
					onClick={incrementMinutes}
					disabled={!isSetup}
				>
					<Icon name="add" />
				</S.IconButton>
			</S.Segment>

			{isSetup ? (
				<S.Segment $variant="action">
					<S.ControlButton
						onClick={handleSetTimer}
						aria-label={t('room.header.timer.start')}
					>
						<Icon name="play_arrow" />
						{t('room.header.timer.start')}
					</S.ControlButton>
				</S.Segment>
			) : (
				<>
					<S.Segment $variant="action">
						{isRunning ? (
							<S.ControlButton
								$color="var(--sys-color-warning)"
								aria-label={t('room.header.timer.aria.pause')}
								onClick={pauseTimer}
							>
								<Icon name="pause" />
								{t('room.header.timer.pause')}
							</S.ControlButton>
						) : (
							<S.ControlButton
								aria-label={t('room.header.timer.aria.resume')}
								onClick={startTimer}
							>
								<Icon name="play_arrow" />
								{t('room.header.timer.resume')}
							</S.ControlButton>
						)}
					</S.Segment>
					<S.Segment $variant="action">
						<S.ControlButton
							$color="var(--sys-color-danger)"
							aria-label={t('room.header.timer.aria.reset')}
							onClick={resetTimer}
						>
							<Icon name="refresh" />
							{t('room.header.timer.reset')}
						</S.ControlButton>
					</S.Segment>
				</>
			)}
		</S.TimerContainer>
	);
};

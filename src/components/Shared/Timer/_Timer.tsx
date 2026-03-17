import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import * as S from './_Timer.styles';

export const Timer = () => {
	const { t } = useTranslation();

	// Timer state
	const [duration, setDuration] = useState<number | null>(null);
	const [remainingTime, setRemainingTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [startedAt, setStartedAt] = useState<number | null>(null);

	// Ticking state
	const [now, setNow] = useState(() => Date.now());
	const [inputMinutes, setInputMinutes] = useState<string>('5');

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning) {
			interval = setInterval(() => {
				const currentTime = Date.now();
				setNow(currentTime);

				// Move the "time is up" check here to avoid cascading renders
				if (startedAt) {
					const elapsed = Math.floor(
						(currentTime - startedAt) / 1000,
					);
					if (remainingTime - elapsed <= 0) {
						setIsRunning(false);
						setStartedAt(null);
						setRemainingTime(0);
					}
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isRunning, remainingTime, startedAt]);

	const getDisplayTime = () => {
		if (duration === null) return 0;
		if (!isRunning || !startedAt) return remainingTime;

		// Use Math.max(0, ...) to prevent jumps if now is slightly behind startedAt
		const elapsed = Math.floor(Math.max(0, now - startedAt) / 1000);
		const remaining = Math.max(0, remainingTime - elapsed);

		return remaining;
	};

	const displayTime = getDisplayTime();
	const progress = duration ? (displayTime / duration) * 100 : 100;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputMinutes(e.target.value);
	};

	const handleSetTimer = useCallback(() => {
		const mins = parseInt(inputMinutes, 10);
		if (!isNaN(mins) && mins > 0) {
			const seconds = mins * 60;
			const currentTime = Date.now();
			setDuration(seconds);
			setRemainingTime(seconds);
			setIsRunning(true);
			setStartedAt(currentTime);
			setNow(currentTime); // Sync immediately
		}
	}, [inputMinutes]);

	const startTimer = useCallback(() => {
		if (duration !== null && !isRunning) {
			const currentTime = Date.now();
			setIsRunning(true);
			setStartedAt(currentTime);
			setNow(currentTime); // Sync immediately
		}
	}, [duration, isRunning]);

	const pauseTimer = useCallback(() => {
		if (isRunning && startedAt) {
			const elapsed = Math.floor((Date.now() - startedAt) / 1000);
			const remaining = Math.max(0, remainingTime - elapsed);
			setRemainingTime(remaining);
			setIsRunning(false);
			setStartedAt(null);
		}
	}, [isRunning, remainingTime, startedAt]);

	const resetTimer = useCallback(() => {
		setDuration(null);
		setRemainingTime(0);
		setIsRunning(false);
		setStartedAt(null);
	}, []);

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

	const isSetup = duration === null;
	const inputId = 'timer-minutes-input';

	const displayMins = isSetup
		? inputMinutes
		: Math.floor(displayTime / 60).toString();
	const displaySecs = isSetup
		? '00'
		: (displayTime % 60).toString().padStart(2, '0');

	return (
		<S.TimerContainer>
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

			<S.ProgressSegment
				style={
					{
						'--timer-progress': `${progress}%`,
					} as React.CSSProperties
				}
			>
				<S.TimeDisplay
					role="timer"
					aria-live="polite"
					aria-atomic="true"
				>
					<VisuallyHidden as="label" htmlFor={inputId}>
						{t('room.header.timer.aria.input')}
					</VisuallyHidden>
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
			</S.ProgressSegment>

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
				<S.ActionSegment>
					<S.ControlButton
						onClick={handleSetTimer}
						aria-label={t('room.header.timer.start')}
					>
						<Icon name="play_arrow" />
						{t('room.header.timer.start')}
					</S.ControlButton>
				</S.ActionSegment>
			) : (
				<>
					<S.ActionSegment>
						{isRunning ? (
							<S.PauseButton
								aria-label={t('room.header.timer.aria.pause')}
								onClick={pauseTimer}
							>
								<Icon name="pause" />
								{t('room.header.timer.pause')}
							</S.PauseButton>
						) : (
							<S.ControlButton
								aria-label={t('room.header.timer.aria.resume')}
								onClick={startTimer}
							>
								<Icon name="play_arrow" />
								{t('room.header.timer.resume')}
							</S.ControlButton>
						)}
					</S.ActionSegment>
					<S.ActionSegment>
						<S.ResetButton
							aria-label={t('room.header.timer.aria.reset')}
							onClick={resetTimer}
						>
							<Icon name="refresh" />
							{t('room.header.timer.reset')}
						</S.ResetButton>
					</S.ActionSegment>
				</>
			)}
		</S.TimerContainer>
	);
};

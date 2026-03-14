import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import {
	RoomContext,
	type RoomContextValue,
} from '../../../context/RoomContext';
import { type RoomState } from '../../../types/domain';
import { Timer } from './_Timer';
import type { ITimerProps } from './_Timer.types';

type TimerArgs = {
	timer: RoomState['timer'];
};

const InteractiveTimerWrapper = ({
	children,
	initialTimer,
}: {
	children: React.ReactNode;
	initialTimer: RoomState['timer'];
}) => {
	const [timer, setTimerState] = useState<RoomState['timer']>(initialTimer);

	const startTimer = useCallback(() => {
		if (timer) {
			setTimerState({
				...timer,
				isRunning: true,
				startedAt: Date.now(),
			});
		}
	}, [timer]);

	const pauseTimer = useCallback(() => {
		if (timer && timer.isRunning && timer.startedAt) {
			const elapsed = Math.floor((Date.now() - timer.startedAt) / 1000);
			const remaining = Math.max(0, timer.remainingTime - elapsed);
			setTimerState({
				...timer,
				isRunning: false,
				remainingTime: remaining,
				startedAt: null,
			});
		}
	}, [timer]);

	const resetTimer = useCallback(() => {
		setTimerState(null);
	}, []);

	const setTimer = useCallback((duration: number) => {
		setTimerState({
			duration,
			isRunning: false,
			remainingTime: duration,
			startedAt: null,
		});
	}, []);

	const mockContext: RoomContextValue = {
		castVote: () => {},
		connectionStatus: 'connected',
		error: null,
		initGuest: () => {},
		initHost: () => {},
		leaveRoom: () => {},
		localUserId: '1',
		pauseTimer,
		resetBoard: () => {},
		resetTimer,
		revealVotes: () => {},
		roomState: {
			isRevealed: false,
			roomId: '123',
			timer: timer || null,
			users: [],
		},
		setTimer,
		startTimer,
	};

	return (
		<RoomContext.Provider value={mockContext}>
			{children}
		</RoomContext.Provider>
	);
};

const meta: Meta<ITimerProps & TimerArgs> = {
	component: Timer,
	decorators: [
		(Story, context) => {
			const { timer } = context.args as TimerArgs;
			return (
				<InteractiveTimerWrapper initialTimer={timer}>
					<div style={{ padding: '2rem' }}>
						<Story />
					</div>
				</InteractiveTimerWrapper>
			);
		},
	],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/Timer',
} satisfies Meta<typeof Timer & TimerArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
	args: {
		timer: null,
	},
};

export const Running: Story = {
	args: {
		timer: {
			duration: 300,
			isRunning: true,
			remainingTime: 300,
			startedAt: Date.now(),
		},
	},
};

export const Paused: Story = {
	args: {
		timer: {
			duration: 300,
			isRunning: false,
			remainingTime: 150,
			startedAt: null,
		},
	},
};

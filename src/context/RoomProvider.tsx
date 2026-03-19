import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGuestSession } from '../hooks/useGuestSession';
import { useHostSession } from '../hooks/useHostSession';
import type { PeerMessage, VoteValue } from '../types/domain';
import { RoomContext } from './RoomContext';
import type { RoomProviderProps } from './RoomContext.types';

export function RoomProvider({
	children,
	name,
	role,
	roomId,
}: RoomProviderProps) {
	// Initialize both hooks, but the hooks handle their own internal "idle" state
	// based on whether the roomId/name provided is valid/empty.
	const host = useHostSession(
		role === 'host' ? name : '',
		roomId,
		role === 'host',
	);
	const guest = useGuestSession(
		role === 'guest' ? roomId : '',
		role === 'guest' ? name : '',
		role === 'guest',
	);
	const navigate = useNavigate();

	const activeSession = role === 'host' ? host : guest;

	const value = useMemo(
		() => ({
			castVote: (vote: VoteValue) => {
				if (role === 'host') {
					host.updateState((prev) => ({
						...prev,
						users: prev.users.map((u) =>
							u.isHost ? { ...u, vote } : u,
						),
					}));
				} else {
					guest.sendMessage({
						payload: { vote },
						type: 'SUBMIT_VOTE',
					});
				}
			},
			connectionStatus: activeSession.connectionStatus,
			error: activeSession.error,
			isHost: role === 'host',

			leaveRoom: () => {
				// Clear the keys that the RoomGuard watches
				localStorage.removeItem('userName');
				localStorage.removeItem('role');
				// Navigate home to trigger the RoomGuard unmount
				navigate('/');
			},

			roomState: activeSession.roomState,
			sendAction: (message: PeerMessage) => {
				if (role === 'host') {
					host.updateState((prev) => {
						const newState = { ...prev };
						switch (message.type) {
							case 'TOGGLE_REVEAL':
								newState.isRevealed = true;
								break;
							case 'RESET_SESSION':
								newState.isRevealed = false;
								newState.users = newState.users.map((u) => ({
									...u,
									vote: null,
								}));
								break;
							case 'TIMER_SET':
								newState.timer = {
									duration: message.payload.duration,
									isRunning: false,
									remainingTime: message.payload.duration,
									startedAt: null,
								};
								break;
							case 'TIMER_START':
								if (newState.timer) {
									newState.timer = {
										...newState.timer,
										isRunning: true,
										startedAt: Date.now(),
									};
								}
								break;
							case 'TIMER_PAUSE':
								if (
									newState.timer &&
									newState.timer.isRunning
								) {
									const elapsed = newState.timer.startedAt
										? Math.floor(
												(Date.now() -
													newState.timer.startedAt) /
													1000,
											)
										: 0;
									newState.timer = {
										...newState.timer,
										isRunning: false,
										remainingTime: Math.max(
											0,
											newState.timer.remainingTime -
												elapsed,
										),
										startedAt: null,
									};
								}
								break;
							case 'TIMER_RESET':
								if (newState.timer) {
									newState.timer = {
										...newState.timer,
										isRunning: false,
										remainingTime: newState.timer.duration,
										startedAt: null,
									};
								}
								break;
						}
						return newState;
					});
				} else {
					guest.sendMessage(message);
				}
			},
		}),
		[activeSession, host, guest, navigate, role],
	);

	return (
		<RoomContext.Provider value={value}>{children}</RoomContext.Provider>
	);
}

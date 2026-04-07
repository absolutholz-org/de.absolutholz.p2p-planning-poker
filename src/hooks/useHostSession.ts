import { type DataConnection, Peer } from 'peerjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { PeerMessage, RoomState } from '../types/domain';

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

export interface UseHostSessionReturn {
	connectionStatus: ConnectionStatus;
	error: string | null;
	myPeerId: string | null;
	roomState: RoomState | null;
	updateState: (updater: (prev: RoomState) => RoomState) => void;
}

export function useHostSession(
	name: string,
	roomId: string,
	enabled: boolean = true,
): UseHostSessionReturn {
	const [roomState, setRoomState] = useState<RoomState | null>(null);
	const [connectionStatus, setConnectionStatus] =
		useState<ConnectionStatus>('idle');
	const [error, setError] = useState<string | null>(null);

	const peerRef = useRef<Peer | null>(null);
	const connectionsRef = useRef<Map<string, DataConnection>>(new Map());

	const updateState = useCallback(
		(updater: (prev: RoomState) => RoomState) => {
			setRoomState((prevState) => {
				if (!prevState) return prevState;
				const newState = updater(prevState);
				if (newState !== prevState) {
					connectionsRef.current.forEach((c) => {
						if (c.open) {
							c.send({
								payload: { state: newState },
								type: 'SYNC_STATE',
							} satisfies PeerMessage);
						}
					});
				}
				return newState;
			});
		},
		[],
	);

	useEffect(() => {
		if (!enabled || !roomId) return;

		const iceServers: RTCIceServer[] = [
			{
				urls:
					import.meta.env.VITE_METERED_PROJECT_URL ||
					'stun:stun.relay.metered.ca:80',
			},
		];

		if (import.meta.env.VITE_METERED_USERNAME) {
			iceServers.push({
				credential: import.meta.env.VITE_METERED_CREDENTIAL,
				urls: [
					import.meta.env.VITE_METERED_TURN_URL ||
						'turn:standard.relay.metered.ca:80?transport=tcp',
					import.meta.env.VITE_METERED_TURN_URL_TLS ||
						'turns:standard.relay.metered.ca:443?transport=tcp',
				],
				username: import.meta.env.VITE_METERED_USERNAME,
			});
		}

		console.log(
			'[WebRTC] ICE Config initialized. TURN:',
			!!import.meta.env.VITE_METERED_USERNAME,
		);

		const peer = new Peer(roomId, {
			config: {
				iceServers,
				iceTransportPolicy: 'all',
			},
			debug: 3,
		});

		peer.on('error', (err) => {
			if (err.type === 'network') {
				console.error(
					'[WebRTC] Network Error - Check TURN credentials/reachability',
				);
			}
		});

		peerRef.current = peer;

		setTimeout(() => setConnectionStatus('connecting'), 0);

		peer.on('open', (id: string) => {
			console.log(`[Host] Peer open with ID: ${id}`);
			setConnectionStatus('connected');

			setRoomState({
				allowRevoteAfterReveal: false,
				isRevealed: false,
				roomId: id,
				timer: null,
				users: [
					{
						id,
						isConnected: true,
						isHost: true,
						name,
						vote: null,
					},
				],
			});
		});

		peer.on('connection', (conn: DataConnection) => {
			console.log(`[Host] Incoming connection from: ${conn.peer}`);
			connectionsRef.current.set(conn.peer, conn);

			conn.on('data', (data: unknown) => {
				const msg = data as PeerMessage;

				setRoomState((prevState) => {
					if (!prevState) return prevState;
					const newState = { ...prevState };

					switch (msg.type) {
						case 'JOIN_ROOM':
							if (
								!newState.users.some((u) => u.id === conn.peer)
							) {
								newState.users = [
									...newState.users,
									{
										id: conn.peer,
										isConnected: true,
										isHost: false,
										name: msg.payload.name,
										vote: null,
									},
								];
							} else {
								newState.users = newState.users.map((u) =>
									u.id === conn.peer
										? {
												...u,
												isConnected: true,
												name: msg.payload.name,
											}
										: u,
								);
							}
							break;
						case 'SUBMIT_VOTE':
							newState.users = newState.users.map((u) =>
								u.id === conn.peer
									? { ...u, vote: msg.payload.vote }
									: u,
							);
							break;
						case 'TOGGLE_REVEAL':
							newState.isRevealed = true;
							break;
						case 'TOGGLE_ALLOW_REVOTE':
							newState.allowRevoteAfterReveal =
								!newState.allowRevoteAfterReveal;
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
								duration: msg.payload.duration,
								isRunning: false,
								remainingTime: msg.payload.duration,
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
							if (newState.timer && newState.timer.isRunning) {
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
										newState.timer.remainingTime - elapsed,
									),
									startedAt: null,
								};
							}
							break;
						case 'CHANGE_NAME':
							newState.users = newState.users.map((u) =>
								u.id === conn.peer
									? { ...u, name: msg.payload.name }
									: u,
							);
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

					// Broadcast sync to all peers
					connectionsRef.current.forEach((c) => {
						if (c.open) {
							c.send({
								payload: { state: newState },
								type: 'SYNC_STATE',
							} satisfies PeerMessage);
						}
					});

					return newState;
				});
			});

			conn.on('close', () => {
				console.log(`[Host] Connection closed by: ${conn.peer}`);
				connectionsRef.current.delete(conn.peer);
				setRoomState((prev) => {
					if (!prev) return prev;
					const newState = {
						...prev,
						users: prev.users.map((u) =>
							u.id === conn.peer
								? { ...u, isConnected: false }
								: u,
						),
					};

					// Broadcast sync so remaining peers know someone disconnected
					connectionsRef.current.forEach((c) => {
						if (c.open) {
							c.send({
								payload: { state: newState },
								type: 'SYNC_STATE',
							} satisfies PeerMessage);
						}
					});

					return newState;
				});
			});

			conn.on('error', (err: Error) => {
				console.error(
					`[Host] Connection error with ${conn.peer}:`,
					err,
				);
			});
		});

		peer.on('error', (err: Error & { type?: string }) => {
			console.error('[Host] Peer interaction error:', err);
			if (err.type === 'unavailable-id') {
				setError('Room already has an active host.');
			} else {
				setError(err.message);
			}
			setConnectionStatus('error');
		});

		return () => {
			console.log('[Host] Destroying peer instance on unmount');
			peer.destroy();
		};
	}, [name, enabled, roomId]);

	useEffect(() => {
		if (!enabled) return;

		const interval = setInterval(() => {
			connectionsRef.current.forEach((conn) => {
				if (conn.open) {
					conn.send({ type: 'HEARTBEAT' });
				}
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [enabled]);

	return {
		connectionStatus,
		error,
		myPeerId: roomId,
		roomState,
		updateState,
	};
}

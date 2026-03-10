import { type DataConnection, Peer } from 'peerjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { PeerMessage, RoomState, VoteValue } from '../types/domain';

const MAX_PEERS = 12;

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

// Dynamically fetch TURN credentials from Metered.ca
const fetchIceServers = async () => {
	const fallbackRelay = [
		{
			credential: 'openrelayproject',
			urls: [
				'turn:openrelay.metered.ca:443?transport=tcp',
				'turn:openrelay.metered.ca:80',
			],
			username: 'openrelayproject',
		},
	];

	try {
		const response = await fetch(
			'https://planningpoker-absolutholz.metered.live/api/v1/turn/credentials?apiKey=7de25f8ab64843c06c55df688bbb4bb68c0b',
		);

		if (!response.ok) {
			console.warn(
				`Metered API fetch failed (${response.status}). Falling back to static openrelay project credentials.`,
			);
			return fallbackRelay;
		}

		const iceServers = await response.json();
		return Array.isArray(iceServers) ? iceServers : fallbackRelay;
	} catch (error) {
		console.error(
			'Failed to fetch TURN credentials, using static fallback:',
			error,
		);
		return fallbackRelay;
	}
};

const getPeerConfig = async () => {
	const turnServers = await fetchIceServers();
	return {
		config: {
			iceServers: [
				{ urls: 'stun:stun.l.google.com:19302' },
				{ urls: 'stun:stun1.l.google.com:19302' },
				{ urls: 'stun:stun2.l.google.com:19302' },
				...turnServers,
			],
		},
		debug: 3, // MAXIMUM log verbosity for diagnostic tracking
	};
};

interface UsePeerSessionReturn {
	broadcastState: (state: RoomState) => void;
	castVote: (vote: VoteValue) => void;
	connectionStatus: ConnectionStatus;
	error: null | string;
	initGuest: (roomId: string, name: string) => void;
	initHost: (
		name: string,
		requestedPeerId?: string,
		restoredState?: RoomState,
	) => void;
	leaveRoom: (clearStorage?: boolean) => void;
	localUserId: null | string;
	resetBoard: () => void;
	revealVotes: () => void;
	roomState: RoomState | null;
}

export function usePeerSession(): UsePeerSessionReturn {
	const [roomState, setRoomState] = useState<RoomState | null>(null);
	const [error, setError] = useState<null | string>(null);
	const [localUserId, setLocalUserId] = useState<null | string>(null);
	const [connectionStatus, setConnectionStatus] =
		useState<ConnectionStatus>('idle');

	const peerRef = useRef<Peer | null>(null);
	const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
	const isHostRef = useRef<boolean>(false);
	const connectionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

	// ---------------------------------------------------------
	// Core Dispatchers
	// ---------------------------------------------------------

	const broadcastState = useCallback((state: RoomState) => {
		if (!isHostRef.current) return;
		setRoomState(state); // Update local Host view

		connectionsRef.current.forEach((conn) => {
			if (conn.open) {
				conn.send({
					payload: { state },
					type: 'SYNC_STATE',
				} satisfies PeerMessage);
			}
		});

		// Persist state to session storage to survive page reloads
		sessionStorage.setItem('p2p_room_state', JSON.stringify(state));
	}, []);

	const sendToHost = useCallback((message: PeerMessage) => {
		if (isHostRef.current) return;
		// Guests only have one connection (the Host), usually stored by the Host's ID
		const hostConn = Array.from(connectionsRef.current.values())[0];
		if (hostConn && hostConn.open) {
			hostConn.send(message);
		} else {
			setError('Connection to host lost.');
		}
	}, []);

	// ---------------------------------------------------------
	// Event Handlers
	// ---------------------------------------------------------

	const handleMessage = useCallback(
		(message: unknown, senderId: string) => {
			const msg = message as PeerMessage;

			setRoomState((prevState) => {
				if (isHostRef.current) {
					if (!prevState) return prevState;

					// HOST Logic: Act on Guest messages and broadcast
					const newState = { ...prevState };

					switch (msg.type) {
						case 'JOIN_ROOM': {
							// Guard against duplicate UI keys caused by WebRTC connection race conditions
							if (
								newState.users.some(
									(u) => u.id === msg.payload.peerId,
								)
							) {
								newState.users = newState.users.map((u) =>
									u.id === msg.payload.peerId
										? {
												...u,
												isConnected: true,
												name: msg.payload.name,
											}
										: u,
								);
								break;
							}

							if (newState.users.length >= MAX_PEERS) {
								// Ignore if full, could send rejection here later
								return prevState;
							}
							newState.users = [
								...newState.users,
								{
									id: msg.payload.peerId,
									isConnected: true,
									isHost: false,
									name: msg.payload.name,
									vote: null,
								},
							];
							break;
						}

						case 'SUBMIT_VOTE':
							newState.users = newState.users.map((u) =>
								u.id === senderId
									? { ...u, vote: msg.payload.vote }
									: u,
							);
							break;

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
					}

					// Push active sync purely outside the React evaluation cycle to prevent StrictMode side-effect locking
					setTimeout(() => broadcastState(newState), 0);
					return newState;
				} else {
					// GUEST Logic: Only listen to SYNC_STATE
					if (msg.type === 'SYNC_STATE') {
						sessionStorage.setItem(
							'p2p_room_state',
							JSON.stringify(msg.payload.state),
						);
						return msg.payload.state;
					}
					return prevState;
				}
			});
		},
		[broadcastState],
	);

	const setupConnectionListeners = useCallback(
		(conn: DataConnection) => {
			conn.on('data', (data) => {
				handleMessage(data, conn.peer);
			});

			conn.on('close', () => {
				connectionsRef.current.delete(conn.peer);

				if (isHostRef.current) {
					setRoomState((prev) => {
						if (!prev) return prev;
						const updatedUsers = prev.users.map((u) =>
							u.id === conn.peer
								? { ...u, isConnected: false }
								: u,
						);
						const newState = { ...prev, users: updatedUsers };
						broadcastState(newState);
						return newState;
					});
				} else {
					setError('Host disconnected. Session ended.');
					setRoomState(null);
				}
			});

			conn.on('error', (err) => {
				console.error('Connection error:', err);
			});
		},
		[handleMessage, broadcastState],
	);

	const setupPeerSignalingReconnection = useCallback((peer: Peer) => {
		peer.on('disconnected', () => {
			console.warn('Disconnected from signaling server. Reconnecting...');
			if (!peer.destroyed) {
				peer.reconnect();
			}
		});
	}, []);

	// ---------------------------------------------------------
	// Initializers
	// ---------------------------------------------------------

	const initHost = useCallback(
		(name: string, requestedPeerId?: string, restoredState?: RoomState) => {
			setConnectionStatus('connecting');
			setError(null);
			isHostRef.current = true;

			getPeerConfig().then((peerConfig) => {
				const peer = requestedPeerId
					? new Peer(requestedPeerId, peerConfig)
					: new Peer(peerConfig);
				peerRef.current = peer;
				setupPeerSignalingReconnection(peer);

				peer.on('open', (id) => {
					setLocalUserId(id);
					// Host initializes the master state
					const initialState: RoomState = restoredState || {
						isRevealed: false,
						roomId: id,
						users: [
							{
								id,
								isConnected: true,
								isHost: true,
								name,
								vote: null,
							},
						],
					};

					setRoomState(initialState);
					sessionStorage.setItem('p2p_role', 'host');
					sessionStorage.setItem('p2p_room_id', id);
					sessionStorage.setItem('p2p_name', name);
					sessionStorage.setItem(
						'p2p_room_state',
						JSON.stringify(initialState),
					);
					setConnectionStatus('connected');
				});

				peer.on('connection', (conn) => {
					console.log(
						`[Host] Incoming connection from ${conn.peer}...`,
					);
					if (connectionsRef.current.size >= MAX_PEERS - 1) {
						// -1 because Host is 1 peer
						console.warn(
							'[Host] Room is full. Rejecting connection.',
						);
						setTimeout(() => conn.close(), 500);
						return;
					}
					connectionsRef.current.set(conn.peer, conn);

					conn.on('open', () => {
						console.log(
							`[Host] Connection established and open with ${conn.peer}`,
						);
						setupConnectionListeners(conn);
						// We sync state immediately so the new guest gets the board,
						// but they haven't "Joined" the roster yet. They will send JOIN_ROOM.
					});
				});

				peer.on('error', (err) => {
					console.error('[Host] PeerJS Error:', err.type, err);
					setError(`[${err.type}] ${err.message}`);
				});
			});
		},
		[setupConnectionListeners, setupPeerSignalingReconnection],
	);

	const initGuest = useCallback(
		(roomId: string, name: string) => {
			setConnectionStatus('connecting');
			setError(null);
			isHostRef.current = false;

			getPeerConfig().then((peerConfig) => {
				const peer = new Peer(peerConfig);
				peerRef.current = peer;
				setupPeerSignalingReconnection(peer);

				peer.on('open', (id) => {
					setLocalUserId(id);

					// Ensure reliable data channel for better cross-device connection
					console.log(`[Guest] Dialing host ${roomId}...`);
					const conn = peer.connect(roomId, { reliable: true });
					connectionsRef.current.set(roomId, conn);

					// Probe the underlying WebRTC state if possible
					if (conn.peerConnection) {
						conn.peerConnection.addEventListener(
							'iceconnectionstatechange',
							() => {
								console.log(
									`[Guest] ICE State shifted to: ${conn.peerConnection.iceConnectionState}`,
								);
							},
						);
					}

					sessionStorage.setItem('p2p_role', 'guest');
					sessionStorage.setItem('p2p_room_id', roomId);
					sessionStorage.setItem('p2p_name', name);

					// Timeout if WebRTC gets stuck connecting
					connectionTimeoutRef.current = setTimeout(() => {
						console.error(
							'[Guest] Hard timeout hit after 15s waiting for STUN/TURN.',
						);
						// Determine if the ICE connection even made progress
						const iceState =
							conn.peerConnection?.iceConnectionState ||
							'unknown';

						setError(
							`Connection timeout (ICE state: ${iceState}). Strict firewall or symmetric NAT active.`,
						);
						setConnectionStatus('error');
						peer.destroy();
					}, 15000);

					conn.on('open', () => {
						console.log(
							`[Guest] Connection OPEN with host ${roomId}!`,
						);
						clearTimeout(connectionTimeoutRef.current);
						setConnectionStatus('connected');
						setupConnectionListeners(conn);
						// Immediately announce presence to Host
						conn.send({
							payload: { name, peerId: id },
							type: 'JOIN_ROOM',
						} satisfies PeerMessage);
					});
				});

				peer.on('error', (err) => {
					console.error('[Guest] PeerJS Error:', err.type, err);
					clearTimeout(connectionTimeoutRef.current);
					setError(`[${err.type}] ${err.message}`);
					setConnectionStatus('error');
				});
			});
		},
		[setupConnectionListeners, setupPeerSignalingReconnection],
	);

	// ---------------------------------------------------------
	// Public Actions
	// ---------------------------------------------------------

	const castVote = useCallback(
		(vote: VoteValue) => {
			if (isHostRef.current) {
				setRoomState((prev) => {
					if (!prev) return prev;
					const updatedUsers = prev.users.map((u) =>
						u.id === peerRef.current?.id ? { ...u, vote } : u,
					);
					const newState = { ...prev, users: updatedUsers };
					broadcastState(newState);
					return newState;
				});
			} else {
				sendToHost({ payload: { vote }, type: 'SUBMIT_VOTE' });
			}
		},
		[sendToHost, broadcastState],
	);

	const revealVotes = useCallback(() => {
		if (isHostRef.current) {
			setRoomState((prev) => {
				if (!prev) return prev;
				const newState = { ...prev, isRevealed: true };
				broadcastState(newState);
				return newState;
			});
		} else {
			sendToHost({ payload: undefined, type: 'TOGGLE_REVEAL' });
		}
	}, [sendToHost, broadcastState]);

	const resetBoard = useCallback(() => {
		if (isHostRef.current) {
			setRoomState((prev) => {
				if (!prev) return prev;
				const clearedUsers = prev.users.map((u) => ({
					...u,
					vote: null,
				}));
				const newState = {
					...prev,
					isRevealed: false,
					users: clearedUsers,
				};
				broadcastState(newState);
				return newState;
			});
		} else {
			sendToHost({ payload: undefined, type: 'RESET_SESSION' });
		}
	}, [sendToHost, broadcastState]);

	const leaveRoom = useCallback((clearStorage: boolean = true) => {
		clearTimeout(connectionTimeoutRef.current);
		connectionsRef.current.forEach((conn) => conn.close());
		connectionsRef.current.clear();
		peerRef.current?.destroy();
		setRoomState(null);
		setError(null);
		setLocalUserId(null);
		setConnectionStatus('idle');
		isHostRef.current = false;

		if (clearStorage) {
			sessionStorage.removeItem('p2p_role');
			sessionStorage.removeItem('p2p_room_id');
			sessionStorage.removeItem('p2p_name');
			sessionStorage.removeItem('p2p_room_state');
		}
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => leaveRoom(false);
	}, [leaveRoom]);

	return {
		broadcastState,
		castVote,
		connectionStatus,
		error,
		initGuest,
		initHost,
		leaveRoom,
		localUserId,
		resetBoard,
		revealVotes,
		roomState,
	};
}

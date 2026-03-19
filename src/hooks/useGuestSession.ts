import { type DataConnection, Peer } from 'peerjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { PeerMessage, RoomState } from '../types/domain';

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

export interface UseGuestSessionReturn {
	connectionStatus: ConnectionStatus;
	error: string | null;
	roomState: RoomState | null;
	sendMessage: (message: PeerMessage) => void;
}

export function useGuestSession(
	roomId: string,
	name: string,
	enabled: boolean = true,
): UseGuestSessionReturn {
	const [roomState, setRoomState] = useState<RoomState | null>(null);
	const [connectionStatus, setConnectionStatus] =
		useState<ConnectionStatus>('idle');
	const [error, setError] = useState<string | null>(null);

	const peerRef = useRef<Peer | null>(null);
	const connRef = useRef<DataConnection | null>(null);
	const severanceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

	const sendMessage = useCallback((message: PeerMessage) => {
		if (connRef.current && connRef.current.open) {
			connRef.current.send(message);
		}
	}, []);

	const resetSeveranceTimer = () => {
		if (severanceTimerRef.current) {
			clearTimeout(severanceTimerRef.current);
		}
		severanceTimerRef.current = setTimeout(() => {
			console.error(
				'[Guest] Severance package: 15 seconds passed without host message. Terminating.',
			);
			if (peerRef.current && !peerRef.current.destroyed) {
				peerRef.current.destroy();
			}
			setError('Connection to host timed out. Lost heartbeat.');
			setConnectionStatus('error');
		}, 15000);
	};

	useEffect(() => {
		if (!enabled) return;

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

		const peer = new Peer({
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
			console.log(
				`[Guest] Peer open with ID: ${id}. Dialing host: ${roomId}`,
			);

			// RACE CONDITION FIX: connect() MUST only be executed inside peer.on('open') callback
			const conn: DataConnection = peer.connect(roomId, {
				reliable: true,
			});
			connRef.current = conn;

			conn.on('open', () => {
				console.log(
					`[Guest] Connection to host ${roomId} established.`,
				);
				setConnectionStatus('connected');

				conn.send({
					payload: { name, peerId: id },
					type: 'JOIN_ROOM',
				} satisfies PeerMessage);

				// Initialize the 15-second severance timer upon successful connection
				resetSeveranceTimer();
			});

			conn.on('data', (data: unknown) => {
				const msg = data as PeerMessage | { type: 'HEARTBEAT' };

				if (msg.type === 'HEARTBEAT' || msg.type === 'SYNC_STATE') {
					resetSeveranceTimer();
				}

				if (
					msg.type === 'SYNC_STATE' &&
					msg.payload &&
					'state' in msg.payload
				) {
					setRoomState(msg.payload.state);
				}
			});

			conn.on('close', () => {
				console.log('[Guest] Connection closed by host.');
				setConnectionStatus('error');
				setError('Connection closed by host.');
				if (severanceTimerRef.current)
					clearTimeout(severanceTimerRef.current);
			});

			conn.on('error', (err: Error) => {
				console.error('[Guest] Connection error:', err);
			});
		});

		peer.on('error', (err: Error) => {
			console.error('[Guest] Peer error:', err);
			setError(err.message);
			setConnectionStatus('error');
		});

		return () => {
			console.log('[Guest] Destroying peer instance on unmount');
			if (severanceTimerRef.current)
				clearTimeout(severanceTimerRef.current);
			peer.destroy();
		};
	}, [roomId, name, enabled]);

	return { connectionStatus, error, roomState, sendMessage };
}

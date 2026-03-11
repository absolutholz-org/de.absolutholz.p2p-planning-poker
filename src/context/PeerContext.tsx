/* eslint-disable react-refresh/only-export-components */
import { Peer } from 'peerjs';
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

interface PeerContextValue {
	error: null | string;
	peer: null | Peer;
	peerId: null | string;
}

const PeerContext = createContext<PeerContextValue | undefined>(undefined);

export function PeerProvider({ children }: { children: ReactNode }) {
	const [peer, setPeer] = useState<null | Peer>(null);
	const [peerId, setPeerId] = useState<null | string>(null);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		let isMounted = true;

		const initPeer = (idToUse?: string) => {
			const config = {
				config: {
					iceServers: [
						{
							urls: import.meta.env.VITE_METERED_PROJECT_URL,
						},
						{
							credential: import.meta.env.VITE_METERED_CREDENTIAL,
							urls: [
								import.meta.env.VITE_METERED_TURN_URL,
								import.meta.env.VITE_METERED_TURN_URL_TLS,
							],
							username: import.meta.env.VITE_METERED_USERNAME,
						},
					],
				},
				debug: 3,
			};

			const newPeer = idToUse
				? new Peer(idToUse, config)
				: new Peer(config);

			newPeer.on('open', (id) => {
				if (!isMounted) return;
				setPeerId(id);
				setError(null);
				sessionStorage.setItem('p2p_peer_id', id);
				setPeer(newPeer);
			});

			newPeer.on('error', (err) => {
				if (!isMounted) return;
				console.error('[PeerContext] PeerJS Error:', err.type, err);

				if (err.type === 'unavailable-id' && idToUse) {
					console.warn(
						'[PeerContext] ID unavailable, retrying with fresh ID...',
					);
					sessionStorage.removeItem('p2p_peer_id');
					newPeer.destroy();
					initPeer();
					return;
				}

				setError(`[${err.type}] ${err.message}`);
			});

			newPeer.on('disconnected', () => {
				if (!isMounted) return;
				console.warn(
					'[PeerContext] Disconnected from signaling server.',
				);
				if (!newPeer.destroyed) {
					newPeer.reconnect();
				}
			});

			// Heartbeat to keep connection alive on PeerJS Cloud
			const heartbeat = setInterval(() => {
				if (
					newPeer.open &&
					!newPeer.disconnected &&
					!newPeer.destroyed
				) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(newPeer as any).socket?.send({ type: 'HEARTBEAT' });
				}
			}, 15000);

			return () => {
				clearInterval(heartbeat);
				newPeer.destroy();
			};
		};

		const storedPeerId = sessionStorage.getItem('p2p_peer_id');
		const cleanup = initPeer(storedPeerId || undefined);

		return () => {
			isMounted = false;
			cleanup?.();
		};
	}, []);

	return (
		<PeerContext.Provider value={{ error, peer, peerId }}>
			{children}
		</PeerContext.Provider>
	);
}

export function usePeer() {
	const context = useContext(PeerContext);
	if (context === undefined) {
		throw new Error('usePeer must be used within a PeerProvider');
	}
	return context;
}

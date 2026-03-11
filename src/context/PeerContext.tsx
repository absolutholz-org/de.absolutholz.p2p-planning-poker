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
		const storedPeerId = sessionStorage.getItem('p2p_peer_id');

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
				sdpSemantics: 'unified-plan',
			},
			debug: 3,
		};

		const newPeer = storedPeerId
			? new Peer(storedPeerId, config)
			: new Peer(config);

		newPeer.on('open', (id) => {
			setPeerId(id);
			setError(null);
			sessionStorage.setItem('p2p_peer_id', id);
		});

		newPeer.on('error', (err) => {
			console.error('[PeerContext] PeerJS Error:', err.type, err);
			setError(`[${err.type}] ${err.message}`);
		});

		newPeer.on('disconnected', () => {
			console.warn('[PeerContext] Disconnected from signaling server.');
			newPeer.reconnect();
		});

		// Use a slight delay to avoid "setState synchronously within an effect" warning in some React modes
		// although for PeerJS instance it's usually fine, it helps with strict mode consistency.
		const timeoutId = setTimeout(() => setPeer(newPeer), 0);

		return () => {
			clearTimeout(timeoutId);
			newPeer.destroy();
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

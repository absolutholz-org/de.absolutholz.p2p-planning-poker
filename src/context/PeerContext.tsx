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
	addLog: (msg: string) => void;
	error: null | string;
	logs: string[];
	peer: null | Peer;
	peerId: null | string;
}

const PeerContext = createContext<PeerContextValue | undefined>(undefined);

export function PeerProvider({ children }: { children: ReactNode }) {
	const [peer, setPeer] = useState<null | Peer>(null);
	const [peerId, setPeerId] = useState<null | string>(null);
	const [error, setError] = useState<null | string>(null);
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = (msg: string) => {
		console.log(`[PeerContext] ${msg}`);
		setLogs((prev) => [
			...prev.slice(-49),
			`${new Date().toLocaleTimeString()}: ${msg}`,
		]);
	};

	useEffect(() => {
		let isMounted = true;

		const initPeer = (idToUse?: string) => {
			addLog(`Initializing Peer (ID: ${idToUse || 'new'})`);

			const stunUrls = [
				'stun:stun.1und1.de:3478',
				'stun:stun.hosteurope.de:3478',
				import.meta.env.VITE_METERED_PROJECT_URL,
			].filter(Boolean);
			const turnUrls = [
				import.meta.env.VITE_METERED_TURN_URL,
				import.meta.env.VITE_METERED_TURN_URL_TLS,
			].filter(Boolean);

			const iceServers = [];

			if (stunUrls.length > 0) {
				iceServers.push({ urls: stunUrls });
			}

			if (turnUrls.length > 0) {
				iceServers.push({
					credential: import.meta.env.VITE_METERED_CREDENTIAL,
					urls: turnUrls,
					username: import.meta.env.VITE_METERED_USERNAME,
				});
			}

			const config = {
				config: {
					iceServers,
				},
				debug: 3,
			};

			const newPeer = idToUse
				? new Peer(idToUse, config)
				: new Peer(config);

			newPeer.on('open', (id) => {
				if (!isMounted) return;
				addLog(`Peer open with ID: ${id}`);
				setPeerId(id);
				setError(null);
				sessionStorage.setItem('p2p_peer_id', id);
				setPeer(newPeer);
			});

			newPeer.on('connection', (conn) => {
				addLog(`Incoming connection from: ${conn.peer}`);
			});

			newPeer.on('error', (err) => {
				if (!isMounted) return;
				addLog(`Peer Error: ${err.type} - ${err.message}`);

				if (err.type === 'unavailable-id' && idToUse) {
					addLog('ID unavailable, retrying with fresh ID...');
					sessionStorage.removeItem('p2p_peer_id');
					newPeer.destroy();
					setTimeout(() => initPeer(), 500); // Slight delay
					return;
				}

				setError(`[${err.type}] ${err.message}`);
			});

			newPeer.on('disconnected', () => {
				if (!isMounted) return;
				addLog('Disconnected from signaling server.');
				if (!newPeer.destroyed) {
					addLog('Attempting to reconnect...');
					newPeer.reconnect();
				}
			});

			newPeer.on('close', () => {
				addLog('Peer instance closed.');
			});

			return () => {
				addLog('Destroying Peer instance.');
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
		<PeerContext.Provider value={{ addLog, error, logs, peer, peerId }}>
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

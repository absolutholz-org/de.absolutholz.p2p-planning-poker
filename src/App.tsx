import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { PeerProvider } from './context/PeerContext';
import { RoomProvider, useRoom } from './context/RoomContext';
import { Lobby } from './screens/Lobby/Lobby';
import { globalStyles } from './theme/GlobalStyles';

// Lazy load non-critical screens
const VotingRoom = lazy(() =>
	import('./screens/VotingRoom/VotingRoom').then((module) => ({
		default: module.VotingRoom,
	})),
);
const MarkdownScreen = lazy(() =>
	import('./screens/MarkdownScreen/MarkdownScreen').then((module) => ({
		default: module.MarkdownScreen,
	})),
);

// Disable standard Emotion vendor prefixes because modern browsers don't need them
const emotionCache = createCache({
	key: 'css',
	stylisPlugins: [],
});

function AppContent() {
	const { roomState } = useRoom();
	const navigate = useNavigate();

	useEffect(() => {
		// Only redirect if we are on a room-like path but with a mismatched ID
		// The Lobby handles its own navigation after joining/creating
		const currentPath = window.location.pathname;
		if (roomState?.roomId && currentPath.startsWith('/room/')) {
			if (currentPath !== `/room/${roomState.roomId}`) {
				navigate(`/room/${roomState.roomId}`, { replace: true });
			}
		}
	}, [roomState?.roomId, navigate]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="/" element={<Lobby />} />
				<Route
					path="/room/:roomId"
					element={roomState ? <VotingRoom /> : <Lobby />}
				/>
				<Route
					path="/impressum"
					element={<MarkdownScreen type="impressum" />}
				/>
				<Route
					path="/privacy"
					element={<MarkdownScreen type="privacy" />}
				/>
			</Routes>
		</Suspense>
	);
}

function App() {
	return (
		<CacheProvider value={emotionCache}>
			<PeerProvider>
				<RoomProvider>
					<Global styles={globalStyles} />
					<AppContent />
				</RoomProvider>
			</PeerProvider>
		</CacheProvider>
	);
}

export default App;

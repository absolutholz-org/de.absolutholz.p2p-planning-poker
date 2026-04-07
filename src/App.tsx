import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { lazy, Suspense } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { RoomProvider } from './context/RoomProvider';
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

function RoomGuard() {
	const { roomId } = useParams();
	const userName = localStorage.getItem('userName');
	const role =
		(sessionStorage.getItem('role') as 'host' | 'guest') || 'guest';

	if (!userName) {
		return <Lobby />;
	}

	return (
		<RoomProvider roomId={roomId!} name={userName} role={role}>
			<VotingRoom />
		</RoomProvider>
	);
}

function AppContent() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="/" element={<Lobby />} />
				<Route path="/room/:roomId" element={<RoomGuard />} />
				<Route
					path="/impressum"
					element={<MarkdownScreen type="impressum" />}
				/>
				<Route
					path="/privacy"
					element={<MarkdownScreen type="privacy" />}
				/>
				<Route
					path="/accessibility"
					element={<MarkdownScreen type="accessibility" />}
				/>
			</Routes>
		</Suspense>
	);
}

function App() {
	return (
		<CacheProvider value={emotionCache}>
			<Global styles={globalStyles} />
			<AppContent />
		</CacheProvider>
	);
}

export default App;

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { Header } from './components/Shared/Header';
import { PageContainer } from './components/Shared/PageContainer';
import { RoomProvider, useRoom } from './context/RoomContext';
import { globalStyles } from './theme/GlobalStyles';

// Disable standard Emotion vendor prefixes because modern browsers don't need them
const emotionCache = createCache({
	key: 'css',
	stylisPlugins: [],
});

const RoomLayout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
`;

const RoomContent = styled(PageContainer)`
	display: flex;
	flex: 1;
	overflow: hidden;
	gap: var(--sys-spacing-xl);
	padding-top: var(--sys-spacing-lg);
	padding-bottom: var(--sys-spacing-lg);
	width: 100%;

	@media (max-width: 1024px) {
		flex-direction: column;
		overflow-y: auto;
	}
`;

function RoomView() {
	const { roomState } = useRoom();

	if (!roomState) {
		return <LobbyForm />;
	}

	return (
		<RoomLayout>
			<RoomHeader />
			<RoomContent>
				<VotingDeck />
				<Roster />
			</RoomContent>
		</RoomLayout>
	);
}

function AppContent() {
	const { roomState } = useRoom();
	const navigate = useNavigate();

	useEffect(() => {
		// When roomState initializes, redirect to the permanent room URL
		if (roomState?.roomId) {
			navigate(`/room/${roomState.roomId}`, { replace: true });
		}
	}, [roomState?.roomId, navigate]);

	return (
		<div className="app-container">
			<Header />
			<main className="main-content">
				<Routes>
					<Route path="/" element={<LobbyForm />} />
					<Route path="/room/:roomId" element={<RoomView />} />
				</Routes>
			</main>
		</div>
	);
}

function App() {
	return (
		<CacheProvider value={emotionCache}>
			<RoomProvider>
				<Global styles={globalStyles} />
				<AppContent />
			</RoomProvider>
		</CacheProvider>
	);
}

export default App;

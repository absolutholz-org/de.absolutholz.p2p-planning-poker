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

const LAYOUT_BREAKPOINT = '45rem';

const RoomLayout = styled.div``;

const RoomContent = styled(PageContainer)`
	@media (min-width: ${LAYOUT_BREAKPOINT}) {
		display: grid;
		gap: var(--sys-spacing-xxl);
		grid-template-columns: 1fr auto;
	}
`;

const Divider = styled.div`
	border-top: 1px solid var(--sys-color-border);
	margin-block: var(--sys-spacing-xl);

	@media (min-width: ${LAYOUT_BREAKPOINT}) {
		display: none;
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
				<Divider />
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

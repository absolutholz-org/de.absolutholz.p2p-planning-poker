import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { Divider } from './components/Shared/Divider';
import { Header } from './components/Shared/Header';
import { PageContainer } from './components/Shared/PageContainer';
import { SkipLink } from './components/Shared/SkipLink';
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
				<Divider hideOnDesktop />
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
			<SkipLink />
			<Header />
			<main id="main-content" className="main-content" tabIndex={-1}>
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

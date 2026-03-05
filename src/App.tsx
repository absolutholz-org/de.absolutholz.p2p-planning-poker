import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { Header } from './components/Shared/Header';
import { ShareContent } from './components/Shared/ShareDialog';
import { RoomProvider, useRoom } from './context/RoomContext';
import { globalStyles } from './theme/GlobalStyles';

const RoomLayout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
`;

const RoomContent = styled.main`
	display: flex;
	flex: 1;
	overflow: hidden;
	gap: var(--sys-spacing-xl);
	padding: var(--sys-spacing-lg);
	max-width: 1600px;
	margin: 0 auto;
	width: 100%;

	@media (max-width: 1024px) {
		flex-direction: column;
		overflow-y: auto;
	}
`;

const DesktopSidebar = styled.aside`
	display: none;

	@media (min-width: 1024px) {
		display: flex;
		flex-direction: column;
		gap: var(--sys-spacing-lg);
		width: 380px;
		flex-shrink: 0;
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
				<DesktopSidebar>
					<ShareContent roomId={roomState.roomId} />
					<Roster />
				</DesktopSidebar>
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
		<RoomProvider>
			<Global styles={globalStyles} />
			<AppContent />
		</RoomProvider>
	);
}

export default App;

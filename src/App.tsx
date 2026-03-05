import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { Header } from './components/Shared/Header';
import { RoomProvider, useRoom } from './context/RoomContext';
import { GlobalThemeStyles } from './theme/GlobalStyles';

function RoomView() {
	const { roomState } = useRoom();

	if (!roomState) {
		return <LobbyForm />;
	}

	return (
		<div className="room-layout">
			<RoomHeader />
			<main className="room-content">
				<VotingDeck />
				<Roster />
			</main>
		</div>
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
			<GlobalThemeStyles />
			<AppContent />
		</RoomProvider>
	);
}

export default App;

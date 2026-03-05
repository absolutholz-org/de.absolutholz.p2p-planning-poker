import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { LanguageSwitcher } from './components/Shared/LanguageSwitcher';
import { RoomProvider, useRoom } from './context/RoomContext';

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
			<LanguageSwitcher className="global-language-switcher" />
			<Routes>
				<Route path="/" element={<LobbyForm />} />
				<Route path="/room/:roomId" element={<RoomView />} />
			</Routes>
		</div>
	);
}

function App() {
	return (
		<RoomProvider>
			<AppContent />
		</RoomProvider>
	);
}

export default App;

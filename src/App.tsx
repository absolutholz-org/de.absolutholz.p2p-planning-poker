import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { RoomProvider, useRoom } from './context/RoomContext';

function AppContent() {
	const { roomState } = useRoom();

	if (!roomState) {
		return <LobbyForm />;
	}

	return (
		<>
			<RoomHeader />
			<VotingDeck />
			<Roster />
		</>
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

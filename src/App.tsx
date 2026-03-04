import { RoomProvider, useRoom } from './context/RoomContext';

function AppContent() {
	const { roomState } = useRoom();

	// If no roomState exists, show Lobby. Otherwise show Room.
	if (!roomState) {
		return (
			<div>{/* TODO: Phase 5 - Render LobbyForm */}Lobby View (WIP)</div>
		);
	}

	return <div>{/* TODO: Phase 5 - Render Room View */}Room View (WIP)</div>;
}

function App() {
	return (
		<RoomProvider>
			<AppContent />
		</RoomProvider>
	);
}

export default App;

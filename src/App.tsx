import { LobbyForm } from './components/Lobby/LobbyForm';
import { RoomHeader } from './components/Room/RoomHeader';
import { Roster } from './components/Room/Roster';
import { VotingDeck } from './components/Room/VotingDeck';
import { LanguageSwitcher } from './components/Shared/LanguageSwitcher';
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
		<>
			<div
				style={{
					position: 'fixed',
					right: '1rem',
					top: '1rem',
					zIndex: 100,
				}}
			>
				<LanguageSwitcher />
			</div>
			<RoomProvider>
				<AppContent />
			</RoomProvider>
		</>
	);
}

export default App;

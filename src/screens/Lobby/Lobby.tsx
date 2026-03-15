import { LobbyForm } from '../../components/Lobby/LobbyForm';
import { AppLayout } from '../../components/Shared/AppLayout';
import { PageContainer } from '../../components/Shared/PageContainer';

export function Lobby() {
	return (
		<AppLayout>
			<PageContainer>
				<LobbyForm />
			</PageContainer>
		</AppLayout>
	);
}

import styled from '@emotion/styled';

import { RoomHeader } from '../../components/Room/RoomHeader';
import { Roster } from '../../components/Room/Roster';
import { VotingDeck } from '../../components/Room/VotingDeck';
import { AppLayout } from '../../components/Shared/AppLayout';
import { Divider } from '../../components/Shared/Divider';
import { PageContainer } from '../../components/Shared/PageContainer';
import { Stack } from '../../components/Shared/Stack';
import { useRoom } from '../../hooks/useRoom';

const LAYOUT_BREAKPOINT = '45rem';

const RoomContent = styled(PageContainer)`
	@media (min-width: ${LAYOUT_BREAKPOINT}) {
		display: grid;
		gap: var(--sys-spacing-xxl);
		grid-template-columns: 1fr auto;
	}
`;

export function VotingRoom() {
	const { connectionStatus, error, roomState } = useRoom();

	if (connectionStatus === 'connecting') {
		return (
			<AppLayout>
				<PageContainer>
					<div style={{ display: 'flex', height: '40vh', alignItems: 'center', justifyContent: 'center' }}>
						<Stack align="center" justify="center">
							<h2>Connecting to Peer Network...</h2>
						</Stack>
					</div>
				</PageContainer>
			</AppLayout>
		);
	}

	if (connectionStatus === 'error') {
		return (
			<AppLayout>
				<PageContainer>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							height: '40vh',
							justifyContent: 'center',
						}}
					>
						<Stack align="center" justify="center">
							<h2>Connection Failed</h2>
							<p>{error}</p>
						</Stack>
					</div>
				</PageContainer>
			</AppLayout>
		);
	}

	if (!roomState) {
		return null;
	}

	return (
		<AppLayout>
			<Stack spacing="xl">
				<RoomHeader />
				<RoomContent>
					<VotingDeck />
					<Divider hideOnDesktop />
					<Roster />
				</RoomContent>
			</Stack>
		</AppLayout>
	);
}

import styled from '@emotion/styled';

import { RoomHeader } from '../../components/Room/RoomHeader';
import { Roster } from '../../components/Room/Roster';
import { VotingDeck } from '../../components/Room/VotingDeck';
import { AppLayout } from '../../components/Shared/AppLayout';
import { Button } from '../../components/Shared/Button';
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
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							height: '40vh',
							justifyContent: 'center',
						}}
					>
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
						<Stack align="center" justify="center" spacing="lg">
							<Stack align="center" justify="center" spacing="sm">
								<h2>Connection Failed</h2>
								<p>{error}</p>
							</Stack>
							<Button
								variant="primary"
								onClick={() => {
									sessionStorage.setItem('role', 'guest');
									window.location.reload();
								}}
							>
								Join as Guest
							</Button>
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

import styled from '@emotion/styled';

import { RoomHeader } from '../../components/Room/RoomHeader';
import { Roster } from '../../components/Room/Roster';
import { VotingDeck } from '../../components/Room/VotingDeck';
import { AppLayout } from '../../components/Shared/AppLayout';
import { Divider } from '../../components/Shared/Divider';
import { PageContainer } from '../../components/Shared/PageContainer';
import { Stack } from '../../components/Shared/Stack';
import { useRoom } from '../../context/RoomContext';

const LAYOUT_BREAKPOINT = '45rem';

const RoomContent = styled(PageContainer)`
	@media (min-width: ${LAYOUT_BREAKPOINT}) {
		display: grid;
		gap: var(--sys-spacing-xxl);
		grid-template-columns: 1fr auto;
	}
`;

export function VotingRoom() {
	const { roomState } = useRoom();

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

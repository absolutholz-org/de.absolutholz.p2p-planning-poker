import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoomHeader } from '../../components/Room/RoomHeader';
import { Roster } from '../../components/Room/Roster';
import { VotingDeck } from '../../components/Room/VotingDeck';
import { AppLayout } from '../../components/Shared/AppLayout';
import { Divider } from '../../components/Shared/Divider';
import { PageContainer } from '../../components/Shared/PageContainer';
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
	const navigate = useNavigate();

	useEffect(() => {
		// If someone navigates to /room/:id directly without state, redirect to Lobby
		if (!roomState) {
			navigate('/', { replace: true });
		}
	}, [roomState, navigate]);

	if (!roomState) {
		return null;
	}

	return (
		<AppLayout>
			<RoomHeader />
			<RoomContent>
				<VotingDeck />
				<Divider hideOnDesktop />
				<Roster />
			</RoomContent>
		</AppLayout>
	);
}

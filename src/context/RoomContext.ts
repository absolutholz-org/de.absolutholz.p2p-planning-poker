import { createContext } from 'react';

import type { RoomContextValue } from './RoomContext.types';

export const RoomContext = createContext<RoomContextValue | undefined>(
	undefined,
);

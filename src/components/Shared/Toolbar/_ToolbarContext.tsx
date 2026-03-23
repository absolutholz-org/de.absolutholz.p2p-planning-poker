import { createContext } from 'react';

import type { IToolbarContext } from './_Toolbar.types';

export const ToolbarContext = createContext<IToolbarContext | undefined>(
	undefined,
);

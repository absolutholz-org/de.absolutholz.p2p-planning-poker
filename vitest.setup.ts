import * as axeMatchers from 'jest-axe';
import { expect, vi } from 'vitest';

expect.extend(axeMatchers.toHaveNoViolations);

// Mock globals typically defined by Vite
const globalWithVite = globalThis as unknown as {
	BUILD_YEAR: number;
	BUILD_VERSION: string;
};
globalWithVite.BUILD_YEAR = new Date().getFullYear();
globalWithVite.BUILD_VERSION = '0.0.0-test';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		i18n: {
			changeLanguage: vi.fn(),
			language: 'en',
		},
		t: (key: string) => key,
	}),
}));

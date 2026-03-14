export const SUPPORTED_LANGUAGES = [
	{ code: 'en', flag: '🇺🇸', label: 'English' },
	{ code: 'de', flag: '🇩🇪', label: 'Deutsch' },
	{ code: 'fr', flag: '🇫🇷', label: 'Français' },
	{ code: 'pt', flag: '🇧🇷', label: 'Português' },
] as const;

export type SupportedLanguageCode =
	(typeof SUPPORTED_LANGUAGES)[number]['code'];

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationDE from './locales/de/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationPT from './locales/pt/translation.json';

const resources = {
	de: {
		translation: translationDE,
	},
	en: {
		translation: translationEN,
	},
	fr: {
		translation: translationFR,
	},
	pt: {
		translation: translationPT,
	},
};

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false, // react already escapes values from XSS natively
	},
	lng: 'en', // default language
	resources,
});

export default i18n;

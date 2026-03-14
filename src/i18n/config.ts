import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { STORAGE_KEYS } from '../constants/storage';
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

const defaultLanguage = SUPPORTED_LANGUAGES[0].code;
const initialLanguage =
	localStorage.getItem(STORAGE_KEYS.LANGUAGE) || defaultLanguage;

i18n.use(initReactI18next).init({
	fallbackLng: defaultLanguage,
	interpolation: {
		escapeValue: false, // react already escapes values from XSS natively
	},
	lng: initialLanguage,
	resources,
});

export default i18n;

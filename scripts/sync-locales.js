// scripts/sync-locales.js
import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.join(process.cwd(), 'src/i18n/locales');
const PRIMARY_LANG = 'en';
const TARGET_LANGS = ['de', 'fr', 'pt'];

// Recursive function to ensure all keys from primary exist in target
function syncObjects(primary, target, lang) {
	let added = 0;
	const result = { ...target };

	for (const key in primary) {
		if (typeof primary[key] === 'object' && primary[key] !== null) {
			result[key] = result[key] || {};
			const nested = syncObjects(primary[key], result[key], lang);
			result[key] = nested.result;
			added += nested.added;
		} else if (!(key in result)) {
			// If the key is missing, add it with a TODO flag
			result[key] = `[TODO: ${lang}] ${primary[key]}`;
			added++;
		}
	}
	return { result, added };
}

try {
	const primaryPath = path.join(
		LOCALES_DIR,
		PRIMARY_LANG,
		'translation.json',
	);
	if (!fs.existsSync(primaryPath)) {
		console.error(`Primary locale file not found at ${primaryPath}`);
		process.exit(1);
	}

	const primaryData = JSON.parse(fs.readFileSync(primaryPath, 'utf8'));
	let totalAdded = 0;

	for (const lang of TARGET_LANGS) {
		const targetPath = path.join(LOCALES_DIR, lang, 'translation.json');
		let targetData = {};

		if (fs.existsSync(targetPath)) {
			targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
		} else {
			// Create directory if it doesn't exist
			fs.mkdirSync(path.join(LOCALES_DIR, lang), { recursive: true });
		}

		const { result, added } = syncObjects(primaryData, targetData, lang);

		if (added > 0) {
			fs.writeFileSync(
				targetPath,
				JSON.stringify(result, null, 2),
				'utf8',
			);
			console.log(`Synced ${lang}: Added ${added} missing keys.`);
			totalAdded += added;
		} else {
			console.log(`Synced ${lang}: Up to date.`);
		}
	}

	console.log(`\nSync complete. Total missing keys stubbed: ${totalAdded}`);
	if (totalAdded > 0) {
		console.log(
			`ACTION REQUIRED: Search the target locale files for '[TODO:' and provide the correct translations.`,
		);
	}
} catch (error) {
	console.error('Error syncing locales:', error.message);
	process.exit(1);
}

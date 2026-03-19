// scripts/get-icon-path.js
import fs from 'fs';
import path from 'path';

const iconName = process.argv[2];

if (!iconName) {
	console.error(
		JSON.stringify({
			error: 'No icon name provided. Usage: node get-icon-path.js <icon_name>',
		}),
	);
	process.exit(1);
}

// Common directory structures for the material-symbols npm package
const possiblePaths = [
	path.join(
		process.cwd(),
		`node_modules/material-symbols/svg-400/outlined/${iconName}.svg`,
	),
	path.join(
		process.cwd(),
		`node_modules/material-symbols/svg-400/rounded/${iconName}.svg`,
	),
	path.join(
		process.cwd(),
		`node_modules/@material-symbols/svg-400/outlined/${iconName}.svg`,
	),
];

let svgContent = null;

for (const filePath of possiblePaths) {
	if (fs.existsSync(filePath)) {
		svgContent = fs.readFileSync(filePath, 'utf8');
		break;
	}
}

if (!svgContent) {
	console.error(
		JSON.stringify({
			error: `Icon '${iconName}' not found in node_modules.`,
		}),
	);
	process.exit(1);
}

// Extract the viewBox and the d attribute using regex
const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
const pathMatch = svgContent.match(/d="([^"]+)"/);

if (!pathMatch) {
	console.error(
		JSON.stringify({ error: 'Could not extract path data from SVG.' }),
	);
	process.exit(1);
}

// Output clean JSON for the AI Agent to consume
const result = {
	name: iconName,
	viewBox: viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24',
	path: pathMatch[1],
};

console.log(JSON.stringify(result, null, 2));

/* eslint-disable */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const WCAG_BITV_MAPPING: Record<
	string,
	{
		bitv: string;
		fix: string;
		name: string;
		wcag: string;
		why: string;
	}
> = {
	'aria-allowed-attr': {
		bitv: '9.4.1.2',
		fix: 'Use only ARIA attributes that are allowed for the element’s role.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Ensures assistive technologies can correctly identify and interact with elements.',
	},
	'aria-hidden-focus': {
		bitv: '9.4.1.2',
		fix: 'Ensure focusable elements are not hidden from assistive technologies.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Prevents "ghost" focusable elements that screen reader users cannot see.',
	},
	'aria-prohibited-attr': {
		bitv: '9.4.1.2',
		fix: 'Remove ARIA attributes that are not supported on the specific element or role.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Avoids confusing assistive technology with invalid or conflicting ARIA metadata.',
	},
	'aria-roles': {
		bitv: '9.4.1.1',
		fix: 'Use valid ARIA roles that match the element’s purpose.',
		name: 'Parsing',
		wcag: '4.1.1',
		why: 'Correct roles help users understand what an element does (e.g., button vs. link).',
	},
	'aria-valid-attr': {
		bitv: '9.4.1.2',
		fix: 'Correct the spelling or usage of the ARIA attribute.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Invalid ARIA attributes are ignored by screen readers, potentially breaking functionality.',
	},
	'aria-valid-attr-value': {
		bitv: '9.4.1.2',
		fix: 'Use only allowed values (e.g., true/false) for this ARIA attribute.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Incorrect values can cause screen readers to skip or misread the element state.',
	},
	'button-name': {
		bitv: '9.4.1.2',
		fix: 'Add an aria-label or visible text to the button.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Users need to know what a button does before they click it.',
	},
	'color-contrast': {
		bitv: '9.1.4.3',
		fix: 'Increase the contrast ratio to at least 4.5:1 for normal text.',
		name: 'Contrast (Minimum)',
		wcag: '1.4.3',
		why: 'Ensures readability for users with low vision or when using devices in bright light.',
	},
	'duplicate-id': {
		bitv: '9.4.1.1',
		fix: 'Ensure all id attributes on the page are unique.',
		name: 'Parsing',
		wcag: '4.1.1',
		why: 'Duplicate IDs break the connection between labels and inputs, and confuse the accessibility tree.',
	},
	'duplicate-id-aria': {
		bitv: '9.4.1.1',
		fix: 'Remove duplicate IDs used in ARIA attributes like aria-labelledby.',
		name: 'Parsing',
		wcag: '4.1.1',
		why: 'Ensures ARIA relationships remain predictable and unique.',
	},
	'heading-order': {
		bitv: '9.1.3.1',
		fix: 'Ensure heading levels (h1-h6) follow a logical hierarchy.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Helps screen reader users navigate the page structure like a table of contents.',
	},
	'html-has-lang': {
		bitv: '9.3.1.1',
		fix: 'Add a lang attribute (e.g., lang="en") to the <html> tag.',
		name: 'Language of Page',
		wcag: '3.1.1',
		why: 'Enables screen readers to use the correct pronunciation and accent.',
	},
	'image-alt': {
		bitv: '9.1.1.1',
		fix: 'Add a descriptive alt attribute to the image.',
		name: 'Non-text Content',
		wcag: '1.1.1',
		why: 'Provides a verbal description of images for blind users.',
	},
	label: {
		bitv: '9.1.3.1',
		fix: 'Use a <label> element or aria-label for every form input.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Allows users to know what information is expected in a form field.',
	},
	'landmark-one-main': {
		bitv: '9.1.3.1',
		fix: 'Ensure the page has exactly one <main> landmark.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Helps users skip navigation and jump directly to the primary content.',
	},
	'landmark-unique': {
		bitv: '9.4.1.2',
		fix: 'Add unique aria-labels to distinguish multiple landmarks of the same type (e.g., <nav>).',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Prevents confusion when multiple sections have the same role (e.g., "Main Nav" vs "Legal Nav").',
	},
	'link-name': {
		bitv: '9.4.1.2',
		fix: 'Add descriptive text or an aria-label to the link.',
		name: 'Name, Role, Value',
		wcag: '4.1.2',
		why: 'Users should understand where a link leads before navigating away.',
	},
	list: {
		bitv: '9.1.3.1',
		fix: 'Ensure <ul> or <ol> elements contain only <li> children.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Correct list structure allows screen readers to announce the number of items.',
	},
	listitem: {
		bitv: '9.1.3.1',
		fix: 'Ensure <li> elements are contained within a <ul> or <ol>.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Standalone list items are not recognized as part of a list by assistive tech.',
	},
	'main-landmark': {
		bitv: '9.1.3.1',
		fix: 'Wrap your primary content in a <main> tag.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Essential for efficient keyboard and screen reader navigation.',
	},
	region: {
		bitv: '9.1.3.1',
		fix: 'Add an aria-label to any element with a region role.',
		name: 'Info and Relationships',
		wcag: '1.3.1',
		why: 'Identifies the purpose of layout regions in the document tree.',
	},
};

const STATUS_PATH = 'docs/a11y/STATUS.md';
const DASHBOARD_DATA_PATH = 'docs/a11y/dashboard/src/data/audit-results.json';
const TEMP_UNIT = 'temp-a11y-unit.json';
const TEMP_E2E = 'temp-a11y-e2e.json';

interface AuditNode {
	html: string;
	summary?: string;
	target: string[];
}

interface AuditCheckpoint {
	category: string;
	description: string;
	fix: string;
	help: string;
	impact?: string;
	nodes: AuditNode[];
	ruleId: string;
	source: 'Unit' | 'E2E';
	status: 'PASS' | 'FAIL' | 'INCOMPLETE' | 'INAPPLICABLE';
	why: string;
}

interface ComponentHealth {
	checkpoints: AuditCheckpoint[];
	name: string;
	passes: number;
	violations: number;
}

function getRuleInfo(ruleId: string) {
	return (
		WCAG_BITV_MAPPING[ruleId] || {
			bitv: 'N/A',
			fix: 'Review the rule documentation for repair steps.',
			name: ruleId,
			wcag: 'N/A',
			why: 'This rule ensures compliance with general accessibility best practices.',
		}
	);
}

function extractAxeData(stdout: string) {
	const results: any[] = [];
	const matches = stdout.matchAll(
		/AXE_RESULTS_START([\s\S]*?)AXE_RESULTS_END/g,
	);
	for (const match of matches) {
		try {
			results.push(JSON.parse(match[1].trim()));
		} catch {
			// Ignore malformed JSON
		}
	}
	return results;
}

function cleanSummary(summary: string | undefined): string {
	if (!summary) return '';
	// Strip "Fix all of the following:" or "Fix any of the following:"
	return summary.replace(/Fix (all|any) of the following:\s*/i, '').trim();
}

function mapNodes(
	nodes: { html: string; failureSummary?: string; target: string[] }[],
): AuditNode[] {
	return nodes.map((n) => ({
		html: n.html,
		summary: cleanSummary(n.failureSummary),
		target: n.target,
	}));
}

async function certify() {
	console.log('🛡️ Starting Zero-Micromanagement Certification...');
	const startTime = Date.now();

	// 1. Regression Check Setup
	let lastViolationCount = 0;
	if (fs.existsSync(STATUS_PATH)) {
		const content = fs.readFileSync(STATUS_PATH, 'utf-8');
		const match = content.match(/<!-- TOTAL_VIOLATIONS: (\d+) -->/);
		if (match) {
			lastViolationCount = parseInt(match[1], 10);
		}
	}

	// 2. Run Vitest
	console.log('🧪 Running Unit & Storybook Scans...');
	let unitStdout = '';
	try {
		unitStdout = execSync(
			`npx vitest run --project=unit --project=storybook --reporter=default --reporter=json --outputFile=${TEMP_UNIT} --no-color`,
			{ stdio: 'pipe' },
		).toString();
	} catch (e) {
		const err = e as { stdout?: Buffer };
		unitStdout = err.stdout?.toString() || '';
	}

	// 3. Run Playwright
	console.log('🎭 Running E2E Visual Scans...');
	let e2eStdout = '';
	try {
		e2eStdout = execSync(
			`npx playwright test tests/a11y/ --reporter=json`,
			{
				stdio: 'pipe',
			},
		).toString();
	} catch (e) {
		const err = e as { stdout?: Buffer };
		e2eStdout = err.stdout?.toString() || '';
	}

	// 4. Data Orchestration
	const componentsMap: Record<string, ComponentHealth> = {};

	const processAxeResults = (
		data: {
			componentName?: string;
			violations: {
				id: string;
				description: string;
				help: string;
				impact?: string;
				nodes: {
					html: string;
					failureSummary?: string;
					target: string[];
				}[];
			}[];
			passes: {
				id: string;
				description: string;
				help: string;
				nodes: {
					html: string;
					failureSummary?: string;
					target: string[];
				}[];
			}[];
			incomplete: {
				id: string;
				description: string;
				help: string;
				impact?: string;
				nodes: {
					html: string;
					failureSummary?: string;
					target: string[];
				}[];
			}[];
			inapplicable: { id: string; description: string; help: string }[];
		},
		source: 'Unit' | 'E2E',
	) => {
		const componentName = data.componentName || 'AppFooter';
		if (!componentsMap[componentName]) {
			componentsMap[componentName] = {
				checkpoints: [],
				name: componentName,
				passes: 0,
				violations: 0,
			};
		}

		const comp = componentsMap[componentName];

		data.violations.forEach((v) => {
			comp.violations++;
			const info = getRuleInfo(v.id);
			comp.checkpoints.push({
				category: `WCAG ${info.wcag} / BITV ${info.bitv}`,
				description: v.description,
				fix: info.fix,
				help: v.help,
				impact: v.impact,
				nodes: mapNodes(v.nodes),
				ruleId: v.id,
				source,
				status: 'FAIL',
				why: info.why,
			});
		});

		data.passes.forEach((p) => {
			comp.passes++;
			const info = getRuleInfo(p.id);
			comp.checkpoints.push({
				category: `WCAG ${info.wcag} / BITV ${info.bitv}`,
				description: p.description,
				fix: info.fix,
				help: p.help,
				nodes: mapNodes(p.nodes),
				ruleId: p.id,
				source,
				status: 'PASS',
				why: info.why,
			});
		});

		data.incomplete.forEach((i) => {
			const info = getRuleInfo(i.id);
			comp.checkpoints.push({
				category: `WCAG ${info.wcag} / BITV ${info.bitv}`,
				description: i.description,
				fix: info.fix,
				help: i.help,
				impact: i.impact,
				nodes: mapNodes(i.nodes),
				ruleId: i.id,
				source,
				status: 'INCOMPLETE',
				why: info.why,
			});
		});

		data.inapplicable.forEach((ia) => {
			if (WCAG_BITV_MAPPING[ia.id]) {
				const info = getRuleInfo(ia.id);
				comp.checkpoints.push({
					category: `WCAG ${info.wcag} / BITV ${info.bitv}`,
					description: ia.description,
					fix: info.fix,
					help: ia.help,
					nodes: [],
					ruleId: ia.id,
					source,
					status: 'INAPPLICABLE',
					why: info.why,
				});
			}
		});
	};

	extractAxeData(unitStdout).forEach((res) => processAxeResults(res, 'Unit'));
	extractAxeData(e2eStdout).forEach((res) => processAxeResults(res, 'E2E'));

	// 5. Generate STATUS.md (Legacy Table + Regression Alert)
	let currentTotalViolations = 0;
	Object.values(componentsMap).forEach(
		(c) => (currentTotalViolations += c.violations),
	);

	let dashboardMarkup = `# Accessibility Certification Status\n\n`;
	if (currentTotalViolations > lastViolationCount) {
		dashboardMarkup += `## ⚠️ REGRESSION DETECTED\n`;
		dashboardMarkup += `Total violations increased from ${lastViolationCount} to ${currentTotalViolations}.\n\n`;
	}

	dashboardMarkup += `| Component | Health Score % | Critical Blockers | BITV / WCAG Status |\n`;
	dashboardMarkup += `| :--- | :--- | :--- | :--- |\n`;

	Object.values(componentsMap).forEach((c) => {
		const total = c.violations + c.passes;
		const score = total > 0 ? Math.round((c.passes / total) * 100) : 0;
		const critical = c.checkpoints
			.filter((cp) => cp.status === 'FAIL' && cp.impact === 'critical')
			.slice(0, 2)
			.map((cp) => cp.ruleId)
			.join(', ');
		const status = c.violations === 0 ? '✅ COMPLIANT' : '❌ NON-COMPLIANT';
		dashboardMarkup += `| ${c.name} | ${score}% | ${critical || 'None'} | ${status} |\n`;
	});

	dashboardMarkup += `\n\n<!-- TOTAL_VIOLATIONS: ${currentTotalViolations} -->\n`;
	fs.writeFileSync(STATUS_PATH, dashboardMarkup);

	// 6. Generate Dashboard JSON
	const auditResults = {
		components: Object.values(componentsMap),
		regression: currentTotalViolations > lastViolationCount,
		stats: {
			duration: ((Date.now() - startTime) / 1000).toFixed(2),
			timestamp: new Date().toISOString(),
			totalPasses: Object.values(componentsMap).reduce(
				(acc, c) => acc + c.passes,
				0,
			),
			totalViolations: currentTotalViolations,
		},
	};

	const dashboardDir = path.dirname(DASHBOARD_DATA_PATH);
	if (!fs.existsSync(dashboardDir)) {
		fs.mkdirSync(dashboardDir, { recursive: true });
	}
	fs.writeFileSync(
		DASHBOARD_DATA_PATH,
		JSON.stringify(auditResults, null, 2),
	);

	// 7. Housekeeping
	[TEMP_UNIT, TEMP_E2E].forEach((f) => {
		if (fs.existsSync(f)) fs.unlinkSync(f);
	});

	console.log(
		`✅ Certification complete. Dashboard JSON: ${DASHBOARD_DATA_PATH}`,
	);
}

certify().catch(console.error);

import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

interface ViolationNode {
	html: string;
	target: string[];
	failureSummary: string;
}

interface AxeRuleResult {
	id: string;
	impact?: string;
	description: string;
	help: string;
	helpUrl: string;
	nodes: ViolationNode[];
}

interface ComponentResult {
	name: string;
	filePath: string;
	status: 'passed' | 'failed';
	violations: AxeRuleResult[];
	passes: AxeRuleResult[];
	inapplicable: AxeRuleResult[];
}

interface CriterionMapping {
	bitv: string;
	wcag: string;
	principle: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
	description: string;
	manual?: boolean;
}

/**
 * Comprehensive mapping of Axe rules to BITV 2.0 (EN 301 549) and WCAG 2.2.
 * BITV 2.0 criteria for web content follow the 9.x.y.z pattern based on WCAG.
 */
const AXE_CRITERIA_MAP: Record<string, CriterionMapping> = {
	'accessible-authentication': {
		bitv: '9.3.3.8',
		description: 'AA: Accessible Authentication (Minimum)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.3.8',
	},
	'accessible-authentication-enhanced': {
		bitv: '9.3.3.9',
		description: 'AAA: Accessible Authentication (Enhanced)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.3.9',
	},
	'area-alt': {
		bitv: '9.1.1.1',
		description: 'A: Non-text Content (Images must have Alt text)',
		principle: 'Perceivable',
		wcag: '1.1.1',
	},
	'aria-allowed-attr': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (ARIA attributes must be allowed)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-allowed-role': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Element roles must be appropriate)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-hidden-body': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (aria-hidden not on body)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-required-attr': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Required ARIA attrs present)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-required-children': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Roles have required children)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-required-parent': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Roles have required parent)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-roles': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (ARIA roles are valid)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-valid-attr': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (ARIA attribute names are valid)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'aria-valid-attr-value': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (ARIA attribute values are valid)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'audio-control': {
		bitv: '9.1.4.2',
		description: 'A: Audio Control (Volume control/mute)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.4.2',
	},
	'audio-desc-prerecorded': {
		bitv: '9.1.2.3',
		description: 'A: Audio Description or Media Alternative (Prerecorded)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.2.3',
	},
	'audio-desc-prerecorded-aa': {
		bitv: '9.1.2.5',
		description: 'AA: Audio Description (Prerecorded)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.2.5',
	},
	'audio-video-only': {
		bitv: '9.1.2.1',
		description: 'A: Audio-only and Video-only (Prerecorded)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.2.1',
	},
	'avoid-inline-spacing': {
		bitv: '9.1.4.12',
		description: 'AA: Text Spacing (Users can adjust text spacing)',
		principle: 'Perceivable',
		wcag: '1.4.12',
	},
	'button-name': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Buttons have discernible names)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	bypass: {
		bitv: '9.2.4.1',
		description: 'A: Bypass Blocks (Skip links or landmarks)',
		principle: 'Operable',
		wcag: '2.4.1',
	},
	'captions-live': {
		bitv: '9.1.2.4',
		description: 'AA: Captions (Live)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.2.4',
	},
	'captions-prerecorded': {
		bitv: '9.1.2.2',
		description: 'A: Captions (Prerecorded)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.2.2',
	},
	'character-key-shortcuts': {
		bitv: '9.2.1.4',
		description: 'A: Character Key Shortcuts (Dismiss/reassign)',
		manual: true,
		principle: 'Operable',
		wcag: '2.1.4',
	},
	'color-contrast': {
		bitv: '9.1.4.3',
		description: 'AA: Contrast Minimum (Text contrast >= 4.5:1)',
		principle: 'Perceivable',
		wcag: '1.4.3',
	},
	'consistent-help': {
		bitv: '9.3.2.6',
		description: 'A: Consistent Help',
		manual: true,
		principle: 'Understandable',
		wcag: '3.2.6',
	},
	'consistent-identification': {
		bitv: '9.3.2.4',
		description: 'AA: Consistent Identification',
		manual: true,
		principle: 'Understandable',
		wcag: '3.2.4',
	},
	'consistent-navigation': {
		bitv: '9.3.2.3',
		description: 'AA: Consistent Navigation',
		manual: true,
		principle: 'Understandable',
		wcag: '3.2.3',
	},
	'content-on-hover-focus': {
		bitv: '9.1.4.13',
		description: 'AA: Content on Hover or Focus (Dismissibility)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.4.13',
	},
	'definition-list': {
		bitv: '9.1.3.1',
		description: 'A: Info and Relationships (Structure for definitions)',
		principle: 'Perceivable',
		wcag: '1.3.1',
	},
	dlitem: {
		bitv: '9.1.3.1',
		description: 'A: Info and Relationships (DL items in DL parent)',
		principle: 'Perceivable',
		wcag: '1.3.1',
	},
	'document-title': {
		bitv: '9.2.4.2',
		description: 'A: Page Titled (Descriptive page titles)',
		principle: 'Operable',
		wcag: '2.4.2',
	},
	'dragging-movements': {
		bitv: '9.2.5.7',
		description: 'AA: Dragging Movements (Single-pointer click)',
		manual: true,
		principle: 'Operable',
		wcag: '2.5.7',
	},
	'duplicate-id': {
		bitv: '9.4.1.1',
		description: 'A: Parsing (Unique IDs - deprecated in 2.2)',
		principle: 'Robust',
		wcag: '4.1.1',
	},
	'duplicate-id-active': {
		bitv: '9.4.1.1',
		description: 'A: Parsing (Unique active IDs)',
		principle: 'Robust',
		wcag: '4.1.1',
	},
	'duplicate-id-aria': {
		bitv: '9.4.1.1',
		description: 'A: Parsing (Unique ARIA IDs)',
		principle: 'Robust',
		wcag: '4.1.1',
	},
	'error-identification': {
		bitv: '9.3.3.1',
		description: 'A: Error Identification (Text description)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.3.1',
	},
	'error-prevention': {
		bitv: '9.3.3.4',
		description: 'AA: Error Prevention (Legal/Financial/Data)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.3.4',
	},
	'error-suggestion': {
		bitv: '9.3.3.3',
		description: 'AA: Error Suggestion',
		manual: true,
		principle: 'Understandable',
		wcag: '3.3.3',
	},
	'focus-not-obscured': {
		bitv: '9.2.4.11',
		description: 'AA: Focus Not Obscured (Minimum)',
		manual: true,
		principle: 'Operable',
		wcag: '2.4.11',
	},
	'focus-order-semantics': {
		bitv: '9.2.4.3',
		description: 'A: Focus Order (Logical navigation order)',
		principle: 'Operable',
		wcag: '2.4.3',
	},
	'focus-visible': {
		bitv: '9.2.4.7',
		description: 'AA: Focus Visible',
		manual: true,
		principle: 'Operable',
		wcag: '2.4.7',
	},
	'form-field-multiple-labels': {
		bitv: '9.3.3.2',
		description: 'A: Labels or Instructions (Consistent labeling)',
		principle: 'Understandable',
		wcag: '3.3.2',
	},
	'frame-title': {
		bitv: '9.2.4.1',
		description: 'A: Bypass Blocks (IFrames must have titles)',
		principle: 'Operable',
		wcag: '2.4.1',
	},
	'functional-test-failure': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Generic behavioral check)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'headings-and-labels': {
		bitv: '9.2.4.6',
		description: 'AA: Headings and Labels (Clear meaning)',
		manual: true,
		principle: 'Operable',
		wcag: '2.4.6',
	},
	'html-has-lang': {
		bitv: '9.3.1.1',
		description: 'A: Language of Page (HTML lang attribute present)',
		principle: 'Understandable',
		wcag: '3.1.1',
	},
	'html-lang-valid': {
		bitv: '9.3.1.1',
		description: 'A: Language of Page (HTML lang value valid)',
		principle: 'Understandable',
		wcag: '3.1.1',
	},
	'identify-input-purpose': {
		bitv: '9.1.3.5',
		description: 'AA: Identify Input Purpose (Autocomplete support)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.3.5',
	},
	'image-alt': {
		bitv: '9.1.1.1',
		description: 'A: Non-text Content (Images have Alt text)',
		principle: 'Perceivable',
		wcag: '1.1.1',
	},
	'images-of-text': {
		bitv: '9.1.4.5',
		description: 'AA: Images of Text (Text over images of text)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.4.5',
	},
	'input-button-name': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Input buttons have names)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'input-image-alt': {
		bitv: '9.1.1.1',
		description: 'A: Non-text Content (Input images have Alt)',
		principle: 'Perceivable',
		wcag: '1.1.1',
	},
	label: {
		bitv: '9.1.3.1',
		description: 'A: Info and Relationships (Form fields have labels)',
		principle: 'Perceivable',
		wcag: '1.3.1',
	},
	'label-in-name': {
		bitv: '9.2.5.3',
		description: 'A: Label in Name (Visual text in AccName)',
		manual: true,
		principle: 'Operable',
		wcag: '2.5.3',
	},
	'landmark-one-main': {
		bitv: '9.2.4.1',
		description: 'A: Bypass Blocks (One main landmark per page)',
		principle: 'Operable',
		wcag: '2.4.1',
	},
	'link-name': {
		bitv: '9.2.4.4',
		description: 'A: Link Purpose (Links have discernible names)',
		principle: 'Operable',
		wcag: '2.4.4',
	},
	list: {
		bitv: '9.1.3.1',
		description: 'A: Info and Relationships (Lists structured correctly)',
		principle: 'Perceivable',
		wcag: '1.3.1',
	},
	listitem: {
		bitv: '9.1.3.1',
		description: 'A: Info and Relationships (List items in lists)',
		principle: 'Perceivable',
		wcag: '1.3.1',
	},
	'meaningful-sequence': {
		bitv: '9.1.3.2',
		description: 'A: Meaningful Sequence (Content order logic)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.3.2',
	},
	'motion-actuation': {
		bitv: '9.2.5.4',
		description: 'A: Motion Actuation (Tilt/shake alternatives)',
		manual: true,
		principle: 'Operable',
		wcag: '2.5.4',
	},
	'multiple-ways': {
		bitv: '9.2.4.5',
		description: 'AA: Multiple Ways (Search/nav find content)',
		manual: true,
		principle: 'Operable',
		wcag: '2.4.5',
	},
	'nested-interactive': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (No nested interactives)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	'no-keyboard-trap': {
		bitv: '9.2.1.2',
		description: 'A: No Keyboard Trap',
		manual: true,
		principle: 'Operable',
		wcag: '2.1.2',
	},
	'non-text-contrast': {
		bitv: '9.1.4.11',
		description: 'AA: Non-text Contrast (UI component contrast)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.4.11',
	},
	'on-focus': {
		bitv: '9.3.2.1',
		description: 'A: On Focus (No context change on focus)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.2.1',
	},
	'on-input': {
		bitv: '9.3.2.2',
		description: 'A: On Input (No context change on input)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.2.2',
	},
	orientation: {
		bitv: '9.1.3.4',
		description: 'AA: Orientation (Device rotation support)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.3.4',
	},
	'pause-stop-hide': {
		bitv: '9.2.2.2',
		description: 'A: Pause, Stop, Hide (Auto-updating content)',
		manual: true,
		principle: 'Operable',
		wcag: '2.2.2',
	},
	'pointer-cancellation': {
		bitv: '9.2.5.2',
		description: 'A: Pointer Cancellation (Up-event finish)',
		manual: true,
		principle: 'Operable',
		wcag: '2.5.2',
	},
	'pointer-gestures': {
		bitv: '9.2.5.1',
		description: 'A: Pointer Gestures (Single point alternative)',
		manual: true,
		principle: 'Operable',
		wcag: '2.5.1',
	},
	'redundant-entry': {
		bitv: '9.3.3.7',
		description: 'A: Redundant Entry (Prevent re-entry)',
		manual: true,
		principle: 'Understandable',
		wcag: '3.3.7',
	},
	reflow: {
		bitv: '9.1.4.10',
		description: 'AA: Reflow (No horiz scroll at 320px)',
		principle: 'Perceivable',
		wcag: '1.4.10',
	},
	region: {
		bitv: '9.2.4.1',
		description: 'A: Bypass Blocks (Landmarks define regions)',
		principle: 'Operable',
		wcag: '2.4.1',
	},
	'resize-text': {
		bitv: '9.1.4.4',
		description: 'AA: Resize Text (Resize up to 200%)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.4.4',
	},
	'scope-attr-valid': {
		bitv: '9.1.3.1',
		description: 'A: Info and Relationships (Valid table scope)',
		principle: 'Robust',
		wcag: '1.3.1',
	},
	'sensory-characteristics': {
		bitv: '9.1.3.3',
		description: 'A: Sensory Characteristics (Instruction clarity)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.3.3',
	},
	'status-messages': {
		bitv: '9.4.1.3',
		description: 'AA: Status Messages (Announced via aria-live)',
		manual: true,
		principle: 'Robust',
		wcag: '4.1.3',
	},
	'summary-name': {
		bitv: '9.4.1.2',
		description: 'A: Name, Role, Value (Summary text discernible)',
		principle: 'Robust',
		wcag: '4.1.2',
	},
	tabindex: {
		bitv: '9.2.1.1',
		description: 'A: Keyboard (No positive tabIndex)',
		principle: 'Operable',
		wcag: '2.1.1',
	},
	'target-size': {
		bitv: '9.2.5.8',
		description: 'AA: Target Size (Minimum 24x24px / 48px ideal)',
		principle: 'Operable',
		wcag: '2.5.8',
	},
	'three-flashes': {
		bitv: '9.2.3.1',
		description: 'A: Three Flashes or Below Threshold',
		manual: true,
		principle: 'Operable',
		wcag: '2.3.1',
	},
	'timing-adjustable': {
		bitv: '9.2.2.1',
		description: 'A: Timing Adjustable (Extend/turn off)',
		manual: true,
		principle: 'Operable',
		wcag: '2.2.1',
	},
	'use-of-color': {
		bitv: '9.1.4.1',
		description: 'A: Use of Color (Meaning not by color alone)',
		manual: true,
		principle: 'Perceivable',
		wcag: '1.4.1',
	},
	'valid-lang': {
		bitv: '9.3.1.2',
		description: 'AA: Language of Parts (Valid lang sub-tags)',
		principle: 'Understandable',
		wcag: '3.1.2',
	},
};

class A11yCertificationReporter implements Reporter {
	private results: ComponentResult[] = [];
	private startTime: number = Date.now();
	private sharedDirPath = path.resolve(
		process.cwd(),
		'src/components/Shared',
	);

	constructor() {}

	onTestEnd(test: TestCase, result: TestResult) {
		const filePath = test.location.file;
		const relativePath = path.relative(this.sharedDirPath, filePath);
		const componentName = relativePath.split(path.sep)[0];
		const fullName = `Shared/${componentName}`;

		// Find or create the component entry
		let component = this.results.find((r) => r.name === fullName);
		if (!component) {
			const projectDir = path.dirname(filePath);
			component = {
				filePath: projectDir.substring(process.cwd().length),
				inapplicable: [],
				name: fullName,
				passes: [],
				status: 'passed',
				violations: [],
			};
			this.results.push(component);
		}

		const a11yAttachment = result.attachments.find(
			(a) => a.name === 'a11y-scan-results',
		);
		let hasAxeViolations = false;

		if (a11yAttachment) {
			try {
				let bodyStr = '';
				if (a11yAttachment.body) {
					bodyStr = a11yAttachment.body.toString();
				} else if (
					a11yAttachment.path &&
					fs.existsSync(a11yAttachment.path)
				) {
					bodyStr = fs.readFileSync(a11yAttachment.path, 'utf8');
				}

				if (bodyStr) {
					const axeResults = JSON.parse(bodyStr);
					component.violations.push(...axeResults.violations);
					component.passes.push(...axeResults.passes);
					component.inapplicable.push(...axeResults.inapplicable);

					if (axeResults.violations.length > 0) {
						component.status = 'failed';
						hasAxeViolations = true;
					}
				}
			} catch (e) {
				console.error('Failed to parse a11y attachment:', e);
			}
		}

		if (result.status === 'passed') {
			const criterionAnnotation = test.annotations.find(
				(a) => a.type === 'a11y-criterion',
			);
			const wcagId =
				typeof criterionAnnotation?.description === 'string'
					? criterionAnnotation.description.trim()
					: null;

			if (wcagId) {
				// Find a matching manual rule in our map for high-fidelity certification
				const matchingKey = Object.keys(AXE_CRITERIA_MAP).find(
					(key) =>
						AXE_CRITERIA_MAP[key].wcag === wcagId &&
						AXE_CRITERIA_MAP[key].manual,
				);
				if (matchingKey) {
					// We only add it as a synthetic pass if it's explicitly identified as a manual rule
					// preventing duplication with Axe's automated passes.
					component.passes.push({
						description: `Automated behavioral verification of ${wcagId}`,
						help: 'High-Fidelity Behavioral Pass',
						helpUrl: '',
						id: matchingKey,
						nodes: [],
					});
				}
			}
		}

		if (result.status !== 'passed' && result.error && !hasAxeViolations) {
			component.status = 'failed';

			// Extraction logic for criterion mapping
			const criterionAnnotation = test.annotations.find(
				(a) => a.type === 'a11y-criterion',
			);
			const wcagId =
				typeof criterionAnnotation?.description === 'string'
					? criterionAnnotation.description.trim()
					: null;

			let criterionId = 'functional-test-failure';
			if (wcagId) {
				// Find a matching manual or functional rule in our map
				const matchingKey = Object.keys(AXE_CRITERIA_MAP).find(
					(key) =>
						AXE_CRITERIA_MAP[key].wcag === wcagId &&
						(AXE_CRITERIA_MAP[key].manual ||
							key === 'functional-test-failure'),
				);
				if (matchingKey) criterionId = matchingKey;
			}

			const rawMessage =
				result.error.message || 'Unknown behavioral failure.';
			const rawStack = result.error.stack || 'No stack trace available.';

			// Strip ANSI and separate message from detailed output
			const cleanTotal = this.stripAnsi(rawMessage);
			const cleanMessage = cleanTotal.split('\n')[0].substring(0, 500);
			const cleanStack = this.stripAnsi(rawStack);

			// HIGH-FIDELITY DIAGNOSTICS: Friendly rationale and Source Context
			const friendlyRationale = this.getFriendlyRationale(cleanTotal);
			const sourceContext = this.extractContext(rawStack);

			// Sanitize Axe diffs from the generic block if they somehow snuck in
			let displaySnippet = cleanStack;
			if (
				cleanTotal.includes('expect(received).toEqual(expected)') ||
				cleanTotal.includes('violations')
			) {
				displaySnippet =
					'Detailed accessibility scan results are already processed and available in the specific categories above. This entry represents the overall test failure trigger.';
			}

			component.violations.push({
				description: friendlyRationale,
				help: 'High-Fidelity Behavioral Requirement',
				helpUrl: '',
				id: criterionId,
				nodes: [
					{
						failureSummary: `Assertion Failure: ${cleanMessage}`,
						html: displaySnippet,
						target: [sourceContext], // Carry the source context here
					},
				],
			});
		}
	}

	async onEnd() {
		const totalComponents = this.results.length;
		const testedComponents = this.results.filter(
			(r) => r.passes.length > 0 || r.violations.length > 0,
		).length;
		const certifiedComponents = this.results.filter(
			(r) =>
				r.status === 'passed' &&
				(r.passes.length > 0 || r.violations.length > 0),
		).length;

		// Calculate Global Compliance Score
		// (Total Passed Checks / Total Library Requirements)
		const allMappedRules = Object.keys(AXE_CRITERIA_MAP);
		const totalReqs = totalComponents * allMappedRules.length;
		let totalPassed = 0;

		this.results.forEach((res) => {
			allMappedRules.forEach((rid) => {
				if (res.passes.find((p) => p.id === rid)) totalPassed++;
			});
		});

		const globalScore =
			totalReqs > 0 ? Math.round((totalPassed / totalReqs) * 100) : 0;

		const html = this.generateHTML(
			globalScore,
			certifiedComponents,
			testedComponents,
			totalComponents,
		);
		fs.writeFileSync('certification.html', html);
		console.log(`\n✅ Accessibility Audit Process Complete!`);
		console.log(
			`🚀 Dashboard generated: ${path.resolve('certification.html')}`,
		);
		console.log(
			`🔎 Review the dashboard to see any identified violations.\n`,
		);
	}

	private generateHTML(
		score: number,
		certifiedCount: number,
		testedCount: number,
		totalCount: number,
	): string {
		const allMappedRules = Object.keys(AXE_CRITERIA_MAP).sort();

		return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A11y Certification | Planning Poker</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #006ce6;
            --primary-light: #e0f0ff;
            --success: #198754;
            --success-bg: #d1e7dd;
            --danger: #dc3545;
            --danger-bg: #f8d7da;
            --warning: #856404;
            --warning-bg: #fff3cd;
            --neutral: #6c757d;
            --bg: #f8fafc;
            --text: #1e293b;
            --text-light: #64748b;
            --border: #e2e8f0;
            --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { box-sizing: border-box; }
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 3rem;
            line-height: 1.5;
        }

        /* Hero Dashboard */
        .hero {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 2.5rem;
            margin-bottom: 3rem;
        }
        .hero-main {
            background: linear-gradient(135deg, #006ce6 0%, #004da3 100%);
            padding: 3rem;
            border-radius: 24px;
            color: white;
            box-shadow: 0 10px 25px -5px rgba(0, 108, 230, 0.3);
        }
        .hero-title h1 { font-family: 'Outfit', sans-serif; font-size: 2.5rem; margin: 0 0 0.5rem; }
        .hero-title p { opacity: 0.9; font-weight: 500; margin: 0; font-size: 1.05rem; }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            margin-top: 2.5rem;
        }
        .metric-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.25rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .metric-val { font-size: 1.75rem; font-weight: 800; display: block; }
        .metric-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; opacity: 0.8; }

        .hero-score {
            background: white;
            padding: 2.5rem;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow);
            text-align: center;
        }
        .progress-circle { width: 130px; height: 130px; position: relative; margin-bottom: 1.25rem; }
        .progress-circle svg { transform: rotate(-90deg); width: 100%; height: 100%; }
        .progress-circle circle { fill: none; stroke-width: 10; stroke-linecap: round; }
        .progress-bg { stroke: #f1f5f9; }
        .progress-val { 
            stroke: var(--primary);
            stroke-dasharray: 402;
            stroke-dashoffset: ${402 - (402 * score) / 100};
        }
        .score-text {
            position: absolute;
            top: 50%; left: 50%; transform: translate(-50%, -50%);
            font-size: 1.75rem; font-weight: 800; color: var(--primary);
        }

        /* ONE LINE CONTROLS */
        .controls {
            background: white;
            padding: 1.25rem 2.5rem;
            border-radius: 20px;
            margin-bottom: 2.5rem;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 3rem;
        }
        .search-container { flex: 2; position: relative; }
        .search-icon { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--text-light); }
        .search-input {
            width: 100%;
            padding: 0.8rem 1rem 0.8rem 3.5rem;
            border-radius: 12px;
            border: 1px solid var(--border);
            background: #f8fafc;
            font-size: 0.95rem;
            font-weight: 500;
            transition: var(--transition);
        }
        .search-input:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 0 0 4px var(--primary-light); }

        .filter-dashboard { flex: 4; display: flex; align-items: center; gap: 2.5rem; justify-content: flex-end; }
        .filter-group { display: flex; align-items: center; gap: 1rem; }
        .filter-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--text-light); white-space: nowrap; }
        .filter-options { display: flex; gap: 0.4rem; }
        .filter-btn {
            background: #f1f5f9; border: 1px solid #e2e8f0; padding: 0.45rem 1rem; border-radius: 8px;
            font-size: 0.8rem; font-weight: 700; color: #475569; cursor: pointer; transition: var(--transition);
        }
        .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

        /* Component Rendering */
        .component-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .component-section { background: white; border-radius: 20px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
        .component-section.is-hidden { display: none; }
        
        .component-header { padding: 1.5rem 2.5rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; }
        .component-main-info { flex: 1; display: flex; align-items: center; gap: 1.5rem; }
        .chevron { transition: var(--transition); font-size: 1.25rem; color: var(--text-light); }
        details[open] > .component-header .chevron { transform: rotate(90deg); }

        .component-title-group { display: flex; flex-direction: column; gap: 0.35rem; }
        .component-name { font-family: 'Outfit', sans-serif; font-size: 1.75rem; font-weight: 800; margin: 0; color: #0f172a; }
        .component-paths { font-size: 0.8rem; color: var(--text-light); display: flex; flex-direction: column; gap: 0.25rem; }
        .path-item { display: flex; align-items: center; gap: 0.5rem; }
        .path-label { font-weight: 800; text-transform: uppercase; font-size: 0.6rem; color: var(--primary); width: 80px; }

        .header-right { text-align: end; display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; }
        .header-stats { display: flex; align-items: center; gap: 1.5rem; }
        .header-stat-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 600; }
        .header-stat-dot { width: 8px; height: 8px; border-radius: 50%; }
        .header-stat-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--text-light); }

        .status-pill { padding: 0.4rem 1rem; border-radius: 99px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .status-passed { background: var(--success-bg); color: var(--success); }
        .status-failed { background: var(--danger-bg); color: var(--danger); }
        .status-pending { background: var(--warning-bg); color: var(--warning); }

        /* Principles & Matrix */
        .principles-container { padding: 0 2.5rem 2.5rem; }
        .principle-card { border: 1px solid var(--border); border-radius: 12px; margin-top: 1rem; overflow: hidden; }
        .principle-header { padding: 1.25rem 1.5rem; background: #fbfcfd; display: flex; justify-content: space-between; align-items: center; font-weight: 700; cursor: pointer; }
        
        .matrix-table { width: 100%; border-collapse: collapse; }
        .matrix-table th { text-align: left; padding: 1rem 1.5rem; background: #f8fafc; font-size: 0.7rem; text-transform: uppercase; color: var(--text-light); }
        .matrix-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; vertical-align: top; }
        
        .rule-status { padding: 0.3rem 0.7rem; border-radius: 6px; font-weight: 700; font-size: 0.75rem; }
        .rule-pass { background: var(--success-bg); color: var(--success); }
        .rule-fail { background: var(--danger-bg); color: var(--danger); }
        .rule-manual { background: var(--warning-bg); color: var(--warning); }
        .rule-na { background: #f1f5f9; color: var(--text-light); }

        .violation-details { margin-top: 1rem; padding: 1.5rem; background: #fff5f5; border-radius: 12px; border-left: 4px solid var(--danger); }
        .code-snippet { background: #1e293b; color: #f8fafc; padding: 1.25rem; border-radius: 8px; margin-top: 1rem; font-family: monospace; font-size: 0.85rem; overflow-x: auto; }

        summary { list-style: none; outline: none; }
        summary::-webkit-details-marker { display: none; }
        
        tr[data-status] { display: none; }
    </style>
</head>
<body data-filter="all">
    <div class="hero">
        <div class="hero-main">
            <div class="hero-title">
                <h1>Health Certification Index</h1>
                <p>Universal compliance tracking for the P2P Planning Poker library.</p>
            </div>
            <div class="metrics-grid">
                <div class="metric-card"><span class="metric-val">${totalCount}</span><span class="metric-label">Components</span></div>
                <div class="metric-card"><span class="metric-val">${certifiedCount}</span><span class="metric-label">Certified</span></div>
                <div class="metric-card"><span class="metric-val">${totalCount - testedCount}</span><span class="metric-label">Untested</span></div>
                <div class="metric-card"><span class="metric-val">${score}%</span><span class="metric-label">Coverage</span></div>
            </div>
        </div>
        <div class="hero-score">
            <div class="progress-circle">
                <svg><circle class="progress-bg" cx="65" cy="65" r="60"></circle><circle class="progress-val" cx="65" cy="65" r="60"></circle></svg>
                <div class="score-text">${score}%</div>
            </div>
            <div class="score-label">Library Health</div>
        </div>
    </div>

    <div class="controls">
        <div class="search-container">
            <span class="search-icon">🔍</span>
            <input type="text" id="searchInput" class="search-input" placeholder="Search components..." onkeyup="updateFilters()">
        </div>
        <div class="filter-dashboard">
            <div class="filter-group">
                <span class="filter-label">Health</span>
                <div class="filter-options">
                    <button class="filter-btn active" data-group="health" data-value="all" onclick="setFilter(this)">All</button>
                    <button class="filter-btn" data-group="health" data-value="healthy" onclick="setFilter(this)">Healthy</button>
                    <button class="filter-btn" data-group="health" data-value="failed" onclick="setFilter(this)">Failed</button>
                    <button class="filter-btn" data-group="health" data-value="pending" onclick="setFilter(this)">Pending</button>
                </div>
            </div>
            <div class="filter-group">
                <span class="filter-label">Criterion</span>
                <div class="filter-options">
                    <button class="filter-btn active" data-group="criterion" data-value="all" onclick="setFilter(this)">All</button>
                    <button class="filter-btn" data-group="criterion" data-value="pass" onclick="setFilter(this)">Pass</button>
                    <button class="filter-btn" data-group="criterion" data-value="fail" onclick="setFilter(this)">Fail</button>
                    <button class="filter-btn" data-group="criterion" data-value="manual" onclick="setFilter(this)">Manual</button>
                    <button class="filter-btn" data-group="criterion" data-value="na" onclick="setFilter(this)">N/A</button>
                </div>
            </div>
        </div>
    </div>

    <div class="component-list">
        ${this.results
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((res) => {
				const categorize = (rid: string) => {
					if (res.violations.some((v) => v.id === rid)) return 'fail';
					if (res.passes.some((p) => p.id === rid)) return 'pass';
					if (AXE_CRITERIA_MAP[rid].manual) return 'manual';
					return 'na';
				};
				const counts = allMappedRules.reduce(
					(acc, rid) => {
						acc[categorize(rid)]++;
						return acc;
					},
					{ fail: 0, manual: 0, na: 0, pass: 0 },
				);
				const isUntested = counts.pass === 0 && counts.fail === 0;
				const healthStatus =
					counts.fail > 0
						? 'failed'
						: isUntested
							? 'pending'
							: 'healthy';

				return `
        <div class="component-section" data-name="${res.name.toLowerCase()}" data-health="${healthStatus}" 
             data-has-pass="${counts.pass > 0}" data-has-fail="${counts.fail > 0}" data-has-manual="${counts.manual > 0}" data-has-na="${counts.na > 0}">
            <details ${counts.fail > 0 ? 'open' : ''}>
                <summary class="component-header">
                    <div class="component-main-info">
                        <span class="chevron">▶</span>
                        <div class="component-title-group">
                            <h2 class="component-name">${res.name.split('/').pop()}</h2>
                            <div class="component-paths">
                                <div class="path-item"><span class="path-label">Storybook</span><span>${res.name}</span></div>
                                <div class="path-item"><span class="path-label">Project</span><span>${res.filePath}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="header-right">
                        <div class="header-stats">
                            <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--success)"></span><span class="header-stat-label">Pass</span><span style="color:var(--success)">${counts.pass}</span></div>
                            <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--danger)"></span><span class="header-stat-label">Fail</span><span style="color:var(--danger)">${counts.fail}</span></div>
                            <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--warning)"></span><span class="header-stat-label">Manual</span><span style="color:var(--warning)">${counts.manual}</span></div>
                            <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--neutral);opacity:0.5"></span><span class="header-stat-label">N/A</span><span style="color:var(--neutral);opacity:0.6">${counts.na}</span></div>
                        </div>
                        <span class="status-pill status-${healthStatus}">${healthStatus}</span>
                    </div>
                </summary>
                
                <div class="principles-container">
                    ${['Perceivable', 'Operable', 'Understandable', 'Robust']
						.map((p) => {
							const rules = allMappedRules.filter(
								(rid) => AXE_CRITERIA_MAP[rid].principle === p,
							);
							const pCounts = rules.reduce(
								(acc, rid) => {
									acc[categorize(rid)]++;
									return acc;
								},
								{ fail: 0, manual: 0, na: 0, pass: 0 },
							);
							if (rules.length === 0) return '';
							return `
                        <div class="principle-card">
                            <details ${pCounts.fail > 0 ? 'open' : ''}>
                                <summary class="principle-header">
                                    <span>${p}</span>
                                    <div class="header-stats">
                                        <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--success)"></span><span class="header-stat-label">Pass</span><span style="color:var(--success)">${pCounts.pass}</span></div>
                                        <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--danger)"></span><span class="header-stat-label">Fail</span><span style="color:var(--danger)">${pCounts.fail}</span></div>
                                        <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--warning)"></span><span class="header-stat-label">Manual</span><span style="color:var(--warning)">${pCounts.manual}</span></div>
                                        <div class="header-stat-item"><span class="header-stat-dot" style="background:var(--neutral);opacity:0.5"></span><span class="header-stat-label">N/A</span><span style="color:var(--neutral);opacity:0.6">${pCounts.na}</span></div>
                                    </div>
                                </summary>
                                <table class="matrix-table">
                                    <thead><tr><th style="width:25%">Identity</th><th style="width:55%">Requirement</th><th style="width:20%">Status</th></tr></thead>
                                    <tbody>
                                        ${rules
											.map((rid) => {
												const m = AXE_CRITERIA_MAP[rid];
												const violation =
													res.violations.find(
														(v) => v.id === rid,
													);
												const pass = res.passes.find(
													(p) => p.id === rid,
												);
												const sClass = violation
													? 'fail'
													: pass
														? 'pass'
														: m.manual
															? 'manual'
															: 'na';
												const sText = violation
													? 'Fail'
													: pass
														? 'Pass'
														: m.manual
															? 'Manual'
															: 'N/A';
												return `
                                            <tr data-status="${sClass}">
                                                <td><strong>BITV ${m.bitv}</strong><br><span style="font-size:0.7rem;color:var(--text-light)">WCAG ${m.wcag}</span></td>
                                                <td>
                                                    <div style="font-weight:600">${m.description}</div>
                                                    <code style="font-size:0.7rem;color:var(--text-light)">${rid}</code>
                                                    ${
														violation
															? `
                                                    <div class="violation-details">
                                                        <div style="color:var(--danger);font-weight:800;margin-bottom:0.5rem">🚨 ${this.escapeHtml(violation.help)}</div>
                                                        <div class="code-snippet">${this.escapeHtml(violation.nodes[0]?.html || '')}</div>
                                                        <div style="margin-top:0.75rem;font-size:0.8rem;font-weight:600">${this.escapeHtml(violation.nodes[0]?.failureSummary || '')}</div>
                                                    </div>`
															: ''
													}
                                                </td>
                                                <td><span class="rule-status rule-${sClass}">${sText}</span></td>
                                            </tr>`;
											})
											.join('')}
                                    </tbody>
                                </table>
                            </details>
                        </div>`;
						})
						.join('')}
                </div>
            </details>
        </div>`;
			})
			.join('')}
    </div>

    <script>
        function setFilter(btn) {
            const group = btn.getAttribute('data-group');
            document.querySelectorAll('.filter-btn[data-group="' + group + '"]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateFilters();
        }
        function updateFilters() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const healthFilter = document.querySelector('.filter-btn[data-group="health"].active').getAttribute('data-value');
            const criterionFilter = document.querySelector('.filter-btn[data-group="criterion"].active').getAttribute('data-value');
            
            document.querySelectorAll('.component-section').forEach(s => {
                const matchesSearch = s.getAttribute('data-name').includes(query);
                const matchesHealth = healthFilter === 'all' || s.getAttribute('data-health') === healthFilter;
                const matchesCriterion = criterionFilter === 'all' || s.getAttribute('data-has-' + criterionFilter) === 'true';
                s.classList.toggle('is-hidden', !(matchesSearch && matchesHealth && matchesCriterion));
            });

            document.querySelectorAll('tr[data-status]').forEach(tr => {
                const status = tr.getAttribute('data-status');
                tr.style.display = (criterionFilter === 'all' || status === criterionFilter) ? 'table-row' : 'none';
            });
        }
        window.onload = updateFilters;
    </script>
</body>
</html>`;
	}

	private escapeHtml(unsafe: string): string {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	private getFriendlyRationale(errorMsg: string): string {
		if (errorMsg.includes('toBeFocused')) {
			return 'Focus Management Requirement: The component failed to manage its focus correctly. This typically occurs when a modal is opened or closed, or when a navigation interaction occurs, and focus is not properly redirected to the expected interaction point.';
		}
		if (errorMsg.includes('toBeVisible')) {
			return 'Interactive Visibility Requirement: An expected interactive component or status indicator was not visible or rendered correctly to the accessibility tree.';
		}
		if (
			errorMsg.includes('toEqual([])') ||
			errorMsg.includes('violations')
		) {
			return 'Structural Compliance Scan: Detailed accessibility violations were detected during the automated scan. Please see the specific category sections above for technical remediation steps.';
		}
		if (errorMsg.includes('Timeout')) {
			return 'Interaction Timing Violation: The component failed to respond or reach its expected accessible state within the required time window.';
		}

		return 'General Behavioral Requirement: The component failed to meet its interactive accessibility contract (Keyboard navigation, Focus handling, or Aria sequence).';
	}

	private extractContext(stack: string): string {
		const cleanStack = this.stripAnsi(stack);
		// Look for something like /src/components/.../_Dialog.a11y.ts:50:30
		const regex =
			/(src\/components\/Shared\/.*\.a11y\.ts:\d+:\d+)|(src\/test\/.*\.a11y\.ts:\d+:\d+)/;
		const match = cleanStack.match(regex);

		if (match) {
			return match[0];
		}

		return 'Context: General behavioral audit';
	}

	private stripAnsi(str: string): string {
		return str.replace(
			// eslint-disable-next-line no-control-regex
			/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
			'',
		);
	}
}

export default A11yCertificationReporter;

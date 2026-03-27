import React, { useState } from 'react';

import auditResults from '../data/audit-results.json';
import styles from './A11yDashboard.module.css';

interface IEvidenceNode {
	target: string[];
	html: string;
	summary?: string;
}

interface ICheckpoint {
	status: string;
	help: string;
	description: string;
	why: string;
	fix: string;
	source: string;
	ruleId: string;
	category: string;
	nodes: IEvidenceNode[];
}

interface IComponentData {
	name: string;
	passes: number;
	violations: number;
	checkpoints: ICheckpoint[];
}

export default function A11yDashboard() {
	const { components, regression, stats } = auditResults;
	const [filter, setFilter] = useState<'ALL' | 'FAIL' | 'MANUAL'>('ALL');

	const handleFilterChange = (newFilter: typeof filter) => {
		setFilter(newFilter);
	};

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>A11y Certification Dashboard</h1>
				<p className={styles.subtitle}>
					BITV 2.0 & WCAG 2.2 Compliance Report
				</p>
			</header>

			<div className={styles.filterBar}>
				<button
					className={`${styles.filterBtn} ${filter === 'ALL' ? styles.filterBtnActive : ''}`}
					onClick={() => handleFilterChange('ALL')}
				>
					All Results
				</button>
				<button
					className={`${styles.filterBtn} ${filter === 'FAIL' ? styles.filterBtnActive : ''}`}
					onClick={() => handleFilterChange('FAIL')}
				>
					Show Only Failures
				</button>
				<button
					className={`${styles.filterBtn} ${filter === 'MANUAL' ? styles.filterBtnActive : ''}`}
					onClick={() => handleFilterChange('MANUAL')}
				>
					Show Only Manual Checks
				</button>
			</div>

			{regression && (
				<div className={styles.regressionAlert}>
					⚠️ REGRESSION DETECTED: Violation count has increased since
					the last audit.
				</div>
			)}

			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<span className={styles.statLabel}>Health Score</span>
					<span className={styles.statValue}>
						{Math.round(
							(stats.totalPasses /
								(stats.totalPasses + stats.totalViolations)) *
								100,
						)}
						%
					</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statLabel}>Total Passes</span>
					<span
						className={styles.statValue}
						style={{ color: 'var(--accent-success)' }}
					>
						{stats.totalPasses}
					</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statLabel}>Violations</span>
					<span
						className={styles.statValue}
						style={{ color: 'var(--accent-fail)' }}
					>
						{stats.totalViolations}
					</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statLabel}>Last Audit</span>
					<span
						className={styles.statValue}
						style={{ fontSize: '1rem', marginTop: '1rem' }}
					>
						{new Date(stats.timestamp).toLocaleString()}
					</span>
				</div>
			</div>

			<section>
				{components.map((comp) => (
					<ComponentItem
						key={comp.name}
						component={comp}
						filter={filter}
					/>
				))}
			</section>
		</div>
	);
}

function ComponentItem({
	component,
	filter,
}: {
	component: IComponentData;
	filter: 'ALL' | 'FAIL' | 'MANUAL';
}) {
	const [isExpanded, setIsExpanded] = useState(false);

	const filteredCheckpoints = component.checkpoints.filter((cp) => {
		if (filter === 'ALL') return true;
		if (filter === 'FAIL') return cp.status === 'FAIL';
		if (filter === 'MANUAL') return cp.status === 'INCOMPLETE';
		return true;
	});

	if (filter !== 'ALL' && filteredCheckpoints.length === 0) {
		return null;
	}

	const total = component.passes + component.violations;
	const score = total > 0 ? Math.round((component.passes / total) * 100) : 0;

	return (
		<div className={styles.componentItem}>
			<button
				className={styles.componentHeader}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<span className={styles.componentName}>
					{component.name}
					<span
						style={{
							color: 'var(--text-secondary)',
							fontSize: '0.875rem',
							fontWeight: 400,
							marginLeft: '1rem',
						}}
					>
						({component.checkpoints.length} checks)
					</span>
				</span>
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						gap: '1.5rem',
					}}
				>
					<span
						style={{
							color:
								score === 100
									? 'var(--accent-success)'
									: 'var(--accent-warn)',
						}}
					>
						{score}% Score
					</span>
					<span>{isExpanded ? '▼' : '▶'}</span>
				</div>
			</button>

			{isExpanded && (
				<div className={styles.auditList}>
					{filteredCheckpoints.map((cp, idx: number) => (
						<AuditRow key={idx} cp={cp} />
					))}
				</div>
			)}
		</div>
	);
}

function AuditRow({ cp }: { cp: ICheckpoint }) {
	const [isRowExpanded, setIsRowExpanded] = useState(cp.status === 'FAIL');

	const getStatusClass = (status: string) => {
		const s = status.toLowerCase();
		if (s === 'pass') return styles.statusPass;
		if (s === 'fail') return styles.statusFail;
		if (s === 'incomplete') return styles.statusInc;
		return styles.statusIna;
	};

	return (
		<div className={styles.auditRow}>
			<div
				className={styles.auditRowHeader}
				onClick={() => setIsRowExpanded(!isRowExpanded)}
			>
				<span
					className={`${styles.statusBadge} ${getStatusClass(cp.status)}`}
				>
					{cp.status === 'INCOMPLETE' ? '⚠️ MANUAL' : cp.status}
				</span>

				<span className={styles.ruleName} title={cp.help}>
					{cp.help}
				</span>
				<span className={styles.ruleId}>{cp.ruleId}</span>
				<span className={styles.criterion}>{cp.category}</span>
				<span className={styles.sourceBadge}>{cp.source}</span>

				<span
					className={styles.toggleIcon}
					style={{ color: 'var(--text-secondary)' }}
				>
					{isRowExpanded ? '−' : '+'}
				</span>
			</div>

			{isRowExpanded && (
				<div className={styles.auditRowContent}>
					<div className={styles.explanationBlock}>
						<div className={styles.infoGrid}>
							<div className={styles.infoSection}>
								<h4>What was checked</h4>
								<p>{cp.description}</p>
							</div>
							<div className={styles.infoSection}>
								<h4>Why it matters</h4>
								<p>{cp.why}</p>
							</div>
						</div>

						<div
							className={`${styles.fixBox} ${cp.status === 'FAIL' ? styles.isError : ''}`}
						>
							<h4>
								{cp.status === 'FAIL'
									? 'How to Fix'
									: 'Compliance Tip'}
							</h4>
							<p>{cp.fix}</p>
						</div>
					</div>

					<div className={styles.technicalDetails}>
						<h4>Technical Evidence ({cp.nodes.length} elements)</h4>
						<div className={styles.nodeEvidence}>
							{cp.nodes.length > 0 ? (
								cp.nodes.map((node, nIdx: number) => (
									<EvidenceNode key={nIdx} node={node} />
								))
							) : (
								<span
									style={{
										color: 'var(--text-secondary)',
										fontSize: '0.75rem',
										fontStyle: 'italic',
									}}
								>
									No element-specific evidence needed for this
									high-level check.
								</span>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function EvidenceNode({ node }: { node: IEvidenceNode }) {
	const [copied, setCopied] = useState(false);
	const selector = node.target.join(' ');

	const copyToClipboard = (e: React.MouseEvent) => {
		e.stopPropagation();
		navigator.clipboard.writeText(selector);
		setCopied(true);
		setTimeout(() => setCopied(false), 400);
	};

	return (
		<div className={styles.evidenceItem}>
			<div className={styles.selectorBox}>
				<span
					className={`${styles.selectorTag} ${copied ? styles.copied : ''}`}
					onClick={copyToClipboard}
					title="Click to copy selector"
				>
					{selector}
				</span>
				{copied && (
					<span
						style={{
							color: 'var(--accent-success)',
							fontSize: '0.65rem',
						}}
					>
						Copied!
					</span>
				)}
			</div>
			<code className={styles.htmlSnippet}>{node.html}</code>
			{node.summary && (
				<span className={styles.failureSummary}>{node.summary}</span>
			)}
		</div>
	);
}

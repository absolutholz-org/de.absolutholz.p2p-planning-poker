import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover } from './_Popover';

const meta = {
	args: {
		align: 'end',
		children: (
			<div style={{ minWidth: '150px', padding: '16px' }}>
				<p style={{ fontWeight: 500, margin: 0 }}>Menu Content</p>
				<p
					style={{
						color: 'var(--sys-color-text-secondary)',
						fontSize: '14px',
						margin: '8px 0 0',
					}}
				>
					Native DOM top-layer.
				</p>
			</div>
		),
		renderTrigger: ({ popoverTarget, ref }) => (
			<button
				ref={ref}
				popoverTarget={popoverTarget}
				style={{
					background: 'var(--sys-color-bg)',
					border: '1px solid var(--sys-color-border)',
					borderRadius: 'var(--sys-radius-pill)',
					cursor: 'pointer',
					padding: '8px 16px',
				}}
			>
				Open Menu
			</button>
		),
	},
	component: Popover,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/Popover',
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base Story showing standard configuration
export const Default: Story = {};

// Variant Story: Forcing the alignment to "start"
export const AlignedStart: Story = {
	args: {
		...Default.args,
		align: 'start',
	},
};

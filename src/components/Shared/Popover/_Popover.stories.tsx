import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Popover } from './_Popover';

const meta = {
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
export const Default: Story = {
	args: {
		align: 'end',
		children: [
			<Button key="trigger" variant="secondary">
				Open Menu
			</Button>,
			<div key="content" style={{ minWidth: '150px', padding: '16px' }}>
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
			</div>,
		],
	},
};

// Variant Story: Forcing the alignment to "start"
export const AlignedStart: Story = {
	args: {
		...Default.args,
		align: 'start',
	},
};

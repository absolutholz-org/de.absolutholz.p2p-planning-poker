import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Switch } from './_Switch';

const meta = {
	args: {
		checked: false,
		disabled: false,
		id: 'switch-default',
		label: 'Switch Option',
		onChange: () => undefined,
	},
	component: Switch,
	parameters: {
		layout: 'centered',
	},
	render: function Render(args) {
		const [checked, setChecked] = useState(args.checked);
		return (
			<Switch
				{...args}
				checked={checked}
				onChange={(e) => {
					setChecked(e.target.checked);
					args.onChange?.(e);
				}}
			/>
		);
	},
	tags: ['autodocs'],
	title: 'PRIMITIVES/Inputs/Switch',
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
	args: {
		...Default.args,
		checked: true,
		id: 'switch-checked',
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
		id: 'switch-disabled',
	},
};

export const LongLabel: Story = {
	args: {
		...Default.args,
		id: 'switch-long-label',
		label: 'This is an exceptionally long label intended to verify that the flexbox space-between layout gracefully handles lengthy text nodes without overlapping the visual track or thumb on narrow viewports.',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					border: '1px dashed #ccc',
					padding: '16px',
					width: '320px',
				}}
			>
				<Story />
			</div>
		),
	],
};

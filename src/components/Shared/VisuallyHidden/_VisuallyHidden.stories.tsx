import type { Meta, StoryObj } from '@storybook/react-vite';

import { VisuallyHidden } from './_VisuallyHidden';

const meta = {
	args: {
		children: 'I am hidden but readable by screen readers',
	},
	component: VisuallyHidden,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/VisuallyHidden',
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsLabel: Story = {
	args: {
		as: 'label',
		children: 'Hidden Label',
		htmlFor: 'some-input',
	},
	render: (args) => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<VisuallyHidden {...args} />
			<input id="some-input" placeholder="Type here..." />
		</div>
	),
};

export const Focusable: Story = {
	args: {
		children: 'Tab to show me',
		focusable: true,
	},
	render: (args) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				padding: '20px',
			}}
		>
			<p>Use Tab to navigate to the hidden link below:</p>
			<VisuallyHidden as="a" href="#target" {...args} />
			<div id="target" style={{ marginTop: '50px' }}>
				Target Content
			</div>
		</div>
	),
};

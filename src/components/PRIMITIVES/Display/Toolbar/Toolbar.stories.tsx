import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toolbar } from './Toolbar';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarItem } from './ToolbarItem';

const meta: Meta<typeof Toolbar> = {
	component: Toolbar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'PRIMITIVES/Display/Toolbar',
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Management: Story = {
	args: {
		'aria-label': 'Room management',
	},
	render: (args) => (
		<Toolbar {...args}>
			<ToolbarGroup>
				<ToolbarItem icon="share" label="Share" variant="secondary" />
				<ToolbarItem icon="edit" label="Rename" variant="secondary" />
			</ToolbarGroup>
		</Toolbar>
	),
};

export const Voting: Story = {
	args: {
		'aria-label': 'Voting controls',
	},
	render: (args) => (
		<Toolbar {...args}>
			<ToolbarGroup>
				<ToolbarItem icon="refresh" label="Reset" variant="secondary" />
				<ToolbarItem
					icon="visibility"
					label="Reveal"
					variant="primary"
				/>
			</ToolbarGroup>
		</Toolbar>
	),
};

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

export const KitchenSink: Story = {
	args: {
		'aria-label': 'Editor Toolbar',
	},
	render: (args) => (
		<Toolbar {...args} style={{ width: '600px' }}>
			<ToolbarGroup>
				<ToolbarItem icon="refresh" label="Reset" variant="danger" />
				<ToolbarItem icon="share" label="Share" variant="secondary" />
			</ToolbarGroup>

			<ToolbarGroup>
				<ToolbarItem icon="edit" label="Rename" />
				<ToolbarItem
					icon="visibility"
					label="Reveal"
					variant="primary"
				/>
			</ToolbarGroup>

			<ToolbarGroup>
				<ToolbarItem icon="report" label="Report" variant="danger" />
				<ToolbarItem icon="info" label="Info" />
			</ToolbarGroup>
		</Toolbar>
	),
};

export const MobileSimulation: Story = {
	args: {
		'aria-label': 'Mobile Toolbar',
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
	},
	render: (args) => (
		<Toolbar {...args} style={{ width: '320px' }}>
			<ToolbarGroup>
				<ToolbarItem icon="refresh" label="Reset" variant="danger" />
				<ToolbarItem
					icon="visibility"
					label="Reveal"
					variant="primary"
				/>
				<ToolbarItem icon="language" label="Settings" />
			</ToolbarGroup>
		</Toolbar>
	),
};

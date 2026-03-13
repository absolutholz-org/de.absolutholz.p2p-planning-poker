import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './_Icon';

const meta: Meta<typeof Icon> = {
	argTypes: {
		color: { control: 'color' },
		fill: { control: 'boolean' },
		grade: { control: { max: 200, min: -25, step: 1, type: 'range' } },
		name: { control: 'text' },
		opticalSize: { control: { max: 48, min: 20, step: 1, type: 'range' } },
		size: { control: 'text' },
		weight: { control: { max: 700, min: 100, step: 100, type: 'range' } },
	},
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
	args: {
		name: 'settings',
		size: 48,
	},
};

export const Filled: Story = {
	args: {
		fill: true,
		name: 'favorite',
		size: 48,
	},
};

export const Various: Story = {
	render: () => (
		<div style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
			<Icon name="search" />
			<Icon name="home" fill />
			<Icon name="settings" weight={700} />
			<Icon name="delete" grade={200} />
			<Icon name="check_circle" color="green" />
			<Icon name="❤️" />
		</div>
	),
};

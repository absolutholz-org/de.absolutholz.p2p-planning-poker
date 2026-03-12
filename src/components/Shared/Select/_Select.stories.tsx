import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './_Select';

const meta = {
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/Select',
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
	{ id: '1', label: 'Option 1', title: 'First Option' },
	{ id: '2', label: 'Option 2', title: 'Second Option' },
	{
		icon: '🚀',
		id: '3',
		label: 'Option with Icon',
		title: 'Third Option with Icon',
	},
];

export const Default: Story = {
	args: {
		activeId: '1',
		'aria-label': 'Select an option',
		onSelect: (id: string) => console.log('Selected:', id),
		options: mockOptions,
	},
};

export const WithIcon: Story = {
	args: {
		...Default.args,
		activeId: '3',
	},
};

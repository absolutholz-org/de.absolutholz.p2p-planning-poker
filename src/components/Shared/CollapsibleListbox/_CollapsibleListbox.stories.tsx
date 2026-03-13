import type { Meta, StoryObj } from '@storybook/react-vite';

import { CollapsibleListbox } from './_CollapsibleListbox';
import { type ICollapsibleListboxOption } from './_CollapsibleListbox.types';

const meta = {
	component: CollapsibleListbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/CollapsibleListbox',
} satisfies Meta<typeof CollapsibleListbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions: ICollapsibleListboxOption[] = [
	{ id: '1', label: 'Option 1', title: 'First Option' },
	{ id: '2', label: 'Option 2', title: 'Second Option' },
	{
		icon: 'play_arrow',
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

export const IconOnly: Story = {
	args: {
		...Default.args,
		showLabel: false,
	},
};

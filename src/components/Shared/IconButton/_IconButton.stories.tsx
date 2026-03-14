import type { Meta, StoryObj } from '@storybook/react-vite';

import { ICON_PATHS } from '../Icon/IconLibrary';
import { IconButton } from './_IconButton';

const meta = {
	argTypes: {
		icon: {
			control: { type: 'select' },
			options: Object.keys(ICON_PATHS),
		},
		size: {
			control: { type: 'radio' },
			options: ['sm', 'md', 'lg'],
		},
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'danger', 'ghost'],
		},
	},
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Actions/IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		'aria-label': 'Launch app',
		icon: 'play_arrow',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		'aria-label': 'Open settings',
		icon: 'crown',
		variant: 'secondary',
	},
};

export const Danger: Story = {
	args: {
		'aria-label': 'Delete item',
		icon: 'remove',
		variant: 'danger',
	},
};

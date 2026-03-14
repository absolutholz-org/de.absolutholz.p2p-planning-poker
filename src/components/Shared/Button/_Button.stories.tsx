import type { Meta, StoryObj } from '@storybook/react-vite';

import { ICON_PATHS } from '../Icon/IconLibrary';
import { Button } from './_Button';

const meta = {
	args: {
		children: 'Button Label',
		variant: 'primary',
	},
	argTypes: {
		icon: {
			control: { type: 'select' },
			options: [undefined, ...Object.keys(ICON_PATHS)],
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
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Actions/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
	args: {
		...Default.args,
		variant: 'secondary',
	},
};

export const Danger: Story = {
	args: {
		...Default.args,
		variant: 'danger',
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const WithIcon: Story = {
	args: {
		...Default.args,
		icon: 'play_arrow',
	},
};

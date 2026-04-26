import type { Meta, StoryObj } from '@storybook/react-vite';

import { color } from '../../../theme/colors';
import { Stack } from './_Stack';

const meta = {
	argTypes: {
		align: {
			control: 'select',
			options: ['start', 'center', 'end', 'stretch', 'baseline'],
		},
		crossSpacing: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
		},
		direction: {
			control: 'radio',
			options: ['row', 'column'],
		},
		justify: {
			control: 'select',
			options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
		},
		spacing: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
		},
		wrap: { control: 'boolean' },
	},
	component: Stack,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/Stack',
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ color = color('primary'), size = '50px' }) => (
	<div
		style={{
			backgroundColor: color,
			borderRadius: 'var(--sys-radius-sm)',
			height: size,
			opacity: 0.7,
			width: size,
		}}
	/>
);

export const Column: Story = {
	args: {
		children: (
			<>
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</>
		),
		direction: 'column',
		spacing: 'md',
	},
};

export const Row: Story = {
	args: {
		children: (
			<>
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</>
		),
		direction: 'row',
		spacing: 'md',
	},
};

export const Nested: Story = {
	args: {
		children: (
			<>
				<Stack direction="row" spacing="md" justify="center">
					<Placeholder color={color('success')} />
					<Placeholder color={color('success')} />
				</Stack>
				<Stack direction="row" spacing="md" justify="between">
					<Placeholder color={color('warning')} />
					<Placeholder color={color('warning')} />
					<Placeholder color={color('warning')} />
				</Stack>
			</>
		),
		direction: 'column',
		spacing: 'xl',
	},
};

export const WrappedWithMixedSpacing: Story = {
	args: {
		children: (
			<>
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</>
		),
		crossSpacing: 'xl',
		direction: 'row',
		spacing: 'sm',
		wrap: true,
	},
};

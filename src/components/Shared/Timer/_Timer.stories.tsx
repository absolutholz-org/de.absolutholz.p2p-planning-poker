import type { Meta, StoryObj } from '@storybook/react-vite';

import { Timer } from '.';
import type { ITimer } from './_Timer.types';

const meta: Meta<ITimer> = {
	component: Timer,
	decorators: [
		(Story) => (
			<div style={{ padding: '2rem' }}>
				<Story />
			</div>
		),
	],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Shared/Timer',
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

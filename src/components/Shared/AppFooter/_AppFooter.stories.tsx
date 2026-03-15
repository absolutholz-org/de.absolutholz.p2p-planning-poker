import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { AppFooter } from './_AppFooter';

const meta = {
	component: AppFooter,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	title: 'Contextual/AppFooter',
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story for the AppFooter.
 * It automatically respects the global locale and theme settings.
 */
export const Default: Story = {};

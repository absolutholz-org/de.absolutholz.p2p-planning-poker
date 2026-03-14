import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageContainer } from '.';

const meta = {
	component: PageContainer,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	title: 'Primitives/Layout/PageContainer',
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<div
				style={{
					backgroundColor: 'var(--sys-color-surface)',
					border: '1px solid var(--sys-color-border)',
					borderRadius: 'var(--sys-radius-lg)',
					marginBottom: 'var(--sys-spacing-xl)',
					marginTop: 'var(--sys-spacing-xl)',
					padding: 'var(--sys-spacing-xl)',
				}}
			>
				<h2 style={{ marginBottom: 'var(--sys-spacing-md)' }}>
					Page Content
				</h2>
				<p style={{ marginBottom: 'var(--sys-spacing-sm)' }}>
					This content is constrained by the PageContainer.
				</p>
				<p>
					Resize the browser to see the max-width and internal padding
					in action. At larger views, it will stay centered and not
					exceed the max width. At smaller resolutions, it will
					conform to the screen and ensure the sides have padding.
				</p>
			</div>
		),
	},
};

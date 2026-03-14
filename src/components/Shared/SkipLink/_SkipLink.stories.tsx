import type { Meta, StoryObj } from '@storybook/react-vite';

import { SkipLink } from './_SkipLink';

const meta = {
	component: SkipLink,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	title: 'Primitives/Actions/SkipLink',
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<>
			<SkipLink {...args} />
			<div style={{ height: '100vh', padding: '2rem' }}>
				<p>Press Tab to see the Skip link.</p>
				<header
					style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}
				>
					Header Content
				</header>
				<main
					id="main-content"
					tabIndex={-1}
					style={{ padding: '2rem' }}
				>
					<h1>Main Content</h1>
					<p>This is the target of the skip link.</p>
				</main>
			</div>
		</>
	),
};

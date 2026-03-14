import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './_Icon';
import { ICON_PATHS } from './IconLibrary';

const meta: Meta<typeof Icon> = {
	argTypes: {
		color: { control: 'color' },
		label: { control: 'text' },
		name: {
			control: { type: 'select' },
			options: Object.keys(ICON_PATHS),
		},
		size: {
			control: { type: 'radio' },
			options: [16, 20, 24],
		},
	},

	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	title: 'Primitives/Display/Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
	args: {
		name: 'user',
		size: 24,
	},
};

export const Gallery: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gap: '2rem',
				gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
				padding: '2rem',
				width: '100vw',
			}}
		>
			{Object.keys(ICON_PATHS).map((name) => (
				<div
					key={name}
					style={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						gap: '0.5rem',
					}}
				>
					<div style={{ color: 'var(--sys-color-primary)' }}>
						<Icon name={name} size={24} />
					</div>
					<code style={{ fontSize: '0.8rem', opacity: 0.7 }}>
						{name}
					</code>
				</div>
			))}
		</div>
	),
};
export const Emoji: Story = {
	args: {
		label: 'Rocket Emoji',
		name: '🚀',
		size: 24,
	},
};

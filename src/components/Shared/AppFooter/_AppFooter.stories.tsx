import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';

import i18n from '../../../i18n/config';
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

export const Default: Story = {};

export const German: Story = {
	decorators: [
		(Story) => {
			useEffect(() => {
				i18n.changeLanguage('de');
			}, []);
			return <Story />;
		},
	],
};

export const English: Story = {
	decorators: [
		(Story) => {
			useEffect(() => {
				i18n.changeLanguage('en');
			}, []);
			return <Story />;
		},
	],
};

export const PortugueseFallback: Story = {
	decorators: [
		(Story) => {
			useEffect(() => {
				i18n.changeLanguage('pt');
			}, []);
			return <Story />;
		},
	],
};

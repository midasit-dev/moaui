import type { Meta, StoryObj } from '@storybook/react';
import Tab from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Tab',
  component: Tab,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 1,
		label: "Single Tab",
	},
};

import type { Meta, StoryObj } from '@storybook/react';
import Component from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Check',
  component: Component,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
		name: "Check",
  },
};

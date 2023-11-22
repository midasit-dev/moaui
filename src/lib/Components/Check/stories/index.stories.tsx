import type { Meta, StoryObj } from '@storybook/react';
import Check from "../";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Check',
  component: Check,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof Check>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
		name: "Check",
  },
};

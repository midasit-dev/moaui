import type { Meta, StoryObj } from '@storybook/react';
import Icon from "..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Icon',
  component: Icon,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
	args: {
		iconName: "Add",
	},
};

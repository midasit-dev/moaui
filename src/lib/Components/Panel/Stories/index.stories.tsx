import type { Meta, StoryObj } from '@storybook/react';
import Panel from "..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Panel',
  component: Panel,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shadow: Story = {
	args: {
		children: "",
		width: "100px",
		height: "100px",
		variant: "shadow",
		flexItem: true,
	},
};

export const Strock: Story = {
	args: {
		children: "",
		width: "100px",
		height: "100px",
		variant: "strock",
		flexItem: true,
	},
};

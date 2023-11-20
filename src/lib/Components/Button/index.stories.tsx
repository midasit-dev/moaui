import type { Meta, StoryObj } from '@storybook/react';
import Component from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Button',
  component: Component,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
  argTypes: {
		onClick: { control: 'none' },
    color: { control: 'text' },
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "contained",
		disabled: false,
		width: "auto",
		color: "normal",
  },
};

export const Outlined: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "outlined",
		disabled: false,
		width: "auto",
		color: "normal",
  },
};

export const Text: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "text",
		disabled: false,
		width: "auto",
		color: "normal",
  },
};
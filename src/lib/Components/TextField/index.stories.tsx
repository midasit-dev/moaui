import type { Meta, StoryObj } from '@storybook/react';
import Textfield from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Textfield',
  component: Textfield,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
	args: {
		width: "100px",
		placeholder: "placeholder",
		title: "title",
		titlePosition: "left",
		disabled: false,
		defaultValue: "",
		error: false,
	}
};

export const Label: Story = {
	args: {
		width: "100px",
		placeholder: "placeholder",
		title: "title",
		titlePosition: "label",
		disabled: false,
		defaultValue: "",
		error: false,
	}
};

export const Right: Story = {
	args: {
		width: '100px',
		placeholder: "placeholder",
		title: "title",
		titlePosition: "right",
		disabled: false,
		defaultValue: "",
		error: false,
	}
};

export const Error: Story = {
	args: {
		placeholder: "placeholder",
		title: "title",
		titlePosition: "left",
		disabled: false,
		defaultValue: "",
		error: true,
	}
};
import type { Meta, StoryObj } from '@storybook/react';
import Switch from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Switch',
  component: Switch,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Switch",
		checked: true,
		onChange: () => {},
		disabled: false
	}
};

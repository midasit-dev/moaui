import type { Meta, StoryObj } from '@storybook/react';
import Radio from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Radio',
  component: Radio,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		checked: false,
		onChange: () => {},
		value: 0,
		name: "Radio",
	},
};

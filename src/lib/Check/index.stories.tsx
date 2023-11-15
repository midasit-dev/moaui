import type { Meta, StoryObj } from '@storybook/react';
import Component from ".";

const meta = {
  title: 'Components/Check',
  component: Component,
  parameters: { layout: 'centered', },
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
		name: "Checked",
		checked: true,
  },
};

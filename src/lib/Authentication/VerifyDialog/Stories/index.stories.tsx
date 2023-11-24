import type { Meta, StoryObj } from '@storybook/react';
import VerifyDialog from "..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Authentication/VerifyDialog',
  component: VerifyDialog,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof VerifyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
		preventRedirect: true
	},
};

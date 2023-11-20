import type { Meta, StoryObj } from '@storybook/react';
import VerifyDialog from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Authentication/VerifyUtil',
  parameters: { 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof VerifyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return <></>
	}
};

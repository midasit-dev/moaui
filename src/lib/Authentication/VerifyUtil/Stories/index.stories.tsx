import type { Meta, StoryObj } from '@storybook/react';
import VerifyDialog from "..";
import Explore from "./Exlpore.mdx";

const meta = {
  title: 'Authentication/VerifyUtil',
  parameters: { 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof VerifyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
	render: () => {
		return <></>
	}
};

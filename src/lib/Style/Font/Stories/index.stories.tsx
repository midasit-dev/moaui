import type { Meta, StoryObj } from '@storybook/react';
import Font from "..";
import Explore from "./Explore.mdx";

const meta = {
  title: 'Style/Font',
	parameters: {
		docs: { page: Explore }
	},
  tags: ['autodocs'],
} satisfies Meta<typeof Font>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: () => {
		return <></>
	}
}
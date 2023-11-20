import type { Meta, StoryObj } from '@storybook/react';
import IconButton from ".";
import { Icon } from "../..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <div />,
		onClick: () => {},
	},
	render: ({ onClick }) => {
		return (
			<IconButton
				onClick={onClick}
			>
				<Icon iconName="Add" />
			</IconButton>
		)
	}
};

import type { Meta, StoryObj } from '@storybook/react';
import IconButton from "..";
import { Icon } from "../../..";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { AddCode, CloseCode } from '../Code';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add = LiveEditStory(cleanMask(AddCode));
export const Close = LiveEditStory(cleanMask(CloseCode));

export const Sample: Story = {
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

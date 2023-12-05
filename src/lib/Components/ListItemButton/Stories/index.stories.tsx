import type { Meta, StoryObj } from '@storybook/react';
import ListItemButton from "..";
import Explore from "./Explore.mdx";
import { Typography } from "../../..";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { DefaultCode } from '../Code';

const meta = {
  title: 'Components/ListItemButton',
  component: ListItemButton,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof ListItemButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = LiveEditStory(cleanMask(DefaultCode));

export const Sample: Story = {
	args: {
		padding: 1
	},
	render: ({padding}) => {
		return (
			<ListItemButton padding={padding}>
				<Typography>List Item Button</Typography>
			</ListItemButton>
    );
	}
};

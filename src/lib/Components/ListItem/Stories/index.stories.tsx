import type { Meta, StoryObj } from '@storybook/react';
import { ListItem, ListItemButton, Typography, Check } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { DefaultCode } from '../Code';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = LiveEditStory(cleanMask(DefaultCode));

export const Sample: Story = {
	args: {
		paddingLeft: 0,
		disableGutters: false,
		secondaryAction: <Check />,
	},
	render: ({paddingLeft, disableGutters, secondaryAction}) => {
		return (
      <ListItem
				paddingLeft={paddingLeft}
        disableGutters={disableGutters}
        secondaryAction={secondaryAction}
      >
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button</Typography>
        </ListItemButton>
      </ListItem>
    );
	}
};

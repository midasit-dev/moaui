import type { Meta, StoryObj } from '@storybook/react';
import List from "..";
import Explore from "./Explore.mdx";
import { ListItem, ListItemButton, Typography, Check } from "../../..";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	ControlledCode, 
	UnControlledCode, 
	DynamicCode,
	TypographyRadioCode,
} from '../Code';

const meta = {
  title: 'Components/List',
  component: List,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled = LiveEditStory(cleanMask(ControlledCode));
export const UnControlled = LiveEditStory(cleanMask(UnControlledCode));
export const Dynamic = LiveEditStory(cleanMask(DynamicCode));
export const TypographyRadio = LiveEditStory(cleanMask(TypographyRadioCode));

export const Sample: Story = {
	args: {
		dense: true,
		disablePadding: true,
	},
	render: ({dense, disablePadding}) => {
		return (
      <List dense={dense} disablePadding={disablePadding}>
        <ListItem 
          paddingLeft={0}
          disableGutters={false}
          secondaryAction={<Check />}
        >
          <ListItemButton padding={0.8}>
            <Typography marginLeft={1}>List Item Button 1</Typography>
          </ListItemButton>
        </ListItem>
				<ListItem 
          paddingLeft={0}
          disableGutters={false}
          secondaryAction={<Check />}
        >
          <ListItemButton padding={0.8}>
            <Typography marginLeft={1}>List Item Button 2</Typography>
          </ListItemButton>
        </ListItem>
				<ListItem 
          paddingLeft={0}
          disableGutters={false}
          secondaryAction={<Check />}
        >
          <ListItemButton padding={0.8}>
            <Typography marginLeft={1}>List Item Button 3</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    );
	}
};

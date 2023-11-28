import type { Meta, StoryObj } from '@storybook/react';
import Seperator from "..";
import { Panel, Typography } from '../../..';
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { HorizontalCode, VerticalCode } from '../Code';

const meta = {
  title: 'Components/Seperator',
  component: Seperator,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Seperator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal = LiveEditStory(cleanMask(HorizontalCode));
export const Vertical = LiveEditStory(cleanMask(VerticalCode));

export const Sample: Story = {
	args: {
		direction: "horizontal",
	},
	render: ({direction}) => {
		return (
			<Panel width='auto' height='auto' flexItem={direction === 'vertical' ? true : false}>
				<Typography>Section 1</Typography>
				<Seperator direction={direction}/>
				<Typography>Section 2</Typography>
			</Panel>
		)
	}
};

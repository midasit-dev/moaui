import type { Meta, StoryObj } from "@storybook/react";
import GuideBox from "..";
import Explore from "./Explore.mdx";
import { Button } from "../../..";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	Basic300x300Code,
	RowDirectionCode,
	LayoutSample1Code,
	LayoutSample2Code,
} from "../Code";

const meta = {
  title: "Components/GuideBox",
  component: GuideBox,
  parameters: {
    layout: "centered",
		docs: { page: Explore }
  },
	tags: ['autodocs'],
} satisfies Meta<typeof GuideBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic300x300 = LiveEditStory(cleanMask(Basic300x300Code));
export const RowDirection = LiveEditStory(cleanMask(RowDirectionCode));
export const LayoutSample1 = LiveEditStory(cleanMask(LayoutSample1Code));
export const LayoutSample2 = LiveEditStory(cleanMask(LayoutSample2Code));

export const Sample: Story = {
  args: {
		show: true,
		fill: '2',
		padding: 2,
		itemDirection: 'row',
  },
	render: ({ show, fill, padding, itemDirection }) => {
		return (
			<GuideBox 
				show={show} 
				fill={fill} 
				padding={padding}
				itemDirection={itemDirection}
			>
				<Button>Button 1</Button>
				<Button color="negative">Button 2</Button>
				<Button>Button 3</Button>
				<Button color="negative">Button 4</Button>
			</GuideBox>
		);
	}
};
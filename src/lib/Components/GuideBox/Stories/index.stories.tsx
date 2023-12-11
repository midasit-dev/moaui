import type { Meta, StoryObj } from "@storybook/react";
import GuideBox from "..";
import Explore from "./Explore.mdx";
import { Button } from "../../..";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	Basic300x300Code,
	RowDirectionCode,
	Layout1Code,
	Layout1_SampleCode,
	Layout2Code,
	Layout2_SampleCode,
	Layout3Code,
	Layout3_SampleCode,
	Layout4Code,
	Layout4_SampleCode,
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
export const Layout1 = LiveEditStory(cleanMask(Layout1Code));
export const Layout1_Sample = LiveEditStory(cleanMask(Layout1_SampleCode));
export const Layout2 = LiveEditStory(cleanMask(Layout2Code));
export const Layout2_Sample = LiveEditStory(cleanMask(Layout2_SampleCode));
export const Layout3 = LiveEditStory(cleanMask(Layout3Code));
export const Layout3_Sample = LiveEditStory(cleanMask(Layout3_SampleCode));
export const Layout4 = LiveEditStory(cleanMask(Layout4Code));
export const Layout4_Sample = LiveEditStory(cleanMask(Layout4_SampleCode));

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
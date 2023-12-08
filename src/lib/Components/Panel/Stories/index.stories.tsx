import type { Meta, StoryObj } from '@storybook/react';
import Panel from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	BoxCode, 
	ShadowCode, 
	StrockCode,
	TypographyTextFieldStatefulCode,
	TypographyDropListStatefulCode,
} from "../Code";

const meta = {
  title: 'Components/Panel',
  component: Panel,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Box = LiveEditStory(cleanMask(BoxCode));
export const Shadow = LiveEditStory(cleanMask(ShadowCode));
export const Strock = LiveEditStory(cleanMask(StrockCode));
export const TypographyTextFieldStateful = LiveEditStory(cleanMask(TypographyTextFieldStatefulCode));
export const TypographyDropListStateful = LiveEditStory(cleanMask(TypographyDropListStatefulCode));

export const Sample: Story = {
	args: {
		children: "",
		width: "100px",
		height: "100px",
		variant: "shadow",
		flexItem: true,
	},
};

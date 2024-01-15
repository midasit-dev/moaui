import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { 
	CompositeCode, 
	ContainedCode, 
	OutlinedCode, 
	TextCode, 
	NormalCode, 
	NegativeCode, 
	WidthCode,
	LoadingCode,
} from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composite = LiveEditStory(cleanMask(CompositeCode));
export const Contained = LiveEditStory(cleanMask(ContainedCode));
export const Outlined = LiveEditStory(cleanMask(OutlinedCode));
export const Text = LiveEditStory(cleanMask(TextCode));
export const Normal = LiveEditStory(cleanMask(NormalCode));
export const Negative = LiveEditStory(cleanMask(NegativeCode));
export const Width = LiveEditStory(cleanMask(WidthCode));
export const Loading = LiveEditStory(cleanMask(LoadingCode));

export const Sample: Story = {
  args: {
    children: "Button",
    onClick: () => {},
    variant: "contained",
    disabled: false,
    width: "auto",
    color: "normal",
  },
};

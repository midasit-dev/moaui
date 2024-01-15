import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { 
	DefaultCode, 
} from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = LiveEditStory(cleanMask(DefaultCode));

export const Sample: Story = {
  args: {
    children: "Chip",
		size: "medium",
		label: "Chip",
		severity: "success",
  },
};

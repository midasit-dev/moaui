import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { 
	ErrorCode, 
} from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error = LiveEditStory(cleanMask(ErrorCode));

export const Sample: Story = {
  args: {
    children: "Alert",
  },
};

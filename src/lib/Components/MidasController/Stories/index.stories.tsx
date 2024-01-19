import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { 
	TitleCode, 
} from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/MidasController",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title = LiveEditStory(cleanMask(TitleCode));

export const Sample: Story = {
  args: {
    title: 'Plug-in Item Title'
  },
};

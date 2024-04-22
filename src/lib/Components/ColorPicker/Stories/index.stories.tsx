import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "../../../index";
import Explore from "./Explore.mdx";

// import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
// import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Composite = LiveEditStory(cleanMask(CompositeCode));

export const Sample: Story = {
  args: ColorPicker.defaultProps,
};

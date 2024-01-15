import type { Meta, StoryObj } from "@storybook/react";
import Moaui from "../../..";
import Docs from "./Canvas.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import {
	TestingApp1Code,
	TestingApp2Code,
	TestingApp3Code,
	TestingApp4Code,
 } from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Builder/Canvas",
  component: Moaui.Panel,
  parameters: {
    layout: "centered",
    docs: { page: Docs },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Moaui.Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestingApp1 = LiveEditStory(cleanMask(TestingApp1Code));
export const TestingApp2 = LiveEditStory(cleanMask(TestingApp2Code));
export const TestingApp3 = LiveEditStory(cleanMask(TestingApp3Code));
export const TestingApp4 = LiveEditStory(cleanMask(TestingApp4Code));

export const Sample: Story = {
	args: {
		children: "",
		width: "100px",
		height: "100px",
		variant: "shadow",
		flexItem: true,
	},
};

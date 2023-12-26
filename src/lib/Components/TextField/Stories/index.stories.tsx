import type { Meta, StoryObj } from '@storybook/react';
import Textfield from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { LeftCode, RightCode, LabelCode, ErrorCode, BasicCode } from '../Code';

const meta = {
  title: 'Components/TextField',
  component: Textfield,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = LiveEditStory(cleanMask(BasicCode));
export const Left = LiveEditStory(cleanMask(LeftCode));
export const Right = LiveEditStory(cleanMask(RightCode));
export const Label = LiveEditStory(cleanMask(LabelCode));
export const Error = LiveEditStory(cleanMask(ErrorCode));

export const Sample: Story = {
	args: {
		width: "100px",
		placeholder: "placeholder",
		title: "title",
		titlePosition: "left",
		disabled: false,
		defaultValue: "",
		error: false,
	}
};

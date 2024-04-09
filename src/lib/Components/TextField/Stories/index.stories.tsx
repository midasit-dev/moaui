import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { LeftCode, RightCode, LabelCode, ErrorCode, BasicCode, MultiLineCode, WrappedWidthCode } from '../Code';

const meta = {
  title: 'Components/TextField',
  component: TextField,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = LiveEditStory(cleanMask(BasicCode));
export const Left = LiveEditStory(cleanMask(LeftCode));
export const Right = LiveEditStory(cleanMask(RightCode));
export const Label = LiveEditStory(cleanMask(LabelCode));
export const Error = LiveEditStory(cleanMask(ErrorCode));
export const MultiLine = LiveEditStory(cleanMask(MultiLineCode));
export const WrappedWidth = LiveEditStory(cleanMask(WrappedWidthCode));

export const Sample: Story = {
	args: TextField.defaultProps,
};

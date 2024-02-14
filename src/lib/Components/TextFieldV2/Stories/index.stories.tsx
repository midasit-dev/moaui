import type { Meta, StoryObj } from '@storybook/react';
import { TextFieldV2 } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	LeftCode, 
	RightCode, 
	TopCode, 
	BottomCode,
	SinglelineTitleCode,
	ErrorCode, 
	CheckErrorAsFunctionCode,
	BasicCode, 
	MultiLineCode,
	NumberCode,
	NumberOptionCode,
	NumberOptionNegativeIntegerCode,
	NumberOptionPositiveIntegerCode,
	TitleInputScaleCode,
} from '../Code';

const meta = {
  title: 'Components/TextFieldV2',
  component: TextFieldV2,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof TextFieldV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = LiveEditStory(cleanMask(BasicCode));
export const Left = LiveEditStory(cleanMask(LeftCode));
export const Right = LiveEditStory(cleanMask(RightCode));
export const Top = LiveEditStory(cleanMask(TopCode));
export const Bottom = LiveEditStory(cleanMask(BottomCode));
export const SinglelineTitle = LiveEditStory(cleanMask(SinglelineTitleCode));
export const Error = LiveEditStory(cleanMask(ErrorCode));
export const CheckErrorAsFunction = LiveEditStory(cleanMask(CheckErrorAsFunctionCode));
export const MultiLine = LiveEditStory(cleanMask(MultiLineCode));
export const Number = LiveEditStory(cleanMask(NumberCode));
export const NumberOption = LiveEditStory(cleanMask(NumberOptionCode));
export const NumberOptionNegativeInteger = LiveEditStory(cleanMask(NumberOptionNegativeIntegerCode));
export const NumberOptionPositiveInteger = LiveEditStory(cleanMask(NumberOptionPositiveIntegerCode));
export const TitleInputScale = LiveEditStory(cleanMask(TitleInputScaleCode));

export const Sample: Story = {
	args: TextFieldV2.sampleProps,
};

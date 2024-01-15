import type { Meta, StoryObj } from '@storybook/react';
import { Check } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	NotRequiredCode,
	RequiredCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/Check',
  component: Check,
  parameters: { 
		layout: 'centered', 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof Check>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotRequired = LiveEditStory(cleanMask(NotRequiredCode));
export const Required = LiveEditStory(cleanMask(RequiredCode));

export const Sample: Story = {
  args: {
		name: "Check",
		disabled: false,
		required: false,
  },
};

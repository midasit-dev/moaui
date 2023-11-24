import type { Meta, StoryObj } from '@storybook/react';
import Check from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	NotRequiredCode,
	RequiredCode,
} from '../Code';

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

export const NotRequired = LiveEditStory(NotRequiredCode);
export const Required = LiveEditStory(RequiredCode);

export const Sample: Story = {
  args: {
		name: "Check",
		disabled: false,
		required: false,
  },
};

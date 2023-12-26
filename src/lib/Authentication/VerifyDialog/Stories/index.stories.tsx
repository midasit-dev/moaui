import type { Meta, StoryObj } from '@storybook/react';
import VerifyDialog from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { DefaultCode, LoadingCode } from "../Code";

const meta = {
  title: 'Authentication/VerifyDialog',
  component: VerifyDialog,
  parameters: { 
		layout: 'centered', 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof VerifyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = LiveEditStory(cleanMask(DefaultCode));
export const Loading = LiveEditStory(cleanMask(LoadingCode));

export const Sample: Story = {
  args: {
		preventRedirect: true
	},
};

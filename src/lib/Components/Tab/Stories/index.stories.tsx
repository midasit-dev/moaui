import type { Meta, StoryObj } from '@storybook/react';
import Tab from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { LabelCode } from '../Code';

const meta = {
  title: 'Components/Tab',
  component: Tab,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label = LiveEditStory(cleanMask(LabelCode));

export const Sample: Story = {
	args: {
		value: 1,
		label: "Tab Text",
	},
};

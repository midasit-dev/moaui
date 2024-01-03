import type { Meta, StoryObj } from '@storybook/react';
import Icon from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { AddCode, CloseCode, ToButtonCode } from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/Icon',
  component: Icon,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add = LiveEditStory(cleanMask(AddCode));
export const Close = LiveEditStory(cleanMask(CloseCode));
export const ToButton = LiveEditStory(cleanMask(ToButtonCode));

export const Sample: Story = {
	args: {
		iconName: "Add",
	},
};

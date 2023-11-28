import type { Meta, StoryObj } from '@storybook/react';
import Radio from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { NameCode } from '../Code';

const meta = {
  title: 'Components/Radio',
  component: Radio,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Name = LiveEditStory(cleanMask(NameCode));

export const Sample: Story = {
	args: {
		onChange: () => {},
		value: 0,
		name: "Radio",
	},
};

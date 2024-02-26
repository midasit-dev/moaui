import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { LabelCode } from '../Code';

const meta = {
  title: 'Components/Switch',
  component: Switch,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label = LiveEditStory(cleanMask(LabelCode));

export const Sample: Story = {
	args: {
		label: "Switch Label",
		onChange: () => {},
		disabled: false
	}
};

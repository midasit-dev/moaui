import type { Meta, StoryObj } from '@storybook/react';
import { SpreadSheet } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	ColumnLabelsCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/SpreadSheet',
  component: SpreadSheet,
  parameters: { 
		layout: 'centered', 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof SpreadSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColumnLabels = LiveEditStory(cleanMask(ColumnLabelsCode));

export const Sample: Story = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { RowCode, ColumnCode } from '../Code';

const meta = {
  title: 'Components/Stack',
  component: Stack,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row = LiveEditStory(cleanMask(RowCode));
export const Column = LiveEditStory(cleanMask(ColumnCode));

export const Sample: Story = {
	args: {
		direction: "row",
		spacing: 2,
	},
	render: ({direction, spacing}) => {
		return (
			<Stack direction={direction} spacing={spacing}>
				<Typography>Row 1</Typography>
				<Typography>Row 2</Typography>
			</Stack>
		)
	}
};

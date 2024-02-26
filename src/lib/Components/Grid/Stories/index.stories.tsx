import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Typography, Panel } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { ItemsCode, RowCode, ColumnCode } from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/Grid',
  component: Grid,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore, },
		layout: 'centered',
	},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Items = LiveEditStory(cleanMask(ItemsCode));
export const Row = LiveEditStory(cleanMask(RowCode));
export const Column = LiveEditStory(cleanMask(ColumnCode));

export const Sample: Story = {
	args: {},
	render: () => {
		return (
			<Panel width="200px">
				<Typography variant="h1" marginBottom="10px">Grid Demo</Typography>
				<Grid container>
					<Grid item xs={6}>
						<Typography>Grid item 1</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography>Grid item 2</Typography>
					</Grid>
				</Grid>
			</Panel>
		)
	}
};

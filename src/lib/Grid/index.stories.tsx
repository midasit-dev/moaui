import type { Meta, StoryObj } from '@storybook/react';
import Docs from "./Docs.mdx";
import Grid from ".";
import Typography from "./../Typography";

const meta = {
  title: 'Components/Grid',
  component: Grid,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs, },
		layout: 'centered',
	},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<Grid container>
				<Grid item xs={6}>
					<Typography>Grid item 1</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>Grid item 2</Typography>
				</Grid>
			</Grid>
		)
	}
};

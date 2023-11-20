import type { Meta, StoryObj } from '@storybook/react';
import Stack from ".";
import { Typography } from "../../";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Stack',
  component: Stack,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
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

export const Column: Story = {
	args: {
		direction: "column",
		spacing: 2,
	},
	render: ({direction, spacing}) => {
		return (
			<Stack direction={direction} spacing={spacing}>
				<Typography>Column 1</Typography>
				<Typography>Column 2</Typography>
			</Stack>
		)
	}
};
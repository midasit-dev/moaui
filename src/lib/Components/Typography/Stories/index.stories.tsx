import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { H1Code, Body1Code, Body2Code, Body3Code, SingleLineCode } from '../Code';

const meta = {
  title: 'Components/Typography',
  component: Typography,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1 = LiveEditStory(cleanMask(H1Code));
export const Body1 = LiveEditStory(cleanMask(Body1Code));
export const Body2 = LiveEditStory(cleanMask(Body2Code));
export const Body3 = LiveEditStory(cleanMask(Body3Code));
export const SingleLine = LiveEditStory(cleanMask(SingleLineCode));

export const Sample: Story = {
	args: {
		children: "Typography",
		variant: "body1",
		color: "primary"
	},
	render: ({children, variant, color}) => {
		return (
			<Typography variant={variant} color={color}>
				{children}
			</Typography>
		)
	}
};
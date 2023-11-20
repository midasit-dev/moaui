import type { Meta, StoryObj } from '@storybook/react';
import Typography from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Typography',
  component: Typography,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
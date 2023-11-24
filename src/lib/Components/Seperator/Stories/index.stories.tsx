import type { Meta, StoryObj } from '@storybook/react';
import Seperator from "..";
import { Panel, Typography } from '../../..';
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Seperator',
  component: Seperator,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Seperator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		direction: "horizontal",
	},
	render: ({direction}) => {
		return (
			<Panel width='auto' height='auto'>
				<Typography>horizontal</Typography>
				<Seperator direction={direction}/>
				<Typography>horizontal</Typography>
			</Panel>
		)
	}
};

export const Verical: Story = {
	args: {
		direction: "vertical",
	},
	render: ({direction}) => {
		return (
			<Panel flexItem>
				<Typography>vertical</Typography>
				<Seperator direction="vertical" />
				<Typography>vertical</Typography>
			</Panel>
		)
	}
};

import type { Meta, StoryObj } from '@storybook/react';

import SwitchGroup from ".";
import { Switch } from "../../";

import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/SwitchGroup',
  component: SwitchGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof SwitchGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "SwitchGroup",
	},
	render: ({text}) => {
		return (
			<SwitchGroup text={text}>
				<Switch label="Switch 1" />
				<Switch label="Switch 2" />
				<Switch label="Switch 3" />
			</SwitchGroup>
		)
	}
};

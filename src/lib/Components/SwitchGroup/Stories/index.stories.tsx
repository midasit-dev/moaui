import type { Meta, StoryObj } from '@storybook/react';

import { SwitchGroup, Switch } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { ControlledCode, UnControlledCode } from '../Code';

const meta = {
  title: 'Components/SwitchGroup',
  component: SwitchGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof SwitchGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled = LiveEditStory(cleanMask(ControlledCode));
export const UnControlled = LiveEditStory(cleanMask(UnControlledCode));

export const Sample: Story = {
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

import type { Meta, StoryObj } from '@storybook/react';
import CheckGroup from "..";
import { Check } from "../../..";
import Exlpore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { ControlledCode, UnControlledCode } from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/CheckGroup',
  component: CheckGroup,
  parameters: { 
		layout: 'centered', 
		docs: { page: Exlpore, },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof CheckGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled = LiveEditStory(cleanMask(ControlledCode));
export const UnControlled = LiveEditStory(cleanMask(UnControlledCode));

export const Sample: Story = {
	args: {
		text: "Check Group"
	},
	render: ({ text	}) => {
		return (
			<CheckGroup text={text}>
				<Check name='Check 1' />
				<Check name='Check 2' />
			</CheckGroup>
		)
	}
};

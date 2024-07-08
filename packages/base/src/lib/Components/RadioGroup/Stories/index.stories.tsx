import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { UnControlledCode, ControlledCode, DataSetCode } from '../Code';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnControlled = LiveEditStory(cleanMask(UnControlledCode));
export const Controlled = LiveEditStory(cleanMask(ControlledCode));
export const DataSet = LiveEditStory(cleanMask(DataSetCode));

export const Sample: Story = {
	args: {
		onChange: () => {},
		value: "Value 1",
		name: "RadioGroup",
		text: "Header Text",
	},
	render: ({onChange, value, text}) => {
		return (
			<RadioGroup onChange={onChange} value={value} text={text}>
				<Radio name="Value 1" value="Value 1" />
				<Radio name="Value 2" value="Value 2" />
			</RadioGroup>
		)
	}
};

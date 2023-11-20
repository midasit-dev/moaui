import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from ".";
import { Radio } from "../..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onChange: () => {},
		value: 0,
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

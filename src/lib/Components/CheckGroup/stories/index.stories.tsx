import type { Meta, StoryObj } from '@storybook/react';
import CheckGroup from "../";
import { Check } from "../../../";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/CheckGroup',
  component: CheckGroup,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs, },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof CheckGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
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
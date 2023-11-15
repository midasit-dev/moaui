import type { Meta, StoryObj } from '@storybook/react';
import CheckGroup from ".";
import Check from "./../Check"
import { Fragment, useState } from 'react';

const meta = {
  title: 'Components/CheckGroup',
  component: CheckGroup,
  parameters: { layout: 'centered', },
  tags: ['autodocs'],
  argTypes: {
	},
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
				<Check name='Checked' checked={true} />
				<Check name='UnChecked' checked={false} />
			</CheckGroup>
		)
	}
};

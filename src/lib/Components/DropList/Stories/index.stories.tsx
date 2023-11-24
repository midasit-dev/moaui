import type { Meta, StoryObj } from '@storybook/react';
import Docs from "./Docs.mdx";
import Component from "..";

const meta = {
  title: 'Components/DropList',
  component: Component,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs, },
		layout: 'centered',
	},
	argTypes: {
		itemList: { control: 'array' },
		value: { control: 'text' },
		width: { control: 'text' },
		defaultValue: { control: 'text' },
	}
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
		itemList: () => { return new Map<string, number>([ ['1', 1], ['2', 2], ['3', 3], ['4', 4] ]); },
		value: '1',
		width: "100px",
		defaultValue: ""
  },
	render: ({ itemList, width, value, defaultValue }) => {
		return (
			<Component itemList={itemList} width={width} defaultValue={defaultValue} />
		)
	}
};

import type { Meta, StoryObj } from '@storybook/react';
import Explore from "./Explore.mdx";
import DropList from "..";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { DropdownCode, DisabledCode } from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/DropList',
  component: DropList,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore, },
		layout: 'centered',
	},
	argTypes: {
		itemList: { control: 'array' },
		value: { control: 'text' },
		width: { control: 'text' },
		defaultValue: { control: 'text' },
	}
} satisfies Meta<typeof DropList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown = LiveEditStory(cleanMask(DropdownCode));
export const Disabled = LiveEditStory(cleanMask(DisabledCode));

export const Sample: Story = {
  args: {
		itemList: () => { return new Map<string, number>([ ['1', 1], ['2', 2], ['3', 3], ['4', 4] ]); },
		value: '1',
		width: "100px",
		defaultValue: ""
  },
	render: ({ itemList, width, defaultValue }) => {
		return (
			<DropList 
				itemList={itemList} 
				width={width} 
				defaultValue={defaultValue}
			/>
		)
	}
};

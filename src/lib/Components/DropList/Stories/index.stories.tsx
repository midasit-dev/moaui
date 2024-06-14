import type { Meta, StoryObj } from '@storybook/react';
import { DropList } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { DropdownCode, DisabledCode, ListWidthCode, MaxLengthCode, ItemListFromArrayCode, DataSetCode } from '../Code';
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
export const ListWidth = LiveEditStory(cleanMask(ListWidthCode));
export const MaxLength = LiveEditStory(cleanMask(MaxLengthCode));
export const ItemListFromArray = LiveEditStory(cleanMask(ItemListFromArrayCode));
export const DataSet = LiveEditStory(cleanMask(DataSetCode));

export const Sample: Story = {
  args: {
		width: '100px',
		itemList: new Map([ ['Midas', 1], ['Civil', 2], ['Gen', 3], ['CIM', 4] ]),
		onChange: () => {},
		value: 1,
		defaultValue: 1,
		disabled: false,
		backgroundColor: 'white',
		listWidth: '100px',
		placeholder: 'placeholder',
		maxLength: 10,
	}
};

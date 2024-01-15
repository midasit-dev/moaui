import type { Meta, StoryObj } from '@storybook/react';
import { TabGroup, Tab } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	HorizontalCode, 
	VerticalCode, 
	WithDataGridCode,
	WithTableCode,
} from '../Code';

const meta = {
  title: 'Components/TabGroup',
  component: TabGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof TabGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal = LiveEditStory(cleanMask(HorizontalCode));
export const Vertical = LiveEditStory(cleanMask(VerticalCode));
export const WithDataGrid = LiveEditStory(cleanMask(WithDataGridCode));
export const WithTable = LiveEditStory(cleanMask(WithTableCode));

export const Sample: Story = {
	args: {
		value: 1,
	},
	render: ({value, onChange}) => {
		return (
			<TabGroup value={value} onChange={onChange}>
				<Tab value={1} label="Tab 1" />
				<Tab value={2} label="Tab 2" />
				<Tab value={3} label="Tab 3" />
			</TabGroup>
		)
	}
};

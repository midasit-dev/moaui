import type { Meta, StoryObj } from '@storybook/react';
import TabGroup from ".";
import { Tab } from "../../";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/TabGroup',
  component: TabGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof TabGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

import type { Meta, StoryObj } from '@storybook/react';
import Docs from './Docs.mdx';
import Component from ".";

const meta = {
  title: 'Components/DataGrid',
  component: Component,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
		columns: [
			{ field: 'id', headerName: 'ID', width: 70, editable: true, },
			{ field: 'firstName', headerName: 'First name', width: 130, editable: true },
			{ field: 'lastName', headerName: 'Last name', width: 130 },
		],
		rows: [
			{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
			{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
			{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		],
  },
};

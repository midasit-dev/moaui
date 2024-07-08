import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, Panel } from "../../../index";
import Explore from './Explore.mdx';

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	PaginationCode,
	RowUpdateCode,
	GridToolbarCode,
	CustomGridToolbarCode,
 } from '../Code';
import { cleanMask, } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
  parameters: { 
		layout: 'centered', 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pagination = LiveEditStory(cleanMask(PaginationCode));
export const RowUpdate = LiveEditStory(cleanMask(RowUpdateCode));
export const GridToolbar = LiveEditStory(cleanMask(GridToolbarCode));
export const CustomGridToolbar = LiveEditStory(cleanMask(CustomGridToolbarCode));

export const Sample: Story = {
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
	render: ({ columns, rows }) => {
		return (
			<Panel width='100%' height='200px'>
				<DataGrid 
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					checkboxSelection
				/>
			</Panel>
		)
	}
};

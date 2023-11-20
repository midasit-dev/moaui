import DataGrid from ".";
import { Panel, Typography } from "../../";

function DataGridDemo() {

	const singleSelectOptions = [
		"1", "2"
	];

	return (
		<div>
			<Panel variant="strock">
				<Typography>DataGrid</Typography>
				<DataGrid 
					columns={[
						{ field: 'id', headerName: 'ID', width: 70, editable: true, },
						{ field: 'firstName', headerName: 'First name', width: 130, editable: true },
						{ field: 'lastName', headerName: 'Last name', width: 130 },
						{
							field: 'age',
							headerName: 'Age',
							type: 'number',
							width: 90,
						},
						{
							field: "select",
							headerName: "Select Sample",
							type: "singleSelect",
							valueOptions: singleSelectOptions,
							width: 90,
							editable: true,
						},
						{
							field: 'fullName',
							headerName: 'Full name',
							description: 'This column has a value getter and is not sortable.',
							sortable: false,
							width: 160,
							valueGetter: (params: any) =>
								`${params?.getValue?.('firstName') || ''} ${params?.getValue?.('lastName') || ''}`,
						},
					]}
					rows={[
						{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
						{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
						{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
						{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
						{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
						{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
						{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
						{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
						{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
					]}
					autoHeight
					hideFooter
					hideFooterPagination
					hideFooterSelectedRowCount
				/>
			</Panel>

		</div>
	)
}

export default DataGridDemo;
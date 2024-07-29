import { Panel, DataGrid } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsDataGridPagination = () => {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70, editable: true, },
		{ field: 'firstName', headerName: 'First name', width: 130, editable: true },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
	];

	const rows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	];

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
	);
}/**${comma}*/

export default ComponentsDataGridPagination;



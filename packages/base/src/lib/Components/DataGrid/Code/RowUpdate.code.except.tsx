import React from 'react';
import { Panel, DataGrid, CodeBlock } from "@midasit-dev/moaui";

const ComponentsDataGridRowUpdate = () => {
	const [rows, setRows] = React.useState<Row[]>(rowModels);
	const processRowUpdateHandler = React.useCallback((newRow: any) => {
		setRows((prev: Row[]) => prev.map((row: Row) => row.id === newRow.id ? newRow : row));
		return newRow;
	}, [setRows]);

	return (
		<>
			<Panel variant='box' width={columnWidth * 2 + 5} height='200px' padding={0}>
				<DataGrid 
					rows={rows}
					columns={[
						{ ...defaultColumnProperties, field: 'firstName', headerName: 'First name', },
						{ ...defaultColumnProperties, field: 'lastName', 	headerName: 'Last name',  },
					]}
					hideFooter
					editMode='row'
					processRowUpdate={processRowUpdateHandler}
				/>
			</Panel>
			<CodeBlock language='json' title="json">{JSON.stringify(rows, null, 2)}</CodeBlock>
		</>
	);
}/**${comma}*/

export default ComponentsDataGridRowUpdate;/**${comma}*/

//for hoisting
//define Row interface
interface Row {
	id: number;
	[key: string]: any;
}
//for Column
const columnWidth = 100;
const defaultColumnProperties = {
	width: columnWidth,
	editable: true,
	sortable: false,
};
//for Row
const rowModels = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
];
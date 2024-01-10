import React from 'react';
import {
	TemplatesFunctionalComponentsDataGridWithClipboardOption
} from "@midasit-dev/moaui";

const columnsDefault = [
	{ field: "Col1", headerName: "Col1", width: 115, sortable: false },
	{ field: "Col2", headerName: "Col2", width: 115, sortable: false },
	{ field: "Col3", headerName: "Col3", width: 115, sortable: false },
];

const rowsDefault = [
	{ id: 1, Col1: "", Col2: "", Col3: "" },
	{ id: 2, Col1: "", Col2: "", Col3: "" },
	{ id: 3, Col1: "", Col2: "", Col3: "" },
];

const App = () => {
	const [columns, setColumns] = React.useState(columnsDefault);
	const [rows, setRows] = React.useState(rowsDefault);

	return (
		<TemplatesFunctionalComponentsDataGridWithClipboardOption
			columns={columns}
			rows={rows}
			setColumns={setColumns}
			setRows={setRows}
		/>
	)
}

export default App;
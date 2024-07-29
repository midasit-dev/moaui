import {
	GuideBox,
	DataGrid,
	DataGridToolbar,
} from '@midasit-dev/moaui-components-v1';

const App = () => {
	return (
		<GuideBox height={400}>
			<DataGrid
				columns={columnsDefault}
				rows={rowsDefault}
				columnMenu
				columnSelector
				columnFilter
				densitySelector
				disableRowSelectionOnClick
				slots={{
					toolbar: DataGridToolbar,
				}}
				hideFooter
			/>
		</GuideBox>
	)
}

export default App;

/**
 * columns and rows default values
 */
const columnsDefault = [
	{ field: "id", headerName: "ID", width: 30, sortable: false },
	{ field: "Col1", headerName: "Col1", width: 115, sortable: false, editable: true },
	{ field: "Col2", headerName: "Col2", width: 115, sortable: false, editable: true },
	{ field: "Col3", headerName: "Col3", width: 115, sortable: false, editable: true },
	{ field: "Col4", headerName: "Col4", width: 115, sortable: false, editable: true },
];

const rowsDefault = [
	{ id: 1, Col1: "", Col2: "", Col3: "", Col4: "" },
	{ id: 2, Col1: "", Col2: "", Col3: "", Col4: "" },
	{ id: 3, Col1: "", Col2: "", Col3: "", Col4: "" },
	{ id: 4, Col1: "", Col2: "", Col3: "", Col4: "" },
];
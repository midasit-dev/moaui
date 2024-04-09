import StyledComponent, { 
	type StyledProps, 
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
} from "./Styled";

/**
 * moaui Styled DataGrid
 * 
 * @param {StyledProps} props - onCellClick, onCellKeyDown, onCellEditStart, onCellEditStop, columnMenu, columnSelector, columnFilter, densitySelector, disableRowSelectionOnClick
 * @returns React.ReactElement
 */
export default function DataGrid(props: StyledProps) { return (<StyledComponent {...props} />) };

DataGrid.defaultProps = {
	rows: [],
	columns: [],
} as StyledProps;

const SampleProps = {
	rows: [
		{ id: 1, Col1: "", Col2: "", Col3: "", Col4: "" },
		{ id: 2, Col1: "", Col2: "", Col3: "", Col4: "" },
		{ id: 3, Col1: "", Col2: "", Col3: "", Col4: "" },
		{ id: 4, Col1: "", Col2: "", Col3: "", Col4: "" },
	],
	columns: [
		{ field: "id", headerName: "ID", width: 30, sortable: false },
		{ field: "Col1", headerName: "Col1", width: 30, sortable: false, editable: true },
		{ field: "Col2", headerName: "Col2", width: 30, sortable: false, editable: true },
		{ field: "Col3", headerName: "Col3", width: 30, sortable: false, editable: true },
		{ field: "Col4", headerName: "Col4", width: 30, sortable: false, editable: true },
	],
	pageSizeOptions: [5],
	hideFooter: false,
	initialState: {
		pagination: {
			paginationModel: {
				pageSize: 5,
			},
		},
	},
}

export {
	GridToolbar as DataGridToolbar,
	GridToolbarContainer as DataGridToolbarContainer,
	GridToolbarExport as DataGridToolbarExport,

	type StyledProps as DataGridProps,
	SampleProps as DataGridSample,
}
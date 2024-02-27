import StyledComponent, { 
	type StyledProps, 
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
} from "./Styled";

DataGrid.defaultProps = {
	rows: [],
	columns: [],
} as StyledProps;

/**
 * moaui Styled DataGrid
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function DataGrid(props: StyledProps) { return (<StyledComponent {...props} />) };

export {
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
}
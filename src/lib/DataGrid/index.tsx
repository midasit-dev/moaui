import StyledComponent, { type StyledProps } from "./Styled";

MoaDataGrid.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled DataGrid
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaDataGrid(props: StyledProps) { return (<StyledComponent {...props} />) };
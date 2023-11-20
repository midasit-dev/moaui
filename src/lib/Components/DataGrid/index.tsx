import StyledComponent, { type StyledProps } from "./Styled";

DataGrid.defaultProps = {
} as StyledProps;

/**
 * moaui Styled DataGrid
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function DataGrid(props: StyledProps) { return (<StyledComponent {...props} />) };
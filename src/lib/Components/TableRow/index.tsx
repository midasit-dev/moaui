import StyledComponent, { type StyledProps } from "./Styled";

TableRow.defaultProps = {
	hover: false,
	selected: false,
} as StyledProps;

/**
 * MoaUI Styled Table Row
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function TableRow(props: StyledProps) { return (<StyledComponent {...props} />) };
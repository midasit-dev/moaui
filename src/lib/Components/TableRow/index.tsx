import StyledComponent, { type StyledProps } from "./Styled";

TableRow.defaultProps = {
	hover: false,
	selected: false,
} as StyledProps;

/**
 * moaui Styled Table Row
 * 
 * @param {StyledProps} props - children, hover, selected
 * @example
 * <TableRow
 * 	hover={true || false}
 * 	selected={true || false}
 * >
 * 	{children}
 * </TableRow>
 * @returns React.ReactElement
 */
export default function TableRow(props: StyledProps) { return (<StyledComponent {...props} />) };
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Table Row
 * 
 * @param {StyledProps} props - children, hover, selected
 * @example
 * <TableRow
 * 	id=""
 * 	hover={true || false}
 * 	selected={true || false}
 * >
 * 	{children}
 * </TableRow>
 * @returns React.ReactElement
 */
export default function TableRow(props: StyledProps) { 
	const _props = { hover: false, selected: false, ...props} as StyledProps;
	return (<StyledComponent {..._props} />) 
};
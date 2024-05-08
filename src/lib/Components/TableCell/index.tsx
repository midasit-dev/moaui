import StyledComponent, { type StyledProps } from "./Styled";

TableCell.defaultProps = {
	align: 'center',
	padding: 'normal',
	size: 'medium',
	variant: 'body',
} as StyledProps;

/**
 * moaui Styled Table Cell
 * 
 * @param {StyledProps} props - align, children, padding, size, sortDirection, showCheckbox, hideLabel, showLeftIcon, showRightIcon, enabled
 * @example
 * <TableCell
 * 	id=""
 * 	align={'center'}
 * 	padding={'normal' || 'checkbox' || 'none'}
 * 	size={'medium'}
 * 	sortDirection={'asc' || 'desc' || false}
 * 	showCheckbox={true || false}
 * 	hideLabel={true || false}
 * 	showLeftIcon={true || false}
 * 	showRightIcon={true || false}
 * 	enabled={true || false}
 * >
 * 	{children}
 * </TableCell>
 * @returns React.ReactElement
 */
export default function TableCell(props: StyledProps) { return (<StyledComponent {...props} />) };
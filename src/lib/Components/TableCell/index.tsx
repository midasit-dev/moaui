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
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function TableCell(props: StyledProps) { return (<StyledComponent {...props} />) };
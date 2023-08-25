import StyledComponent, { type StyledProps } from "./Styled";

MoaTableCell.defaultProps = {
	align: 'center',
	padding: 'normal',
	size: 'medium',
	variant: 'body',
} as StyledProps;

/**
 * MoaUI Styled Table Cell
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaTableCell(props: StyledProps) { return (<StyledComponent {...props} />) };
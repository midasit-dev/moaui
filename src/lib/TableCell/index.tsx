import StyledComponent, { type StyledProps } from "./Styled";

MoaTableCell.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Table Cell
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaTableCell(props: StyledProps) { return (<StyledComponent {...props} />) };
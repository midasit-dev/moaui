import StyledComponent, { type StyledProps } from "./Styled";

MoaTableRow.defaultProps = {
	hover: false,
	selected: false,
} as StyledProps;

/**
 * MoaUI Styled Table Row
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaTableRow(props: StyledProps) { return (<StyledComponent {...props} />) };
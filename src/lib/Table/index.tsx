import StyledComponent, { type StyledProps } from "./Styled";

MoaTable.defaultProps = {
	padding: 'normal',
	size: 'medium',
	stickyHeader: false,
} as StyledProps;

/**
 * MoaUI Styled Table
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaTable(props: StyledProps) { return (<StyledComponent {...props} />) };
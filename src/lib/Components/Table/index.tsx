import StyledComponent, { type StyledProps } from "./Styled";

Table.defaultProps = {
	padding: 'normal',
	size: 'medium',
	stickyHeader: false,
} as StyledProps;

/**
 * moaui Styled Table
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function Table(props: StyledProps) { return (<StyledComponent {...props} />) };
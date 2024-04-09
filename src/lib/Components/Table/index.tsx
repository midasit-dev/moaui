import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Table
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
const Table = (props: StyledProps) => (<StyledComponent {...props} />);

Table.defaultProps = {
	padding: 'normal',
	size: 'medium',
	stickyHeader: false,
} as StyledProps;

const SampleProps = {};

export default Table;

export {
	type StyledProps as TableProps,
	SampleProps as TableSample,
}
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Table
 * 
 * @param {StyledProps} props - children, padding, size, stickyHeader
 * @example
 * <Table
 * 	id=""
 * 	padding={'normal' || 'checkbox' || 'none'}
 * 	size={'medium'}
 * 	stickyHeader={false || true}
 * >
 * 	{children}
 * </Table>
 * @returns React.ReactElement
 */
const Table = (props: StyledProps) => {
	const _props = {
    id: "",
    padding: "normal",
    size: "medium",
    stickyHeader: false,
    ...props,
  } as StyledProps;
  return <StyledComponent {...props} />;
};

Table.defaultProps = {
	id: "",
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
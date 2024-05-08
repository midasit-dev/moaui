import StyledComponent, { type StyledProps } from "./Styled";

TableHead.defaultProps = {
} as StyledProps;

/**
 * moaui Styled Table Head
 * 
 * @param {StyledProps} props - children
 * @example
 * <TableHead id="">
 * 	{children}
 * </TableHead>
 * @returns React.ReactElement
 */
export default function TableHead(props: StyledProps) { return (<StyledComponent {...props} />) };
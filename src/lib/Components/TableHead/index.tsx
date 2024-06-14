import StyledComponent, { type StyledProps } from "./Styled";

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
export default function TableHead(props: StyledProps) { 
  return (<StyledComponent {...props} />)
};
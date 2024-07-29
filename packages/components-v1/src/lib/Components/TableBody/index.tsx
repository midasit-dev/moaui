import StyledComponent, { type StyledProps } from "./Styled";

/**
 * maoui Styled Table Body
 * 
 * @param {StyledProps} props - children
 * @example
 * <TableBody id="">
 * 	{children}
 * </TableBody>
 * @returns React.ReactElement
 */
export default function TableBody(props: StyledProps) { return (<StyledComponent {...props} />) };
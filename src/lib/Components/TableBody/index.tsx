import StyledComponent, { type StyledProps } from "./Styled";

TableBody.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Table Body
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function TableBody(props: StyledProps) { return (<StyledComponent {...props} />) };
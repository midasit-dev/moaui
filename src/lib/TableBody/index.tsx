import StyledComponent, { type StyledProps } from "./Styled";

MoaTableBody.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Table Body
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaTableBody(props: StyledProps) { return (<StyledComponent {...props} />) };
import StyledComponent, { type StyledProps } from "./Styled";

MoaStack.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Stack (wrapper)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaStack(props: StyledProps) : React.ReactElement { return (<StyledComponent {...props} />) };
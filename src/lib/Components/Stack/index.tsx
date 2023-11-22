import StyledComponent, { type StyledProps } from "./Styled";

Stack.defaultProps = {
} as StyledProps;

/**
 * moaui Styled Stack (wrapper)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function Stack(props: StyledProps) : React.ReactElement { return (<StyledComponent {...props} />) };
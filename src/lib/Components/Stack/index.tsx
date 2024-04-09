import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Stack (wrapper)
 * 
 * @param props 
 * @returns React.ReactElement
 */
const Stack = (props: StyledProps) => (<StyledComponent {...props} />);

Stack.defaultProps = {
	direction: "column",
} as StyledProps;

const SampleProps = {};

export default Stack;

export {
	type StyledProps as StackProps,
	SampleProps as StackSample,
}
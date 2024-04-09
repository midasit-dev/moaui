import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled FloatingBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
const FloatingBox = (props: StyledProps) => (<StyledComponent {...props} />);

FloatingBox.defaultProps = {} as StyledProps;

const SampleProps = {};

export default FloatingBox;

export {
	type StyledProps as FloatingBoxProps,
	SampleProps as FloatingBoxSample,
}
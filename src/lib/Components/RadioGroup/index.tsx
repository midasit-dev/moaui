import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Radio Button Group
 * 
 * @param props 
 * @returns React.ReactElement
 */
const RadioGroup = (props: StyledProps) => (<StyledComponent {...props} />);

RadioGroup.defaultProps = {
	ariaLabel: "Radio Group",
} as StyledProps;

const SampleProps = {};

export default RadioGroup;

export {
	type StyledProps as RadioGroupProps,
	SampleProps as RadioGroupSample,
}
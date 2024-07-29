import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Radio Button Group
 * 
 * @param props - ariaLabel, children, defaultValue, name, onChange, value, text, spacing
 * @example
 * <RadioGroup
 * 	id=''
 * 	ariaLabel={"Radio Group"}
 * 	defaultValue={"Radio 1"}
 * 	name={"Radio Group"}
 * 	onChange={() => {}}
 * 	value={"Radio 1"}
 * 	text={"Radio Group"}
 * 	spacing={1}
 * >
 * 	{children}
 * </RadioGroup>
 * @returns React.ReactElement
 */
const RadioGroup = (props: StyledProps) => {
	const _props = { ariaLabel: "Radio Group", ...props } as StyledProps;
  return <StyledComponent {..._props} />;
};

const SampleProps = {};

export default RadioGroup;

export {
	type StyledProps as RadioGroupProps,
	SampleProps as RadioGroupSample,
}
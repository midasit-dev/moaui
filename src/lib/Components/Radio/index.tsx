import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Radio Button
 * 
 * @param props 
 * @returns React.ReactElement
 */
const Radio = (props: StyledProps) => (<StyledComponent {...props} />);

Radio.defaultProps = {
	disabled: false,
	value: "",
	ariaLabel: "Radio button",
} as StyledProps;

const SampleProps = {
	checked: false,
	onChange: () => {},
	name: "Radio",
	ariaLabel: "Radio button",
	disabled: false,
};

export default Radio;

export {
	type StyledProps as RadioProps,
	SampleProps as RadioSample,
}
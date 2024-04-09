import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Switch (Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
const Switch = (props: StyledProps) => (<StyledComponent {...props} />);

Switch.defaultProps = {} as StyledProps;

const SampleProps = {
	checked: false,
	label: 'Switch',
	onChange: () => {},
	disabled: false,
};

export default Switch;

export {
	type StyledProps as SwitchProps,
	SampleProps as SwitchSample,
}
